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

  getApplication(id: string){
    return this.http.get<Application | null>
    (`https://app-blog-f76a2-default-rtdb.firebaseio.com/application/${id}.json`)
      .pipe(map(result => {
        if(!result) return  null;
        return new Application(
          id,
          result.name,
          result.surname,
          result.patronymic,
          result.phoneNumber,
          result.workOrStudy,
          result.gender,
          result.size,
          result.comments
          );
      }))
  }

  editData(application: Application) {
    const body = {
      name: application.name,
      surname: application.surname,
      patronymic: application.patronymic,
      phoneNumber: application.phoneNumber,
      workOrStudy: application.workOrStudy,
      gender: application.gender,
      size: application.size,
      comments: application.comments
    }
    return this.http.put(`https://app-blog-f76a2-default-rtdb.firebaseio.com/application/${application.id}.json`, body)
      .pipe(
      // tap(() => {
      //   this.mealLoading.next(false);
      // }, () => {
      //   this.mealLoading.next(false);
      // })
    )
  }

  removeApplication(id: string) {
    this.http.delete(`https://app-blog-f76a2-default-rtdb.firebaseio.com/application/${id}.json`)
      .subscribe(() => {
        this.getApplications();
      }
    );
  }
}
