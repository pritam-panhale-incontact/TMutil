import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../services/common.service';
import {Constants} from '../constants/constants';

@Component({
  selector: 'app-app-feature',
  templateUrl: './app-feature.component.html',
  styleUrls: ['./app-feature.component.css']
})
export class AppFeatureComponent implements OnInit {

  appFeatures: any;
  application: any;
  applicationJson = [];

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private router: Router) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        if (params.appId !== null) {
          const appId = params.appId;
          this.commonService.setDataInMap();
          const application = this.commonService.applicationMap.get(appId);
          this.application = application;
          for (const [key, value] of Object.entries(application)) {
            this.applicationJson.push({k: key, val: value});
          }
          const features = [];
          application.featureIds.forEach((fId) => {
            const feature = this.commonService.featureMap.get(fId);
            features.push(feature);
          });
          this.appFeatures = features;
        }
      });
  }

  viewFeature(featureIdURL: any) {
    this.router.navigate([Constants.PATH_FEATURE_PRIVILEGE],
      {queryParams: {featureId: featureIdURL}});
  }

}
