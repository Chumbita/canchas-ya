# 🧠 Backend - Canchas Ya!

## 📦 Estructura de carpetas

```bash
src/ 
├── application/ # Casos de uso, orquestación 
├── domain/ # Entidades, interfaces, lógica de negocio 
├── infrastructure/ # DB, servicios externos, repositorios 
├── presentation/ # Rutas HTTP, controladores 
└── index.js # Entry point del servidor
```

## 🚀 Cómo correr el proyecto

1. Instalar dependencias: `npm install` 

2. Crear archivo `.env` basado en `.env.example`

3. Desplegar el backend `npm run dev`


## 🧪 Endpoints disponibles

- `GET /api/ping` → prueba de conexión
