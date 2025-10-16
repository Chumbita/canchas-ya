import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 👇 Cambia este ID por el de tu club ya existente
  const clubId = 6;

  // 1. Crear deporte si no existe
  const sport = await prisma.sport.upsert({
    where: { name: "Padel" },
    update: {},
    create: { name: "Padel" },
  });

  console.log("Deporte:", sport);

  // 2. Crear relación SportClub si no existe
  const sportClub = await prisma.sportClub.upsert({
    where: {
      clubId_sportId: {
        clubId: clubId,
        sportId: sport.id,
      },
    },
    update: {},
    create: {
      clubId: clubId,
      sportId: sport.id,
    },
  });

  console.log("Relación SportClub:", sportClub);
/*
  // 3. Crear 2 canchas de ejemplo
  const cancha1 = await prisma.court.create({
    data: {
      idSportClub: sportClub.id,
      courtNumber: 1,
      pricePerHour: 18000,
    },
  });

  const cancha2 = await prisma.court.create({
    data: {
      idSportClub: sportClub.id,
      courtNumber: 2,
      pricePerHour: 20000,
      isAvailable: false, // esta inicia como no disponible
    },
  });

  console.log("Cancha 1:", cancha1);
  console.log("Cancha 2:", cancha2);*/
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
