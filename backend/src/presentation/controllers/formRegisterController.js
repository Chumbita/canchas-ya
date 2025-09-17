import { transporter } from "../../infraestructure/mailer.js";
import fs from 'fs/promises';

export const formRegisterController = async (req, res) => {
    try {
        const dataStr = req.body?.data ?? '{}';
        let payload;
        try {
            payload = JSON.parse(dataStr);
        } catch (paseErr) {
            return res.status(400).json({ error: 'JSON invalido en campo "data"'});
        }

        const legalRep = payload.legalRep ?? {};
        const clubInfo = payload.clubInfo ?? {};
        const credentials = payload.credentials ?? {};

        if (!legalRep.email) {
            return res.status(400).json({ error: 'Falta el email del representante'});
        }

        const attachments = [];
        if (Array.isArray(req.files)) {
            for (const f of req.files) {
                attachments.push({ filename: f.originalname, path: f.path});
            }
        } else if (req.files && typeof req.files === 'object'){
            for (const key of Object.keys(req.files)) {
                for (const f of req.files[key]) {
                    attachments.push({ filename: f.originalname, path: f.path });
                }
            }
        }

        const cuit = clubInfo.cuit ?? '';
        const businessName = clubInfo.businessName ?? '';

        const mailOptions = {
            from: `"Registro de clubes" <${process.env.EMAIL_USER}>`,
            to: 'canchasyalr@gmail.com',
            replyTo: legalRep.email,
            subject: `Nueva solicitud de registro - ${businessName || 'Club'}`,
            html: `
                <h3>Datos del representante</h3>
                <p><strong>Nombre: </strong> ${legalRep.fullName || ''}</p>
                <p><strong>DNI:</strong> ${legalRep.dni || ''}</p>
                <p><strong>CUIL:</strong> ${legalRep.cuil || ''}</p>
                <p><strong>Email:</strong> ${legalRep.email}</p>
                
                <h3>Datos del club</h3>
                <p><strong>CUIT:</strong> ${cuit}</p>
                <p><strong>Razon Social:</strong> ${businessName}</p>


            `,
            attachments
        };

        await transporter.sendMail(mailOptions);

    
        for (const a of attachments) {
            await fs.unlink(a.path).catch(() => {});
            }


        return res.status(200).json({ message: 'Registro enviado correctamente' });

    } catch (err) {
        console.error('registerClubController error', err);
        return res.status(500).json({ error: 'Error al procesar el registro', detail: err.message });
    }

};