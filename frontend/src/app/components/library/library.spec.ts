import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryComponent } from './library';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryComponent]
    });

    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener libros cargados', () => {
    expect(component.books.length).toBeGreaterThan(0);
  });

  it('los libros deben tener propiedades básicas', () => {
    const book = component.books[0];
    expect(book.id !== undefined).toBeTrue();
    expect(book.title !== undefined).toBeTrue();
    expect(book.author !== undefined).toBeTrue();
    expect(book.price !== undefined).toBeTrue();
    //expect(book).not.toBeNull();
  });
});

