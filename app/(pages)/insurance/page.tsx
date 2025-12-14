import { prisma } from '@/lib/prisma';

export default async function InsurancePage() {
  // server component reads setting
  let setting = await prisma.setting.findUnique({ where: { key: 'insurance_text' } });
  const text = setting ? setting.value : 'We do not provide insurance. The client must have their own coverage.';
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Insurance</h1>
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
}
