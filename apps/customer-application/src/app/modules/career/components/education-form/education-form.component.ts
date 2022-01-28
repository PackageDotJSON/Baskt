import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { DEGREE_OPTIONS } from '../../settings/career.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationFormModel } from '../../model/education-form.model';

@Component({
  selector: 'baskt-shop-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss'],
})
export class EducationFormComponent implements OnInit {
  @Input() educationForm: FormGroup;
  @Output() eventEmitter = new EventEmitter<EducationFormModel>();
  years = [];
  degreeReceived = DEGREE_OPTIONS;

  constructor(private formBuilder: FormBuilder) {
    const date = new Date().getFullYear();
    for (let i = 1971; i <= date; i++) {
      this.years.push({ name: i, value: JSON.stringify(i) });
    }
  }

  ngOnInit() {
    this.educationForm.addControl(
      'education',
      this.formBuilder.group({
        schoolName: [null, [Validators.required]],
        location: [null, [Validators.required]],
        yearAttended: [null, [Validators.required]],
        degree: [null, [Validators.required]],
        degreeTitle: [null, [Validators.required]],
        major: [null, [Validators.required]],
      }),
    );
  }

  proceedNext() {
    this.eventEmitter.emit(this.educationForm.value);
  }
}
