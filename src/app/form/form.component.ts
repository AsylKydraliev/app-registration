import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Application } from '../shared/application.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;

  constructor(private http: HttpClient) { }

  ngOnInit() {}

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
  }
}
