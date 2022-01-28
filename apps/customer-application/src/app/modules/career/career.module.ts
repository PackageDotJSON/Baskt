import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StaticModule } from '../static/static.module';

//importing PrimeNg modules
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';

//importing components
import { CareerComponent } from './career.component';
import { CareerpageComponent } from './careerpage/careerpage.component';
import { AboutFormComponent } from './components/about-form/about-form.component';
import { EducationFormComponent } from './components/education-form/education-form.component';
import { ReferenceFormComponent } from './components/reference-form/reference-form.component';
import { EmploymentHistoryFormComponent } from './components/employment-history-form/employment-history-form.component';
import { DriverInformationFormComponent } from './components/driver-information-form/driver-information-form.component';
import { TermsAndConditionsComponent } from './components/static/terms-and-conditions/terms-and-conditions.component';

//importing service
import { CareerService } from './service/career.service';

const routes: Routes = [{ path: '', component: CareerpageComponent }];

@NgModule({
  declarations: [
    CareerComponent,
    CareerpageComponent,
    AboutFormComponent,
    EducationFormComponent,
    ReferenceFormComponent,
    EmploymentHistoryFormComponent,
    DriverInformationFormComponent,
    TermsAndConditionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    StaticModule,
    DropdownModule,
    InputTextModule,
    AccordionModule,
    InputMaskModule,
    InputNumberModule,
    CalendarModule,
    RadioButtonModule,
    CheckboxModule,
    DialogModule,
    FileUploadModule,
  ],
  providers: [CareerService],
})
export class CareerModule {}
