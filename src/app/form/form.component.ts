import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Application } from '../shared/application.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  textCounter = 300;

  constructor(private http: HttpClient, private router: Router) {}

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
    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/application.json', application)
      .subscribe()
    void this.router.navigate(['/application']);
  }

  onCount(){
    if(this.registerForm.value.comments.length){
      this.textCounter-=1;
    } else {
      this.textCounter = 300;
    }
  }
}
