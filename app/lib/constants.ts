// Business Information
export const BUSINESS = {
  name: 'PerthDrive',
  tagline: 'Premium Long-Term Car Rentals',
  description: 'Discover exceptional value and quality with our comprehensive long-term car rental solutions designed for Perth professionals and families.',
  location: 'Mirrabooka, Perth WA 6061',
  serviceArea: 'Perth Metropolitan & Regional WA',
  phone: '+61 400 000 000',
  email: 'hello@perthdrive.com.au',
  hours: 'Monday - Friday: 8:00 AM - 6:00 PM | Saturday: 9:00 AM - 2:00 PM',
  minimumRental: 6,
  minimumRentalUnit: 'weeks',
};

// Fleet Data
export const FLEET = [
  {
    id: 1,
    name: 'Toyota Corolla',
    category: 'Economy Sedan',
    available: true,
    weeklyPrice: 249,
    monthlyPrice: 899,
    description: 'Reliable and economical sedan perfect for daily commuting. Ideal for professionals seeking comfort and fuel efficiency.',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    features: ['Air Conditioning', 'Power Steering', 'Bluetooth Connectivity', 'Backup Camera', 'USB Charging'],
    image: '🚗',
    highlights: ['Excellent Fuel Economy', 'Proven Reliability', 'Modern Safety Features'],
  },
  {
    id: 2,
    name: 'Mazda CX-5',
    category: 'Compact SUV',
    available: true,
    weeklyPrice: 329,
    monthlyPrice: 1299,
    description: 'Versatile SUV combining luxury with practicality. Perfect for families and those seeking extra space.',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    features: ['Air Conditioning', 'Leather Seats', 'Backup Camera', 'Cruise Control', 'Touchscreen Display', 'Apple CarPlay/Android Auto'],
    image: '🚙',
    highlights: ['Spacious Interior', 'Premium Comfort', 'Advanced Technology'],
  },
  {
    id: 3,
    name: 'Toyota RAV4 Hybrid',
    category: 'Premium SUV',
    available: false,
    weeklyPrice: 399,
    monthlyPrice: 1699,
    description: 'Eco-friendly hybrid technology with premium features. Outstanding efficiency for the environmentally conscious.',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    features: ['Air Conditioning', 'Leather Seats', 'Backup Camera', 'Cruise Control', 'Touchscreen Display', 'Panoramic Sunroof', 'Power Seats'],
    image: '🚕',
    highlights: ['Fuel Efficient', 'Eco-Friendly', 'Luxury Features'],
  },
  {
    id: 4,
    name: 'Toyota HiAce Commuter',
    category: 'Commercial Van',
    available: true,
    weeklyPrice: 499,
    monthlyPrice: 1899,
    description: 'Spacious commercial van ideal for businesses and large groups. Exceptional cargo capacity and reliability.',
    seats: 8,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    features: ['Air Conditioning', 'Power Steering', 'Large Cargo Space', 'Cruise Control', 'Reversing Camera', 'Electric Windows'],
    image: '🚐',
    highlights: ['Maximum Cargo Space', 'Seating for 8', 'Built for Business'],
  },
];

// Pricing Details
export const PRICING_DETAILS = {
  weeklyRates: {
    economy: { name: 'Corolla (Economy Sedan)', price: 249 },
    standard: { name: 'Mazda CX-5 (Compact SUV)', price: 329 },
    premium: { name: 'RAV4 Hybrid (Premium SUV)', price: 399 },
    van: { name: 'HiAce (Commercial Van)', price: 499 },
  },
  bond: 500,
  kmIncluded: '4000 km',
  excessKmRate: 0.15,
  insuranceOptions: [
    { type: 'Third Party (Third Party Liability)', price: 12 },
    { type: 'Comprehensive (Full Coverage)', price: 28 },
  ],
  conditions: [
    'Minimum rental period: 6 weeks',
    'Maximum rental period: 24 months',
    'Driver must be 21+ years old',
    'Valid Australian driver\'s license required',
    'International drivers need International Driving Permit',
    'Security bond is fully refundable minus damages',
    'Comprehensive insurance is mandatory',
    'Vehicle maintenance and roadside assistance included',
    'Weekly rates decrease with longer rental periods',
  ],
};

