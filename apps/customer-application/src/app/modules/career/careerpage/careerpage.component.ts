import { Component } from '@angular/core';
import { JOB_LOCATION, JOB_POSITIONS } from '../settings/career.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { LOCAL_STORAGE_KEY } from '../../../enums/local-storage-keys.enums';

@Component({
  selector: 'baskt-shop-careerpage',
  templateUrl: './careerpage.component.html',
  styleUrls: ['./careerpage.component.scss'],
})
export class CareerpageComponent {
  careerForm: FormGroup;
  jobPositions = JOB_POSITIONS;
  jobLocations = JOB_LOCATION;
  selectedPosition: string;
  activeState = [true, false, false, false, false];
  activeStateCount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
  ) {
    this.careerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      socSecNumber: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      isUsCityzen: [null, [Validators.required]],
      isConvicted: [null, [Validators.required]],
      isDrugTest: [null, [Validators.required]],
      locationId: [this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE)],
      mobile: [null],
      position: this.formBuilder.group({
        date: [null],
        position: [null],
        zip: [null],
      }),
    });
  }

  changeJobPosition() {
    this.careerForm.patchValue({
      position: {
        position: this.selectedPosition,
      },
    });
  }

  getForm() {
    this.activeState[this.activeStateCount] =
      !this.activeState[this.activeStateCount];
    this.activeStateCount++;
    this.activeState[this.activeStateCount] =
      !this.activeState[this.activeStateCount];
    console.log(this.careerForm.value);
  }
}
