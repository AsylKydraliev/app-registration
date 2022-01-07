import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ApplicationComponent } from './application.component';
import { NotFoundcomponent } from './not-foundcomponent';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { ResolverService } from './applications-list/resolver.service';

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'application', component: ApplicationComponent},
  {path: 'applications-list', component: ApplicationsListComponent},
  {path: 'applications-list/:id', component: FormComponent, resolve: {application: ResolverService}},
  {path: '**', component: NotFoundcomponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
