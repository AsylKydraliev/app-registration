import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ApplicationComponent } from './application.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundcomponent } from './not-foundcomponent';
import { PhoneValidatorDirective } from './phone-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ApplicationComponent,
    PhoneValidatorDirective,
    NotFoundcomponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
