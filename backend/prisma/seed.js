import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Crear deportesss
  const sports = [];

  try {
    const futbol = await prisma.sport.upsert({
      where: { name: "Fútbol" },
      update: {},
      create: { name: "Fútbol" },
    });
    sports.push(futbol);
  } catch (error) {
    console.log("Fútbol already exists or error:", error.message);
  }

  try {
    const basket = await prisma.sport.upsert({
      where: { name: "Básquet" },
      update: {},
      create: { name: "Básquet" },
    });
    sports.push(basket);
  } catch (error) {
    console.log("Básquet already exists or error:", error.message);
  }

  try {
    const tenis = await prisma.sport.upsert({
      where: { name: "Tenis" },
      update: {},
      create: { name: "Tenis" },
    });
    sports.push(tenis);
  } catch (error) {
    console.log("Tenis already exists or error:", error.message);
  }

  try {
    const paddle = await prisma.sport.upsert({
      where: { name: "Paddle" },
      update: {},
      create: { name: "Paddle" },
    });
    sports.push(paddle);
  } catch (error) {
    console.log("Paddle already exists or error:", error.message);
  }

  try {
    const voleibol = await prisma.sport.upsert({
      where: { name: "Voleibol" },
      update: {},
      create: { name: "Voleibol" },
    });
    sports.push(voleibol);
  } catch (error) {
    console.log("Voleibol already exists or error:", error.message);
  }

  console.log("✅ Sports created");

  // Crear clubs
  const clubs = [];

  try {
    const arena = await prisma.club.upsert({
      where: { email: "arena@example.com" },
      update: {
        name: "Arena Fútbol",
        location: "22 de Julio, F5302 La Rioja, Argentina",
        status: "approved",
      },
      create: {
        name: "Arena Fútbol",
        email: "arena@example.com",
        location: "22 de Julio, F5302 La Rioja, Argentina",
        status: "approved",
      },
    });
    clubs.push(arena);
  } catch (error) {
    console.log("Arena Fútbol error:", error.message);
  }

  try {
    const carlos = await prisma.club.upsert({
      where: { email: "carlos@example.com" },
      update: {
        name: "Carlos Fútbol",
        location: "David Gatica 1056, La Rioja, Argentina",
        status: "approved",
      },
      create: {
        name: "Carlos Fútbol",
        email: "carlos@example.com",
        location: "David Gatica 1056, La Rioja, Argentina",
        status: "approved",
      },
    });
    clubs.push(carlos);
  } catch (error) {
    console.log("Carlos Fútbol error:", error.message);
  }

  try {
    const osunlar = await prisma.club.upsert({
      where: { email: "osunlar@example.com" },
      update: {
        name: "OSUNLaR",
        location:
          "Calle Los Tilos, Los Platanos esq, F5300 La Rioja, Argentina",
        status: "approved",
      },
      create: {
        name: "OSUNLaR",
        email: "osunlar@example.com",
        location:
          "Calle Los Tilos, Los Platanos esq, F5300 La Rioja, Argentina",
        status: "approved",
      },
    });
    clubs.push(osunlar);
  } catch (error) {
    console.log("OSUNLaR error:", error.message);
  }

  try {
    const leclub = await prisma.club.upsert({
      where: { email: "leclub@example.com" },
      update: {
        name: "Le Club",
        location: "Vélez Sársfield 1126, F5300 La Rioja, Argentina",
        status: "approved",
      },
      create: {
        name: "Le Club",
        email: "leclub@example.com",
        location: "Vélez Sársfield 1126, F5300 La Rioja, Argentina",
        status: "approved",
      },
    });
    clubs.push(leclub);
  } catch (error) {
    console.log("Le Club error:", error.message);
  }

  try {
    const juan = await prisma.club.upsert({
      where: { email: "juan@example.com" },
      update: {
        name: "Juan Canchas",
        location: "Av. Vernet Gdor 1881, F1881 La Rioja, Argentina",
        status: "approved",
      },
      create: {
        name: "Juan Canchas",
        email: "juan@example.com",
        location: "Av. Vernet Gdor 1881, F1881 La Rioja, Argentina",
        status: "approved",
      },
    });
    clubs.push(juan);
  } catch (error) {
    console.log("Juan Canchas error:", error.message);
  }

  try {
    const campo = await prisma.club.upsert({
      where: { email: "campo@example.com" },
      update: {
        name: "Club del Sur",
        location:
          "Av. Mártires de la Dictadura 0, B1704DIB La Rioja, Argentina",
        status: "approved",
      },
      create: {
        name: "Club del Sur",
        email: "campo@example.com",
        location:
          "Av. Mártires de la Dictadura 0, B1704DIB La Rioja, Argentina",
        status: "approved",
      },
    });
    clubs.push(campo);
  } catch (error) {
    console.log("Club del Sur error:", error.message);
  }

  try {
    const norte = await prisma.club.upsert({
      where: { email: "norte@example.com" },
      update: {
        name: "Chelcos FC",
        location: "2455 Apostol Andrés, La Rioja, Argentina",
        status: "approved",
      },
      create: {
        name: "Chelcos FC",
        email: "norte@example.com",
        location: "2455 Apostol Andrés, La Rioja, Argentina",
        status: "approved",
      },
    });
    clubs.push(norte);
  } catch (error) {
    console.log("Chelcos FC error:", error.message);
  }

  console.log("✅ Clubs created");

  // Crear fotos para los clubs con imágenes específicas por deportesd
  const clubSportImages = {
    "Arena Fútbol": [
      "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", // Fútbol (imagen principal)
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171", // Básquet
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", // Voleibol
    ],
    "Carlos Fútbol": [
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop", // Fútbol (imagen principal)
      "https://images.unsplash.com/photo-1594623274890-6b45ce7cf44a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", // Básquet
    ],
    OSUNLaR: [
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=600&fit=crop", // Fútbol (imagen principal)
      "https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174", // Tenis
    ],
    "Le Club": [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop", // Fútbol (imagen principal)
      "https://images.unsplash.com/photo-1543633550-f431af584afd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", // Básquet
      "https://images.unsplash.com/photo-1731939762362-90e98b56b3d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171", // Voleibol
    ],
    "Juan Canchas": [
      "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=600&fit=crop", // Fútbol (imagen principal)
      "https://images.unsplash.com/photo-1737476990369-9cf356085909?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", // Paddle
    ],
    "Club del Sur": [
      "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&h=600&fit=crop", // Fútbol (imagen principal)
      "https://images.unsplash.com/photo-1540712260984-d701320a8909?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331", // Básquet
    ],
    "Chelcos FC": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=600&fit=crop", // Fútbol (imagen principal)
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", // Tenis
      "https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", // Paddle
    ],
  };

  // Eliminar fotos existentes y crear nuevas
  await prisma.photo.deleteMany({});

  const photos = [];
  for (const club of clubs) {
    const clubImages = clubSportImages[club.name] || [];
    for (const imageUrl of clubImages) {
      photos.push(
        prisma.photo.create({
          data: {
            clubId: club.id,
            url: imageUrl,
          },
        })
      );
    }
  }
  await Promise.all(photos);

  console.log("✅ Photos created");

  // Crear horarios para los clubs (todos abren de 17:00 a 00:00)
  const schedules = [];
  for (const club of clubs) {
    // Verificar si ya existen horarios para este club
    const existingSchedule = await prisma.clubSchedule.findFirst({
      where: { clubId: club.id },
    });

    if (!existingSchedule) {
      for (let day = 0; day < 7; day++) {
        schedules.push(
          prisma.clubSchedule.create({
            data: {
              clubId: club.id,
              dayOfWeek: day,
              openTime: "17:00",
              closeTime: "00:00",
            },
          })
        );
      }
    }
  }
  await Promise.all(schedules);

  console.log("✅ Schedules created");

  // Crear relaciones deportes-clubs
  const sportsByClub = [];
  for (const club of clubs) {
    // Cada club tiene diferentes deportes
    const clubSports = [
      ["Arena Fútbol", ["Fútbol", "Básquet", "Voleibol"]],
      ["Carlos Fútbol", ["Fútbol", "Básquet"]],
      ["OSUNLaR", ["Fútbol", "Tenis"]],
      ["Le Club", ["Fútbol", "Básquet", "Voleibol"]],
      ["Juan Canchas", ["Fútbol", "Paddle"]],
      ["Club del Sur", ["Fútbol", "Básquet"]],
      ["Chelcos FC", ["Fútbol", "Tenis", "Paddle"]],
    ];

    const clubSportData = clubSports.find((cs) => cs[0] === club.name);
    if (clubSportData) {
      for (const sportName of clubSportData[1]) {
        const sport = sports.find((s) => s.name === sportName);
        if (sport) {
          // Verificar si ya existe esta relación
          const existingRelation = await prisma.sportsByClub.findFirst({
            where: {
              clubId: club.id,
              sportId: sport.id,
            },
          });

          if (!existingRelation) {
            sportsByClub.push(
              prisma.sportsByClub.create({
                data: {
                  clubId: club.id,
                  sportId: sport.id,
                  isActive: true,
                },
              })
            );
          }
        }
      }
    }
  }
  await Promise.all(sportsByClub);

  console.log("✅ Sports by Club created");

  // Eliminar todas las reservas, restricciones y canchas existentes
  await prisma.reservation.deleteMany({});
  await prisma.reservationRestrictions.deleteMany({});
  await prisma.court.deleteMany({});

  // Crear canchas para cada club con tipos específicos de fútbol
  const courts = [];
  const courtTypes = {
    "Arena Fútbol": ["Fútbol 5", "Fútbol 6"],
    "Club del Sur": ["Fútbol 7", "Fútbol 9", "Fútbol 4"],
    "Chelcos FC": ["Fútbol 5", "Fútbol 11", "Fútbol 8", "Fútbol 10"],
    "Juan Canchas": ["Fútbol 10"],
    OSUNLaR: ["Fútbol 7", "Fútbol 4"],
    "Le Club": ["Fútbol 6", "Fútbol 9"],
    "Carlos Fútbol": ["Fútbol 5", "Fútbol 11"],
  };

  for (const club of clubs) {
    const sportsByClubData = await prisma.sportsByClub.findFirst({
      where: { clubId: club.id },
    });

    if (sportsByClubData && courtTypes[club.name]) {
      const types = courtTypes[club.name] || ["Fútbol 5"]; // Default si no se encuentra

      for (let i = 0; i < types.length; i++) {
        courts.push(
          prisma.court.create({
            data: {
              idSportClub: sportsByClubData.id,
              courtNumber: i + 1,
              pricePerHour: Math.floor(Math.random() * 20000) + 1000, // $1,000 - $20,000
              isAvailable: true,
              courtType: types[i], // Agregar tipo de cancha
            },
          })
        );
      }
    }
  }
  await Promise.all(courts);

  console.log("✅ Courts created");

  // Crear algunos jugadores de prueba
  const players = await Promise.all([
    prisma.player.upsert({
      where: { email: "juan.perez@example.com" },
      update: {},
      create: {
        first_name: "Juan",
        last_name: "Pérez",
        email: "juan.perez@example.com",
        picture:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.player.upsert({
      where: { email: "maria.gonzalez@example.com" },
      update: {},
      create: {
        first_name: "María",
        last_name: "González",
        email: "maria.gonzalez@example.com",
        picture:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.player.upsert({
      where: { email: "carlos.lopez@example.com" },
      update: {},
      create: {
        first_name: "Carlos",
        last_name: "López",
        email: "carlos.lopez@example.com",
        picture:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    }),
  ]);

  console.log("✅ Players created");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/* esto estaba en Develop antes, lo dejo por si acaso

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 👇 Cambia este ID por el de tu club ya existente
  const clubId = 1;

  // 1. Crear deporte si no existe
  const sport = await prisma.sport.upsert({
    where: { name: "Futbol" },
    update: {},
    create: { name: "Futbol" },
  });

  console.log("Deporte:", sport);

  // 2. Crear relación SportsByClub si no existe
  const sportClub = await prisma.sportsByClub.upsert({
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
  console.log("Cancha 2:", cancha2);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
*/
