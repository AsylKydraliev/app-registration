import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Application } from '../shared/application.model';
import { Router } from '@angular/router';
import { ApplicationService } from '../shared/application.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  count = 300;
  comments = 300;

  constructor(private applicationService: ApplicationService, private router: Router) {}

  onSend() {
    const id = Math.random().toString();
    const application = new Application(
      id,
      this.registerForm.value.name,
      this.registerForm.value.surname,
      this.registerForm.value.patronymic,
      this.registerForm.value.phoneNumber,
      this.registerForm.value.workOrStudy,
      this.registerForm.value.gender,
      this.registerForm.value.size,
      this.registerForm.value.comments,
    )
    this.applicationService.postApplication(application);
    void this.router.navigate(['/application']);
  }

  onCharactersCount() {
    this.comments = this.count - this.registerForm.value.comments.length;
  }
}
