import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) { 
        return res.status(401).json({ error: 'Token requerido' }); 
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }

};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'No autenticado'});
        }

        if (!roles.includes(req.user.roles)){
            return res.status(403).json({ error: 'No tienes permisos para esta accion'})
        }
        next();
    };
};