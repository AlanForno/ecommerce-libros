
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
 
  private readonly TEST_USER_ID = 21;

 
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }


  loadCart(): void {
    this.cartItems = [
      { id: 1, title: 'Libro de ejemplo 1', author: 'Autor 1', price: 100 },
      { id: 2, title: 'Libro de ejemplo 2', author: 'Autor 2', price: 200 }
    ];
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  removeFromCart(bookId: number): void {
    this.cartItems = this.cartItems.filter(book => book.id !== bookId);
    this.calculateTotal();
  }

  checkout(): void {
    alert('El proceso de pago se realizaría aquí.');
  }

  finalizarSimulacroCompra(): void {

    if (this.cartItems.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    const bookIdsToPurchase = this.cartItems.map(item => item.id);

    let successCount = 0;
    let errorCount = 0;

    bookIdsToPurchase.forEach(bookId => {
      const purchaseData = {
        userId: this.TEST_USER_ID,
        bookId: bookId
      };

      this.http.post('http://localhost:3000/api/library/add', purchaseData).subscribe({
        next: (res: any) => {
          successCount++;
          if (successCount + errorCount === bookIdsToPurchase.length) {
            this.handleCompletion(errorCount === 0);
          }
        },
        error: (err) => {
          errorCount++;
          if (successCount + errorCount === bookIdsToPurchase.length) {
            this.handleCompletion(false);
          }
        }
      });
    });
  }

  private handleCompletion(success: boolean): void {
    if (success) {
      alert('Simulacro de compra exitoso');
      this.cartItems = [];
      this.total = 0;
      this.router.navigate(['/biblioteca']);
    } else {
      alert(`Error al registrar la compra. Verifique que el Usuario ID ${this.TEST_USER_ID} exista en la BD.`);
    }
  }
}
