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
  loadingSubscription!: Subscription;
  deleteSubscription!: Subscription;
  editSubscription!: Subscription;
  loading = false;
  deleteLoading = false;
  editLoading = false;

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.applicationsSubscription = this.applicationService.applicationsChange.subscribe((applications: Application[]) => {
      this.applications = applications;
    })
    this.loadingSubscription = this.applicationService.getLoading.subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    })
    this.deleteSubscription = this.applicationService.deleteLoading.subscribe((isDelete: boolean) => {
      this.deleteLoading = isDelete;
    })
    this.editSubscription = this.applicationService.editLoading.subscribe((isEdit: boolean) => {
      this.editLoading = isEdit;
    })
    this.applicationService.getApplications();
  }

  onRemove(id: string) {
    this.applicationService.removeApplication(id);
  }

  ngOnDestroy(){
    this.applicationsSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
  }
}
