import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverFormModel } from '../../model/driver-form.model';
import { CareerService } from '../../service/career.service';
import { LambdaFunction } from '../../../../models/lambda-function.model';
import { CAREER_FUNCTION_NAMES } from '../../../../enums/lambda-functions-names.enum';

@Component({
  selector: 'baskt-shop-driver-information-form',
  templateUrl: './driver-information-form.component.html',
  styleUrls: ['./driver-information-form.component.scss'],
})
export class DriverInformationFormComponent implements OnInit {
  @Input() driverInformationForm: FormGroup;
  @Output() eventEmitter = new EventEmitter<DriverFormModel>();

  constructor(
    private formBuilder: FormBuilder,
    private careerService: CareerService,
  ) {}

  ngOnInit() {
    this.driverInformationForm.addControl(
      'vehicleInformation',
      this.formBuilder.group({
        year: [null, [Validators.required]],
        make: [null, [Validators.required]],
        model: [null, [Validators.required]],
        color: [null, [Validators.required]],
        doors: [null, [Validators.required]],
        plateNumber: [null, [Validators.required]],
        seatBelts: [null, [Validators.required]],
        insuranceDocuments: [null, [Validators.required]],
      }),
    );
    this.driverInformationForm.addControl(
      'licenseInformation',
      this.formBuilder.group({
        drivingLicense: [null, [Validators.required]],
        expiryDate: [null, [Validators.required]],
        licenseNumber: [null, [Validators.required]],
        state: [null, [Validators.required]],
      }),
    );
  }

  proceedNext() {
    const doorsNumber = Number(
      this.driverInformationForm.get('vehicleInformation.doors').value,
    );
    this.driverInformationForm.patchValue({
      vehicleInformation: {
        doors: doorsNumber,
      },
    });
    this.eventEmitter.emit(this.driverInformationForm.value);
  }

  fileUpload(event: any) {
    console.log(event);
    const payload = new LambdaFunction(
      CAREER_FUNCTION_NAMES.APP_UPLOAD_JOB_APP_ASSETS,
      {
        imgBase64: event,
      },
    );
    // this.careerService.uploadFile(payload).subscribe((res) => {
    //   console.log(res);
    // });
  }
}
