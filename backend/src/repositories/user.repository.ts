import { prisma } from '../prisma.js'

export class UserRepository {

  async findBySurname(surname: string) {
    return await prisma.user.findUnique({
      where: { surname }
    });
  }

   async findByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username }
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async findByPaymentInfoId(paymentInfoId: string) {
    return await prisma.user.findFirst({
      where: { paymentInfoId }
    })
  }

  async createUser(data: any) {
    return await prisma.user.create({
      data,
    });
  }

};