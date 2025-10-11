import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Crear deportes
  const sports = [];
  
  try {
    const futbol = await prisma.sport.upsert({
      where: { name: 'Fútbol' },
      update: {},
      create: { name: 'Fútbol' },
    });
    sports.push(futbol);
  } catch (error) {
    console.log('Fútbol already exists or error:', error.message);
  }

  try {
    const basket = await prisma.sport.upsert({
      where: { name: 'Básquet' },
      update: {},
      create: { name: 'Básquet' },
    });
    sports.push(basket);
  } catch (error) {
    console.log('Básquet already exists or error:', error.message);
  }

  try {
    const tenis = await prisma.sport.upsert({
      where: { name: 'Tenis' },
      update: {},
      create: { name: 'Tenis' },
    });
    sports.push(tenis);
  } catch (error) {
    console.log('Tenis already exists or error:', error.message);
  }

  try {
    const paddle = await prisma.sport.upsert({
      where: { name: 'Paddle' },
      update: {},
      create: { name: 'Paddle' },
    });
    sports.push(paddle);
  } catch (error) {
    console.log('Paddle already exists or error:', error.message);
  }

  try {
    const voleibol = await prisma.sport.upsert({
      where: { name: 'Voleibol' },
      update: {},
      create: { name: 'Voleibol' },
    });
    sports.push(voleibol);
  } catch (error) {
    console.log('Voleibol already exists or error:', error.message);
  }

  console.log('✅ Sports created');

  // Crear clubs
  const clubs = [];
  
  try {
    const arena = await prisma.club.upsert({
      where: { email: 'arena@example.com' },
      update: {},
      create: {
        name: 'Arena Fútbol',
        email: 'arena@example.com',
        location: 'Buenos Aires, Argentina',
        status: 'approved',
      },
    });
    clubs.push(arena);
  } catch (error) {
    console.log('Arena Fútbol error:', error.message);
  }

  try {
    const carlos = await prisma.club.upsert({
      where: { email: 'carlos@example.com' },
      update: {},
      create: {
        name: 'Carlos Fútbol',
        email: 'carlos@example.com',
        location: 'Córdoba, Argentina',
        status: 'approved',
      },
    });
    clubs.push(carlos);
  } catch (error) {
    console.log('Carlos Fútbol error:', error.message);
  }

  try {
    const osunlar = await prisma.club.upsert({
      where: { email: 'osunlar@example.com' },
      update: {},
      create: {
        name: 'OSUNLaR',
        email: 'osunlar@example.com',
        location: 'La Plata, Argentina',
        status: 'approved',
      },
    });
    clubs.push(osunlar);
  } catch (error) {
    console.log('OSUNLaR error:', error.message);
  }

  try {
    const leclub = await prisma.club.upsert({
      where: { email: 'leclub@example.com' },
      update: {},
      create: {
        name: 'Le Club',
        email: 'leclub@example.com',
        location: 'Rosario, Argentina',
        status: 'approved',
      },
    });
    clubs.push(leclub);
  } catch (error) {
    console.log('Le Club error:', error.message);
  }

  try {
    const juan = await prisma.club.upsert({
      where: { email: 'juan@example.com' },
      update: {},
      create: {
        name: 'Juan Canchas',
        email: 'juan@example.com',
        location: 'Mendoza, Argentina',
        status: 'approved',
      },
    });
    clubs.push(juan);
  } catch (error) {
    console.log('Juan Canchas error:', error.message);
  }

  try {
    const campo = await prisma.club.upsert({
      where: { email: 'campo@example.com' },
      update: {},
      create: {
        name: 'Campo Deportivo',
        email: 'campo@example.com',
        location: 'Tucumán, Argentina',
        status: 'approved',
      },
    });
    clubs.push(campo);
  } catch (error) {
    console.log('Campo Deportivo error:', error.message);
  }

  try {
    const norte = await prisma.club.upsert({
      where: { email: 'norte@example.com' },
      update: {},
      create: {
        name: 'Canchas del Norte',
        email: 'norte@example.com',
        location: 'Salta, Argentina',
        status: 'approved',
      },
    });
    clubs.push(norte);
  } catch (error) {
    console.log('Canchas del Norte error:', error.message);
  }

  console.log('✅ Clubs created');

  // Crear fotos para los clubs
  const photos = [];
  for (const club of clubs) {
    photos.push(
      prisma.photo.create({
        data: {
          clubId: club.id,
          url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
        },
      })
    );
  }
  await Promise.all(photos);

  console.log('✅ Photos created');

  // Crear horarios para los clubs (todos abren de 17:00 a 00:00)
  const schedules = [];
  for (const club of clubs) {
    for (let day = 0; day < 7; day++) {
      schedules.push(
        prisma.clubSchedule.create({
          data: {
            clubId: club.id,
            dayOfWeek: day,
            openTime: '17:00',
            closeTime: '00:00',
          },
        })
      );
    }
  }
  await Promise.all(schedules);

  console.log('✅ Schedules created');

  // Crear relaciones deportes-clubs
  const sportsByClub = [];
  for (const club of clubs) {
    // Cada club tiene diferentes deportes
    const clubSports = [
      ['Arena Fútbol', ['Fútbol', 'Básquet', 'Voleibol']],
      ['Carlos Fútbol', ['Fútbol', 'Básquet']],
      ['OSUNLaR', ['Fútbol', 'Tenis']],
      ['Le Club', ['Fútbol', 'Básquet', 'Voleibol']],
      ['Juan Canchas', ['Fútbol', 'Paddle']],
      ['Campo Deportivo', ['Fútbol', 'Básquet']],
      ['Canchas del Norte', ['Fútbol', 'Tenis', 'Paddle']],
    ];

    const clubSportData = clubSports.find(cs => cs[0] === club.name);
    if (clubSportData) {
      for (const sportName of clubSportData[1]) {
        const sport = sports.find(s => s.name === sportName);
        if (sport) {
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
  await Promise.all(sportsByClub);

  console.log('✅ Sports by Club created');

  // Crear canchas para cada club
  const courts = [];
  for (const club of clubs) {
    const courtCount = Math.floor(Math.random() * 3) + 2; // 2-4 canchas por club
    for (let i = 1; i <= courtCount; i++) {
      const sportsByClubData = await prisma.sportsByClub.findFirst({
        where: { clubId: club.id },
      });

      if (sportsByClubData) {
        courts.push(
          prisma.court.create({
            data: {
              idSportClub: sportsByClubData.id,
              courtNumber: i,
              pricePerHour: Math.floor(Math.random() * 20000) + 10000, // $10,000 - $30,000
              isAvailable: true,
            },
          })
        );
      }
    }
  }
  await Promise.all(courts);

  console.log('✅ Courts created');

  // Crear algunos jugadores de prueba
  const players = await Promise.all([
    prisma.player.create({
      data: {
        first_name: 'Juan',
        last_name: 'Pérez',
        email: 'juan.perez@example.com',
        picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
    }),
    prisma.player.create({
      data: {
        first_name: 'María',
        last_name: 'González',
        email: 'maria.gonzalez@example.com',
        picture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      },
    }),
    prisma.player.create({
      data: {
        first_name: 'Carlos',
        last_name: 'López',
        email: 'carlos.lopez@example.com',
        picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      },
    }),
  ]);

  console.log('✅ Players created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
