import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from './application.model';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {
  constructor(private http: HttpClient) {}

  postApplication(application: Application){
    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/application.json', application)
      .subscribe()
  }
}
