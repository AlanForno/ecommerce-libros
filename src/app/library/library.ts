import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.html',
  styleUrls: ['./library.css']
})
export class LibraryComponent implements OnInit {
  userBooks: Book[] = [];
  loading = true;
  error: string = '';

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.fetchUserLibrary();
  }

  fetchUserLibrary(): void {
    this.libraryService.getUserLibrary().subscribe({
      next: (books) => {
        this.userBooks = books;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar la biblioteca.';
        this.loading = false;
      }
    });
  }
}
