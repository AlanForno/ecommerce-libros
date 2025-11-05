export interface Book {
    id: number;
    titulo: string;
    autor: string;
    editorial: string;
    descripcion: string;
    formato: string;
    paginas: string;
    genero: string;
    anio: number;
    precio: number;
    valoracion:number
    ruta_imagen: string;
}

export interface BookPreview {
    id: number;
    titulo: string;
    autor: string;
    genero: string;
    formato: string;
    precio: number;
    rutaImagen: string;
}