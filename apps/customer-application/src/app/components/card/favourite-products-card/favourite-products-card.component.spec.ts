import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteProductsCardComponent } from './favourite-products-card.component';

describe('FavouriteProductsCardComponent', () => {
  let component: FavouriteProductsCardComponent;
  let fixture: ComponentFixture<FavouriteProductsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteProductsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteProductsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
