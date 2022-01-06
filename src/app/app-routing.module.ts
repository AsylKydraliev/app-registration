import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ApplicationComponent } from './application.component';
import { NotFoundcomponent } from './not-foundcomponent';

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'application', component: ApplicationComponent},
  {path: '**', component: NotFoundcomponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
