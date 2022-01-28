import { EducationFormModel } from './education-form.model';
import { EmploymentHistoryFormModel } from './employment-history-form.model';
import { DriverFormModel } from './driver-form.model';
import { PositionModel } from './position.model';
import { ReferenceFormModel } from './reference-form.model';

export interface CareerFormModel {
  birthDate: string;
  city: string;
  education: EducationFormModel[];
  email: string;
  employmentHistory: EmploymentHistoryFormModel[];
  gender: string;
  isConvicted: string;
  isDrugTest: string;
  isUsCityzen: string;
  licenseInformation: DriverFormModel;
  locationId: string;
  mobile: string;
  name: string;
  phone: number;
  policeReport: string;
  position: PositionModel;
  reference: ReferenceFormModel[];
  socSecNumber: string;
  state: string;
  vehicleInformation: DriverFormModel;
  zip: number;
}
