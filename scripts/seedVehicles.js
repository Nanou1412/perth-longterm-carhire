const { PrismaClient } = require('@prisma/client');
const { FLEET } = require('../app/lib/constants');

async function main(){
  const prisma = new PrismaClient();
  for(const v of FLEET){
    const slug = (v.name || '').toLowerCase().replace(/\s+/g,'-');
    await prisma.vehicle.upsert({ where: { slug }, update: { name: v.name, weeklyPrice: v.weeklyPrice }, create: { slug, name: v.name, weeklyPrice: v.weeklyPrice } });
  }
  await prisma.$disconnect();
}

main().catch(e=>{ console.error(e); process.exit(1); });
