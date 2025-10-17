import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart';
import { CartService } from '../services/cart.service';
import { of } from 'rxjs';
import { Book } from '../models/book.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService: any;

  beforeEach(() => {
    mockCartService = {
      getCart: jasmine.createSpy().and.returnValue(of([
        { id: '1', title: 'Libro 1', author: 'Autor 1', price: 10 },
        { id: '2', title: 'Libro 2', author: 'Autor 2', price: 15 }
      ])),
      removeFromCart: jasmine.createSpy().and.returnValue(of(true)),
      checkout: jasmine.createSpy().and.returnValue(of(true))
    };

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: mockCartService }
      ]
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe cargar los libros del carrito al inicializar', () => {
    expect(component.cartItems.length).toBe(2);
    expect(component.total).toBe(25);
  });

  it('debe eliminar un libro del carrito', () => {
    component.removeFromCart('1');
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith('1');
  });

  it('debe vaciar el carrito al hacer checkout', () => {
    component.checkout();
    expect(mockCartService.checkout).toHaveBeenCalled();
    expect(component.cartItems.length).toBe(0);
    expect(component.total).toBe(0);
  });
});
