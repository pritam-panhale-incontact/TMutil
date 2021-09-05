import {Component, OnInit} from '@angular/core';
import {CommonService} from '../services/common.service';
import {Router} from '@angular/router';
import {Constants} from '../constants/constants';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  commonService: CommonService;
  applications: any;

  constructor(private service: CommonService,
              private router: Router) {
    this.commonService = service;
  }

  ngOnInit() {
    console.log('Application works!!!');
    if (this.commonService.data == null) {
      this.commonService.readFiles().subscribe((data: any) => {
        this.commonService.data = data;
        this.applications = data.application;
      });
    } else {
      this.applications = this.commonService.data.application;
    }
  }

  viewApplications(applicationId: any) {
    console.log('View Application -->');
    this.router.navigate([Constants.PATH_APP_FEATURE],
      {queryParams: {appId: applicationId}});
  }

}
