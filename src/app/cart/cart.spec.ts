import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent]
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

    // Simular datos en cartItems y calcular total para evitar usar el servicio
    component.cartItems = [
      { id: '1', title: 'Libro 1', author: 'Autor 1', price: 10 },
      { id: '2', title: 'Libro 2', author: 'Autor 2', price: 15 }
    ];
    component.calculateTotal();

    fixture.detectChanges();
  });

  it('debe cargar los libros del carrito y calcular el total', () => {
    expect(component.cartItems.length).toBe(2);
    expect(component.total).toBe(25);
  });

  it('debe eliminar un libro del carrito y recalcular total', () => {
    component.removeFromCart('1');
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0].id).toBe('2');
    expect(component.total).toBe(15);
  });

  it('debe vaciar el carrito al hacer checkout', () => {
    component.checkout();
    expect(component.cartItems.length).toBe(0);
    expect(component.total).toBe(0);
  });
});
