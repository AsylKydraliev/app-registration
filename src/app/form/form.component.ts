import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Application } from '../shared/application.model';
import { Router } from '@angular/router';
import { ApplicationService } from '../shared/application.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  textCounter = 300;
  count = 0;

  constructor(private applicationService: ApplicationService, private router: Router) {}

  ngOnInit() {

  }

  onSend() {
    const application = new Application(
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
    if (this.registerForm.value.comments.length + 1 >= this.count) {
      this.count += 1;
      this.textCounter -= 1;
    } else {
      this.count -= 1;
      this.textCounter += 1;
    }
  }
}
