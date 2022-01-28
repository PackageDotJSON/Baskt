import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmploymentHistoryFormModel } from '../../model/employment-history-form.model';

@Component({
  selector: 'baskt-shop-employment-history-form',
  templateUrl: './employment-history-form.component.html',
  styleUrls: ['./employment-history-form.component.scss'],
})
export class EmploymentHistoryFormComponent implements OnInit {
  @Input() employmentHistoryForm: FormGroup;
  @Output() eventEmitter = new EventEmitter<EmploymentHistoryFormModel>();
  termsAndConditions = false;
  privacyPolicy = false;
  displayConditions = false;
  displayPolicy = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.employmentHistoryForm.addControl(
      'employmentHistory',
      this.formBuilder.group({
        employer: [null, [Validators.required]],
        jobTitle: [null, [Validators.required]],
        datesEmployed: [null, [Validators.required]],
        workPhone: [null, [Validators.required]],
        supervisorName: [null, [Validators.required]],
        endingPayRate: [null, [Validators.required]],
        address: [null, [Validators.required]],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]],
        zip: [null, [Validators.required]],
      }),
    );
  }

  proceedNext() {
    if (this.termsAndConditions && this.privacyPolicy) {
      const phone = Number(
        this.employmentHistoryForm.get('employmentHistory.workPhone').value,
      );
      const zipCode = Number(
        this.employmentHistoryForm.get('employmentHistory.zip').value,
      );
      this.employmentHistoryForm.patchValue({
        employmentHistory: {
          workPhone: phone,
          zip: zipCode,
        },
      });
      this.eventEmitter.emit(this.employmentHistoryForm.value);
    } else {
      throw new Error('Select check boxes');
    }
  }
}
