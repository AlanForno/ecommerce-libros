import { prisma } from '../prisma.js'

export class UserRepository {

  async findByEmail(email:string){
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username:string){
    return await prisma.user.findUnique({
      where: { username },
    });
  }

   async createUser(data:any) {
    return await prisma.user.create({
      data,
    });
  }
  
};