import {Component, OnInit} from '@angular/core';
import {CommonService} from '../services/common.service';
import {Constants} from '../constants/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  commonService: CommonService;
  features: any;

  constructor(private service: CommonService,
              private router: Router) {
    this.commonService = service;
  }

  ngOnInit() {
    console.log('Feature works!!!');
    if (this.commonService.data == null) {
      this.commonService.readFiles().subscribe((data: any) => {
        this.commonService.data = data;
        this.features = data.features;
      });
    } else {
      this.features = this.commonService.data.features;
    }
  }

  viewFeature(featureIdURL: any) {
    this.router.navigate([Constants.PATH_FEATURE_PRIVILEGE],
      {queryParams: {featureId: featureIdURL}});
  }
}
