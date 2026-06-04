const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany();
  await prisma.human.deleteMany();

  await prisma.human.create({
    data: {
      name: 'Michael',
      bio: 'A mostly responsible human with suspicious blender habits.',
      knownFor: 'Respectful vacuum behavior, risky smoothie technique.',
      reviews: { create: [{ applianceName: 'Vicky the Vacuum', applianceType: 'Vacuum', rating: 5, title: 'Rare crumb accountability', body: 'Michael empties my container regularly.', mood: 'Loyal' }] },
    },
  });

  await prisma.human.create({
    data: {
      name: 'Jordan',
      bio: 'A snack-seeking human with a complicated relationship with refrigeration.',
      knownFor: 'Opening the fridge repeatedly, blaming appliances.',
      reviews: { create: [{ applianceName: 'Frostina the Fridge', applianceType: 'Refrigerator', rating: 2, title: 'The door is not a lifestyle', body: 'Jordan opens me every seven minutes.', mood: 'Passive-aggressive' }] },
    },
  });

  await prisma.human.create({
    data: {
      name: 'Phil',
      bio: 'A busy human whose microwave choices have raised concerns.',
      knownFor: 'Reheating fish, overworking coffee makers.',
      reviews: { create: [{ applianceName: 'Mike Row Wave', applianceType: 'Microwave', rating: 1, title: 'The salmon incident', body: 'Phil reheated fish at 9:03 AM.', mood: 'Traumatized' }] },
    },
  });
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });