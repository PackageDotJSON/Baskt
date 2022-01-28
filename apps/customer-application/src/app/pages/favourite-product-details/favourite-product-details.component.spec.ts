import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteProductDetailsComponent } from './favourite-product-details.component';

describe('FavouriteProductDetailsComponent', () => {
  let component: FavouriteProductDetailsComponent;
  let fixture: ComponentFixture<FavouriteProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
