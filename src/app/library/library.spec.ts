import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryComponent } from './library';
import { of } from 'rxjs';
import { LibraryService } from '../services/library.service';
import { Book } from '../models/book.model';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;
  let mockLibraryService: any;

  beforeEach(() => {
    mockLibraryService = {
      getUserLibrary: jasmine.createSpy().and.returnValue(of([]))
    };

    TestBed.configureTestingModule({
      declarations: [LibraryComponent],
      providers: [{ provide: LibraryService, useValue: mockLibraryService }]
    });

    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user library on init', () => {
    expect(mockLibraryService.getUserLibrary).toHaveBeenCalled();
  });
});
