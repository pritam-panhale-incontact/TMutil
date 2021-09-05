import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../services/common.service';
import {Constants} from '../constants/constants';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categoryJason = [];
  privileges: any;
  features: any;
  subCategories: any;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private router: Router) {
  }

  ngOnInit() {
    this.categoryJason = [];
    this.route
      .queryParams
      .subscribe(params => {
        this.categoryJason = [];
        if (params.categoryId !== null) {
          const categoryId = params.categoryId;
          this.commonService.setDataInMap();
          const category = this.commonService.categoryMap.get(categoryId);
          for (const [key, value] of Object.entries(category)) {
            if (key !== 'privileges' && key !== 'features') {
              this.categoryJason.push({k: key, val: value});
            }
          }
          const privs = [];
          category.privileges.forEach((priv) => {
            const p = this.commonService.privilegeMap.get(priv.id);
            privs.push(p);
          });
          this.privileges = privs;

          const features = [];
          category.features.forEach((f) => {
            const feature = this.commonService.featureMap.get(f.id);
            features.push(feature);
          });
          this.features = features;

          const subCategories = [];
          category.subCategories.forEach((subC) => {
            const categoryLocal = this.commonService.categoryMap.get(subC);
            subCategories.push(categoryLocal);
          });
          this.subCategories = subCategories;
        }
      });
  }

  viewPrivilege(privilegeIdURL: any) {
    this.router.navigate([Constants.PATH_PRIVILEGE_ACTION],
      {queryParams: {privilegeId: privilegeIdURL}});
  }

  viewFeature(featureIdURL: any) {
    this.router.navigate([Constants.PATH_FEATURE_PRIVILEGE],
      {queryParams: {featureId: featureIdURL}});
  }

  viewCategory(categoryIdURL: any) {
    this.router.navigate([Constants.PATH_VIEW_CATEGORIES],
      {queryParams: {categoryId: categoryIdURL}});
  }

}
