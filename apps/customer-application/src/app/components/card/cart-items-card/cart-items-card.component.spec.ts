import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsCardComponent } from './cart-items-card.component';

describe('CartItemsCardComponent', () => {
  let component: CartItemsCardComponent;
  let fixture: ComponentFixture<CartItemsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
