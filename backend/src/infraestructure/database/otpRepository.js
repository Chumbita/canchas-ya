import prisma from "./postgres/prismaClient.js";

export class OtpRepository {
    async createOrUpdate(email, code, expiresAt) {
        return prisma.otpCode.upsert({
            where: { email },
            update: { code, expiresAt, attempts: 0 },
            create: { email, code, expiresAt },
        });
    }

    async findByEmail(email) {
        return prisma.otpCode.findUnique({ where: { email } });
    }

    async incrementAttempts(email) {
        return prisma.otpCode.update({
            where: { email },
            data: { attempts: { increment: 1 } },
        });
    }
}