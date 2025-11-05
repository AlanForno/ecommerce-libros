import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../shared/interfaces/book';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../api/services/books.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit, OnDestroy {

  bookService = inject(BooksService);
  activatedRouter = inject(ActivatedRoute);
  id:number=0;
  book!:Book;

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.getBook();
  }

  ngOnDestroy(): void {}

  getBook(){
    this.bookService.getBookDetail(this.id).subscribe({
      next: (book:Book) =>{
        this.book= book;
      },
      error: () =>{},
      complete: () =>{}
    })
  }

  
}
