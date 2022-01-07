import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationService } from '../shared/application.service';
import { Application } from '../shared/application.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.css']
})
export class ApplicationsListComponent implements OnInit, OnDestroy {
  applications!: Application[];
  applicationsSubscription!: Subscription;
  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.applicationsSubscription = this.applicationService.applicationsChange.subscribe((applications: Application[]) => {
      this.applications = applications;
    })
    this.applicationService.getApplications();
  }

  ngOnDestroy(){
    this.applicationsSubscription.unsubscribe();
  }
}
