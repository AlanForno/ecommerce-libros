import {prisma} from "../prisma.js"

export class BookRepository {


    async findBookById(id:number){
        return await prisma.book.findUnique(
            {
                where:{id:id}
            }
        )
    }
    

}