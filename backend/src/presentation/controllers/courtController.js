import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCourts = async (req, res) => {
  try {
    const { sport, date, time, minPrice, maxPrice, ratings } = req.query;

    // Construir filtros
    let whereClause = {
      isAvailable: true,
    };

    // Filtrar por deporte
    if (sport) {
      whereClause.sportsByClub = {
        sport: {
          name: {
            contains: sport,
            mode: 'insensitive'
          }
        }
      };
    }

    // Filtrar por precio
    if (minPrice || maxPrice) {
      whereClause.pricePerHour = {};
      if (minPrice) whereClause.pricePerHour.gte = parseInt(minPrice);
      if (maxPrice) whereClause.pricePerHour.lte = parseInt(maxPrice);
    }

    // Obtener canchas con información relacionada
    const courts = await prisma.court.findMany({
      where: whereClause,
      include: {
        sportsByClub: {
          include: {
            club: {
              include: {
                photos: true,
                ratings: true,
                sportsByCLub: {
                  include: {
                    sport: true
                  }
                }
              }
            },
            sport: true
          }
        }
      }
    });

    // Transformar datos para el frontend
    const transformedCourts = courts.map(court => {
      const club = court.sportsByClub.club;
      const sports = club.sportsByCLub.map(sbc => sbc.sport.name);
      
      // Calcular rating promedio
      const ratings = club.ratings;
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + (rating.courtRating + rating.bathroomRating + rating.serviceRating + rating.lightingRating + rating.securityRating) / 5, 0) / ratings.length
        : 4.5; // Rating por defecto

      return {
        id: court.id,
        name: club.name,
        rating: Math.round(avgRating * 10) / 10,
        sports: sports,
        timeRange: "17:00pm - 00:00am", // Horario fijo por ahora
        amenities: ["Baños", "Vestuarios", "Asadores", "Kiosco"], // Amenities fijas por ahora
        price: court.pricePerHour,
        image: club.photos.length > 0 ? club.photos[0].url : 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
        location: club.location
      };
    });

    // Filtrar por rating si se especifica
    let filteredCourts = transformedCourts;
    if (ratings) {
      const ratingArray = ratings.split(',').map(r => parseInt(r));
      filteredCourts = transformedCourts.filter(court => 
        ratingArray.some(rating => Math.floor(court.rating) === rating)
      );
    }

    res.json({
      success: true,
      data: filteredCourts,
      total: filteredCourts.length
    });

  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const getCourtById = async (req, res) => {
  try {
    const { id } = req.params;

    const court = await prisma.court.findUnique({
      where: { id: parseInt(id) },
      include: {
        sportsByClub: {
          include: {
            club: {
              include: {
                photos: true,
                ratings: true,
                sportsByCLub: {
                  include: {
                    sport: true
                  }
                }
              }
            },
            sport: true
          }
        }
      }
    });

    if (!court) {
      return res.status(404).json({
        success: false,
        message: 'Cancha no encontrada'
      });
    }

    const club = court.sportsByClub.club;
    const sports = club.sportsByCLub.map(sbc => ({
      name: sbc.sport.name,
      icon: sbc.sport.name === 'Fútbol' ? '⚽' : sbc.sport.name === 'Básquet' ? '🏀' : '🏓',
      active: false
    }));
    
    const ratings = club.ratings;
    const avgRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + (rating.courtRating + rating.bathroomRating + rating.serviceRating + rating.lightingRating + rating.securityRating) / 5, 0) / ratings.length
      : 4.5;

    // Calcular ratings específicos
    const courtRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.courtRating, 0) / ratings.length : 4.5;
    const bathroomRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.bathroomRating, 0) / ratings.length : 4.0;
    const serviceRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.serviceRating, 0) / ratings.length : 4.0;
    const securityRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.securityRating, 0) / ratings.length : 4.0;
    const lightingRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.lightingRating, 0) / ratings.length : 4.0;

    const transformedCourt = {
      id: court.id,
      name: club.name,
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: ratings.length,
      sports: sports,
      price: court.pricePerHour,
      image: club.photos.length > 0 ? club.photos[0].url : 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
      services: [
        { name: "Baños", icon: "🚻" },
        { name: "Vestuarios", icon: "👕" },
        { name: "Duchas", icon: "🚿" },
        { name: "Wi-Fi", icon: "📶" },
        { name: "Asadores", icon: "🔥" },
        { name: "Kiosco", icon: "🏪" },
        { name: "Torneos", icon: "🏆" }
      ],
      ratings: {
        courts: Math.round(courtRating * 10) / 10,
        bathrooms: Math.round(bathroomRating * 10) / 10,
        service: Math.round(serviceRating * 10) / 10,
        security: Math.round(securityRating * 10) / 10,
        lighting: Math.round(lightingRating * 10) / 10
      },
      location: {
        address: club.location,
        coordinates: { lat: -34.6037, lng: -58.3816 }
      },
      description: `${club.name} es un complejo deportivo de primer nivel con canchas de fútbol de césped sintético de última generación. Contamos con iluminación LED de alta eficiencia, vestuarios modernos y todas las comodidades para que disfrutes de tu deporte favorito.`
    };

    res.json({
      success: true,
      data: transformedCourt
    });

  } catch (error) {
    console.error('Error fetching court:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};
