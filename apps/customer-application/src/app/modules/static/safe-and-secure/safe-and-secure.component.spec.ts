import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeAndSecureComponent } from './safe-and-secure.component';

describe('SafeAndSecureComponent', () => {
  let component: SafeAndSecureComponent;
  let fixture: ComponentFixture<SafeAndSecureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafeAndSecureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeAndSecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
