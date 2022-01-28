import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AboutFormModel } from '../../model/about-form.model';
import { GENDER_OPTIONS } from '../../settings/career.constant';

@Component({
  selector: 'baskt-shop-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.scss'],
})
export class AboutFormComponent {
  @Input() aboutForm: FormGroup;
  @Output() eventEmitter = new EventEmitter<AboutFormModel>();
  genderOptions = GENDER_OPTIONS;

  proceedNext() {
    const phoneNumber = Number(this.aboutForm.get('phone').value);
    const zipNumber = Number(this.aboutForm.get('zip').value);
    this.aboutForm.patchValue({
      phone: phoneNumber,
      zip: zipNumber,
    });
    this.eventEmitter.emit(this.aboutForm.value);
  }
}
