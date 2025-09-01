# ⚛️ Frontend - Canchas Ya!

## 📦 Estructura de carpetas

```bash
src/
├── assets/        # Imágenes, íconos, estilos
├── styles/        # Estilos globales y utilitarios
├── components/    # Componentes reutilizables
├── context/       # Contexto de la aplicación
├── hooks/         # Custom hooks
├── pages/         # Vistas principales
├── routes/        # Rutas
├── services/      # Llamadas a APIs
├── App.jsx        # Componente raíz
└── main.jsx       # Punto de entrada
```


## 🚀 Cómo correr el proyecto

1. Instalar dependencias: `npm install`

2. Crear archivo `.env` basado en `.env.example`

3. Desplegar Frontend: `npm run dev`


## 🔗 Conexión con backend

Asegurate de que `VITE_API_URL` en `.env` apunte al backend:

Para usar las variables de entorno usar `import.meta.env.VARIABLE`

