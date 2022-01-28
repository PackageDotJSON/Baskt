import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyRightsComponent } from './privacy-rights.component';

describe('PrivacyRightsComponent', () => {
  let component: PrivacyRightsComponent;
  let fixture: ComponentFixture<PrivacyRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyRightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