// FAQ Data
export const FAQ = [
  {
    id: 1,
    question: 'Why choose PerthDrive for long-term car rentals?',
    answer: 'We offer the best value in Perth with transparent pricing, modern well-maintained vehicles, comprehensive support, and personalized service. Our team is dedicated to making your rental experience seamless and hassle-free.',
  },
  {
    id: 2,
    question: 'What is the minimum and maximum rental period?',
    answer: 'The minimum rental period is 6 weeks, and the maximum is 24 months. We specialize in long-term rentals to provide exceptional value and peace of mind. We offer discounted rates for longer rental periods.',
  },
  {
    id: 3,
    question: 'What documents do I need to rent a car?',
    answer: 'You\'ll need a valid Australian driver\'s license (minimum 21 years old), proof of residency (utility bill or government ID), and a credit card for the security bond. International drivers will also need an International Driving Permit (IDP).',
  },
  {
    id: 4,
    question: 'What is included in the rental price?',
    answer: `Our comprehensive rental package includes ${PRICING_DETAILS.kmIncluded} free kilometers per week, full vehicle maintenance, roadside assistance 24/7, comprehensive insurance (upgradeable), and roadside support. No hidden fees - what you see is what you pay.`,
  },
  {
    id: 5,
    question: 'How are excess kilometers charged?',
    answer: `We provide ${PRICING_DETAILS.kmIncluded} of free kilometers per week. Any additional kilometers are charged at $${PRICING_DETAILS.excessKmRate.toFixed(2)} per km. This is clearly documented in your rental agreement.`,
  },
  {
    id: 6,
    question: 'Can I extend my rental period?',
    answer: 'Absolutely! Extensions are available subject to vehicle availability. We recommend contacting us at least one week before your rental end date to arrange an extension. Extended rentals may qualify for additional discounts.',
  },
  {
    id: 7,
    question: 'Is fuel included? What about insurance?',
    answer: 'Fuel is not included - you\'re responsible for refueling the vehicle provided with a full tank. Comprehensive insurance is mandatory and is charged weekly. You can upgrade to premium coverage if needed.',
  },
  {
    id: 8,
    question: 'Do you offer vehicle delivery and pickup services?',
    answer: `Yes! We're located in Mirrabooka and offer convenient delivery and pickup services throughout Perth and regional WA for a small additional fee. Contact us at ${BUSINESS.phone} for a personalized delivery quote.`,
  },
];

// How It Works Steps
export const HOW_IT_WORKS = [
  {
    id: 1,
    title: 'Browse Premium Vehicles',
    description: 'Explore our curated selection of modern, well-maintained vehicles. From economy sedans to spacious vans, we have the perfect option for your needs.',
    icon: '🔍',
  },
  {
    id: 2,
    title: 'View Transparent Pricing',
    description: 'No hidden fees, no surprises. Our pricing is clear and competitive, with special discounts available for longer rental periods.',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Complete Quick Application',
    description: 'Submit your details online or visit our Mirrabooka office. Our streamlined process takes just minutes to complete.',
    icon: '📝',
  },
  {
    id: 4,
    title: 'Instant Verification',
    description: 'We verify your information quickly and securely. Most applications are approved within 24 hours.',
    icon: '✅',
  },
  {
    id: 5,
    title: 'Secure Your Rental',
    description: `Pay the refundable security bond ($${PRICING_DETAILS.bond}), select your insurance coverage, and finalize your booking.`,
    icon: '💳',
  },
  {
    id: 6,
    title: 'Drive with Confidence',
    description: 'Pick up your vehicle from our Mirrabooka location or arrange convenient delivery. Enjoy 24/7 roadside support throughout your rental.',
    icon: '🚗',
  },
];
