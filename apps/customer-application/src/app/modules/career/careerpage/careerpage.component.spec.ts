import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerpageComponent } from './careerpage.component';

describe('CareerpageComponent', () => {
  let component: CareerpageComponent;
  let fixture: ComponentFixture<CareerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
