import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyReturnsComponent } from './easy-returns.component';

describe('EasyReturnsComponent', () => {
  let component: EasyReturnsComponent;
  let fixture: ComponentFixture<EasyReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyReturnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
