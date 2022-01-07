import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from './application.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {
  applications: Application[] | null = null;
  applicationsChange = new Subject<Application[]>();
  constructor(private http: HttpClient) {}

  postApplication(application: Application){
    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/application.json', application)
      .subscribe()
  }

  getApplications(){
    this.http.get<{[id: string]:Application}>
    ('https://app-blog-f76a2-default-rtdb.firebaseio.com/application.json').pipe(
      map(result => {
        if(result === null){
          return [];
        }
        return Object.keys(result).map(id => {
          const data = result[id];
          return new Application(id, data.name, data.surname, data.patronymic, data.phoneNumber, data.workOrStudy,
          data.gender, data.size, data.comments);
        })
      }))
      .subscribe(applications => {
        this.applications = [];
        this.applications = applications;
        this.applicationsChange.next(this.applications.slice());
      })
  }
}
