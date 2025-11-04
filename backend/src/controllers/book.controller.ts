import type { Request, Response } from "express";
import { BookService } from "../services/book.service.js";

const bookService = new BookService();

export class BookController {
private booksList = [
  {
    id: 1,
    titulo: 'Cien Años de Soledad',
    autor: 'Gabriel García Márquez',
    editorial: 'Editorial Sudamericana', 
    genero: 'Realismo Mágico',
    formato: 'Físico',
    precio: 25000.99,
    rutaImagen: 'images/portada-libro.png',
    descripcion: 'Una obra maestra que narra la saga de la familia Buendía. Aislados en el pueblo mítico de Macondo, la familia experimenta la gloria, la guerra, el incesto y la locura, reflejando la historia cíclica y mítica de América Latina.',
    paginas: "471 paginas",
    anio: "1967",
    calificacion: 4.8
  },
  {
    id: 2,
    titulo: '1984',
    autor: 'George Orwell',
    editorial: 'Debolsillo', 
    genero: 'Distopía',
    formato: 'EPUB',
    precio: 15000.50,
    rutaImagen: 'images/portada-libro.png',
    descripcion: 'Un futuro distópico donde el Partido totalitario, liderado por el "Gran Hermano", controla cada aspecto de la vida humana. Sigue a Winston Smith en su peligrosa lucha por la verdad y la libertad individual en un mundo de vigilancia omnipresente y manipulación histórica.',
    paginas: "328 paginas",
    anio: "1949",
    calificacion: 4.7
  },
  {
    id: 3,
    titulo: 'El Principito',
    autor: 'Antoine de Saint-Exupéry',
    editorial: 'Emecé Editores', 
    genero: 'Infantil',
    formato: 'EPUB',
    precio: 12000.75,
    rutaImagen: 'images/portada-libro.png',
    descripcion: 'Un piloto varado en el desierto se encuentra con un joven príncipe de otro planeta. A través de sus conversaciones, la obra explora temas profundos como la soledad, la amistad, el amor y la naturaleza absurda del mundo adulto, todo bajo la apariencia de un cuento infantil.',
    paginas: "96 paginas",
    anio: "1943",
    calificacion: 4.8
  },
  {
    id: 4,
    titulo: 'Orgullo y Prejuicio',
    autor: 'Jane Austen',
    editorial: 'Penguin Clásicos', 
    genero: 'Romance',
    formato: 'Físico',
    precio: 18000.00,
    rutaImagen: 'images/portada-libro.png',
    descripcion: 'La inolvidable historia de Elizabeth Bennet, una joven inteligente y enérgica, y el altivo Sr. Darcy. Ambientada en la Inglaterra rural, la novela explora las presiones sociales, el matrimonio, el estatus y cómo las primeras impresiones (el orgullo y el prejuicio) pueden engañar al corazón.',
    paginas: "432 paginas",
    anio: "1813",
    calificacion: 4.6
  },
  {
    id: 5,
    titulo: 'El Hobbit',
    autor: 'J.R.R. Tolkien',
    editorial: 'Minotauro', 
    genero: 'Fantasía',
    formato: 'EPUB',
    precio: 22000.30,
    rutaImagen: 'images/portada-libro.png',
    descripcion: 'La aventura que precede a "El Señor de los Anillos". El cómodo hobbit Bilbo Bolsón es reclutado por el mago Gandalf y una compañía de enanos para reclamar su oro robado al temible dragón Smaug. Un viaje lleno de peligros, trolls, elfos y un anillo mágico.',
    paginas: "310 paginas",
    anio: "1937",
    calificacion: 4.7
  },
  {
    id: 6,
    titulo: 'Don Quijote de la Mancha',
    autor: 'Miguel de Cervantes',
    editorial: 'Ediciones Cátedra', 
    genero: 'Clásico',
    formato: 'Físico',
    precio: 30000.00,
    rutaImagen: 'images/portada-libro.png',
    descripcion: 'La obra cumbre de la literatura española. Alonso Quijano, un hidalgo obsesionado con los libros de caballerías, se autoproclama caballero andante (Don Quijote) y sale a "desfacer entuertos" junto a su fiel escudero, Sancho Panza. Una sátira brillante que explora la locura, la realidad y el idealismo.',
    paginas: "863 paginas",
    anio: "1605",
    calificacion: 4.5
  },
  {
    id: 7,
    titulo: 'La Sombra del Viento',
    autor: 'Carlos Ruiz Zafón',
    editorial: 'Planeta', 
    genero: 'Misterio',
    formato: 'EPUB',
    precio: 20000.50,
    rutaImagen: 'images/portada-libro.png',
    descripcion: 'En la Barcelona de posguerra, el joven Daniel Sempere descubre un libro maldito en el "Cementerio de los Libros Olvidados". Su obsesión por el autor, Julián Carax, lo sumerge en un laberinto de secretos, amores prohibidos y peligros que amenazan su propia vida. Un homenaje gótico al poder de los libros.',
    paginas: "576 paginas",
    anio: "2001",
    calificacion: 4.6
  },
  {
    id: 8,
    titulo: 'Harry Potter y la Piedra Filosofal',
    autor: 'J.K. Rowling',
    editorial: 'Salamandra',
    genero: 'Fantasía',
    formato: 'EPUB',
    precio: 19000.99,
    rutaImagen: 'images/portada-libro.png',
    descripcion: 'La vida del joven huérfano Harry Potter da un vuelco cuando descubre en su undécimo cumpleaños que es un mago. Es invitado al Colegio Hogwarts de Magia y Hechicería, donde forja amistades, aprende sobre su pasado y se enfrenta a las fuerzas oscuras que asesinaron a sus padres.',
    paginas: "256 paginas",
    anio: "1997",
    calificacion: 4.7
  }
];
  public async getBook(request: Request, response: Response) {
    try {
      const id = Number(request.params.id);

      if (isNaN(id)) {
        return response.status(400).json("ID inválido");
      }

      const book = this.booksList.find((libro) => libro.id === id);

      if (!book) {
        return response.status(404).json({ mensaje: "Libro no encontrado" });
      }

      return response.status(200).json(book);

    } catch (err) {
      response.status(500).json({ mensaje: err });
    }
  }

  /*
  public async getBook(request: Request, response: Response){
    try{
      const id = Number(request.params.id);

       if(isNaN(id)){
         return response.status(400).json("ID inválido");
        }
      
        const book = await bookService.findBook(id);

    }catch (err) {
      response.status(500).json({ mensaje: err });

    }
  }
    */

  public async getBooks(request: Request, response: Response) {
    try {
      response.status(200).json(this.booksList);
    } catch (err) {
      response.status(500).json({ mensaje: err });
    }
  }
}
