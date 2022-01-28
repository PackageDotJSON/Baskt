import { Component, Input } from '@angular/core';

@Component({
  selector: 'baskt-shop-contact-driver-card',
  templateUrl: './contact-driver-card.component.html',
  styleUrls: ['./contact-driver-card.component.scss'],
})
export class ContactDriverCardComponent {
  @Input() driverPhone: string;
}
