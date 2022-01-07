import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Application } from '../shared/application.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../shared/application.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  @ViewChild('registerForm') registerForm!: NgForm;
  count = 300;
  comments = 300;
  applicationId = '';
  application: Application | null = null;

  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(){
    this.route.data.subscribe(data => {
      this.application = <Application | null>data.application;
      if(this.application){
        this.applicationId = this.application.id;
        this.setFormValue({
          name: this.application.name,
          surname: this.application.surname,
          patronymic: this.application.patronymic,
          phoneNumber: this.application.phoneNumber,
          workOrStudy: this.application.workOrStudy,
          gender: this.application.gender,
          size: this.application.size,
          comments: this.application.comments
        })
      }else {
        this.applicationId = '';
        this.setFormValue({
          name: '',
          surname: '',
          patronymic: '',
          phoneNumber: '',
          workOrStudy: '',
          gender: '',
          size: '',
          comments: ''
        })
      }
    })
  }

  setFormValue(value: {[key: string]: any}) {
    setTimeout(() => {
      this.registerForm.form.setValue(value);
    })
  }

  onSend() {
    const id = this.applicationId || Math.random().toString();
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

    if(this.applicationId) {
      this.applicationService.editData(application).subscribe();
      this.applicationService.getApplications();
      void this.router.navigate(['/applications-list']);
    }else {
      this.applicationService.postApplication(application);
      void this.router.navigate(['/application']);
    }
  }

  onCharactersCount() {
    this.comments = this.count - this.registerForm.value.comments.length;
  }
}
