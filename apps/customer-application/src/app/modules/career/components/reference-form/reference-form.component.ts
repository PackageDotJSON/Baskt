import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferenceFormModel } from '../../model/reference-form.model';

@Component({
  selector: 'baskt-shop-reference-form',
  templateUrl: './reference-form.component.html',
  styleUrls: ['./reference-form.component.scss'],
})
export class ReferenceFormComponent implements OnInit {
  @Input() referenceForm: FormGroup;
  @Output() eventEmitter = new EventEmitter<ReferenceFormModel>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.referenceForm.addControl(
      'reference',
      this.formBuilder.group({
        name: [null, [Validators.required]],
        title: [null, [Validators.required]],
        company: [null, [Validators.required]],
        phone: [null, [Validators.required]],
      }),
    );
  }

  proceedNext() {
    const phoneNumber = Number(this.referenceForm.get('reference.phone').value);
    this.referenceForm.patchValue({
      reference: {
        phone: phoneNumber,
      },
    });
    this.eventEmitter.emit(this.referenceForm.value);
  }
}
