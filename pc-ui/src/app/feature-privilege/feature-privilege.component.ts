import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../services/common.service';
import {Constants} from '../constants/constants';

@Component({
  selector: 'app-feature-privilege',
  templateUrl: './feature-privilege.component.html',
  styleUrls: ['./feature-privilege.component.css']
})
export class FeaturePrivilegeComponent implements OnInit {

  featureJson = [];
  privileges: any;
  subFeatures: any;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private router: Router) {
  }

  ngOnInit() {
    this.featureJson = [];
    this.route
      .queryParams
      .subscribe(params => {
        this.featureJson = [];
        if (params.featureId !== null) {
          const featureId = params.featureId;
          this.commonService.setDataInMap();
          const feature = this.commonService.featureMap.get(+featureId);
          for (const [key, value] of Object.entries(feature)) {
            this.featureJson.push({k: key, val: value});
          }
          const privileges = [];
          feature.privilegeIds.forEach((pId) => {
            const privilege = this.commonService.privilegeMap.get(pId);
            privileges.push(privilege);
          });
          this.privileges = privileges;

          const subFeatures = [];
          feature.subFeatureIds.forEach((fId) => {
            const subFeature = this.commonService.featureMap.get(fId);
            subFeatures.push(subFeature);
          });
          this.subFeatures = subFeatures;
        }
      });
  }


  viewFeature(featureIdURL: any) {
    this.router.navigate([Constants.PATH_FEATURE_PRIVILEGE],
      {queryParams: {featureId: featureIdURL}});
  }

  viewPrivilege(privilegeIdURL: any) {
    this.router.navigate([Constants.PATH_PRIVILEGE_ACTION],
      {queryParams: {privilegeId: privilegeIdURL}});
  }

}
