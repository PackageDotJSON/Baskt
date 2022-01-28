export interface IAuthModel {
  phone: string;
  deviceType: string;
  zipCode: string;
  registrationId?: string;
  referrer?: string;
  email?: string;
}

export class AuthModel implements IAuthModel {
  phone: string;
  deviceType: string;
  zipCode: string;
  registrationId?: string;
  referrer?: string;
  email?: string;

  constructor(
    phone: string,
    deviceType: string,
    zipCode: string,
    registrationId?: string,
    referrer?: string,
    email?: string,
  ) {
    this.phone = phone;
    this.deviceType = deviceType;
    this.zipCode = zipCode;
    this.registrationId = registrationId;
    this.referrer = referrer;
    this.email = email;
  }
}
