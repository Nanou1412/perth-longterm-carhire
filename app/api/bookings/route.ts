import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe, weeklyPriceToCents } from '@/lib/stripe';
import { FLEET, BUSINESS } from '@/lib/constants';

export const runtime = 'nodejs';

function overlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart <= bEnd && aEnd >= bStart;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const vehicleSlug = form.get('vehicle')?.toString() || '';
    const startDateRaw = form.get('startDate')?.toString();
    const weeksRaw = form.get('weeks')?.toString();
    const paymentMethodId = form.get('paymentMethodId')?.toString();
    const name = form.get('name')?.toString() || '';
    const email = form.get('email')?.toString() || '';
    const phone = form.get('phone')?.toString() || '';

    if (!vehicleSlug || !startDateRaw || !weeksRaw) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const weeks = parseInt(weeksRaw, 10);
    const minWeeks = BUSINESS.minimumRental || 6;
    if (isNaN(weeks) || weeks < minWeeks) return NextResponse.json({ error: `Minimum rental is ${minWeeks} weeks.` }, { status: 400 });

    const startDate = new Date(startDateRaw);
    if (isNaN(startDate.getTime())) return NextResponse.json({ error: 'Invalid start date' }, { status: 400 });

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + weeks * 7 - 1);

    // Ensure vehicle exists in DB, if not create from constants by matching name/slug
    let vehicle = await prisma.vehicle.findUnique({ where: { slug: vehicleSlug } });
    if (!vehicle) {
      const fromConst = FLEET.find((v) => (v.name || '').toLowerCase().replace(/\s+/g, '-') === vehicleSlug || (v.id && String(v.id) === vehicleSlug));
      const nameConst = fromConst ? fromConst.name : vehicleSlug.replace(/-/g, ' ');
      const weeklyPrice = fromConst ? fromConst.weeklyPrice : 299;
      vehicle = await prisma.vehicle.create({ data: { slug: vehicleSlug, name: nameConst, weeklyPrice } });
    }

    // Availability: check bookings for overlap
    const existing = await prisma.booking.findMany({ where: { vehicleId: vehicle.id, status: 'active' } });
    for (const b of existing) {
      if (overlap(new Date(b.startDate), new Date(b.endDate), startDate, endDate)) {
        return NextResponse.json({ error: 'Vehicle not available for selected dates' }, { status: 400 });
      }
    }

    const totalPrice = vehicle.weeklyPrice * weeks;

    // Create Stripe customer and subscription if paymentMethodId provided
    let stripeSubscriptionId: string | null = null;
    let subscriptionStatus: string | null = null;
    if (paymentMethodId) {
      const customer = await stripe.customers.create({ name, email, phone });
      // Create product + price
      const product = await stripe.products.create({ name: `Weekly ${vehicle.name}` });
      const price = await stripe.prices.create({ unit_amount: weeklyPriceToCents(vehicle.weeklyPrice), currency: 'aud', recurring: { interval: 'week' }, product: product.id });
      // attach payment method
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
      await stripe.customers.update(customer.id, { invoice_settings: { default_payment_method: paymentMethodId } });
      // create subscription with specified end date by setting trial_end or schedule? We'll create subscription and leave cancel_at
      const sub = await stripe.subscriptions.create({ customer: customer.id, items: [{ price: price.id }], expand: ['latest_invoice.payment_intent'] });
      stripeSubscriptionId = sub.id;
      subscriptionStatus = sub.status;
    }

    const token = Math.random().toString(36).slice(2, 10);
    const booking = await prisma.booking.create({ data: {
      vehicleId: vehicle.id,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      startDate,
      endDate,
      weeks,
      weeklyPrice: vehicle.weeklyPrice,
      totalPrice,
      status: 'active',
      stripeSubscriptionId,
      token,
    }});

    return NextResponse.json({ ok: true, bookingId: booking.id, token, stripeSubscriptionId, subscriptionStatus });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
