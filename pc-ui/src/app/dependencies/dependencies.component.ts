import {Component, OnInit} from '@angular/core';
import {CommonService} from '../services/common.service';
import {Constants} from '../constants/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dependencies',
  templateUrl: './dependencies.component.html',
  styleUrls: ['./dependencies.component.css']
})
export class DependenciesComponent implements OnInit {

  commonService: CommonService;
  dependencies: any;

  constructor(private service: CommonService,
              private router: Router) {
    this.commonService = service;
  }

  ngOnInit() {
    console.log('Feature works!!!');
    if (this.commonService.data == null) {
      this.commonService.readFiles().subscribe((data: any) => {
        this.commonService.data = data;
        this.dependencies = data.dependencies;
      });
    } else {
      this.dependencies = this.commonService.data.dependencies;
    }
  }

  viewDependency(dependencyIdURL: any) {
    this.router.navigate([Constants.PATH_VIEW_DEPENDENCY],
      {queryParams: {dependencyId: dependencyIdURL}});
  }

}
