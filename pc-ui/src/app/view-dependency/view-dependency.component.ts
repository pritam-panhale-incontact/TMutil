import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../services/common.service';
import {Constants} from '../constants/constants';

@Component({
  selector: 'app-view-dependency',
  templateUrl: './view-dependency.component.html',
  styleUrls: ['./view-dependency.component.css']
})
export class ViewDependencyComponent implements OnInit {

  dependencyJson = [];
  privileges: any;
  dependency: any;
  onEnables: any;
  onDisables: any;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private router: Router) {
  }

  ngOnInit() {
    this.dependencyJson = [];
    this.route
      .queryParams
      .subscribe(params => {
        this.dependencyJson = [];
        if (params.dependencyId !== null) {
          const dependencyId = params.dependencyId;
          this.commonService.setDataInMap();
          const dependency = this.commonService.dependencyMap.get(dependencyId);
          this.dependency = dependency;
          for (const [key, value] of Object.entries(dependency)) {
            const onEnable = [];
            if (key !== 'dependencies') {
              this.dependencyJson.push({k: key, val: value});
            }
          }
          const onEnables = [];
          if (dependency.dependencies.onEnable) {
            dependency.dependencies.onEnable.forEach((oe) => {
              const actions = [];
              oe.actions.forEach((action) => {
                actions.push(action.actionId);
              });
              onEnables.push({privilege: oe.privilegeId, action: actions.toString()});
            });
          }
          this.onEnables = onEnables;

          const onDisables = []
          if (dependency.dependencies.onDisable) {
            dependency.dependencies.onDisable.forEach((od) => {
              const actions = [];
              od.actions.forEach((action) => {
                actions.push(action.actionId);
              });
              onDisables.push({privilege: od.privilegeId, action: actions.toString()});
            });
          }
          this.onDisables = onDisables;
        }
      });
  }

  viewPrivilege(privilegeIdURL: any) {
    this.router.navigate([Constants.PATH_PRIVILEGE_ACTION],
      {queryParams: {privilegeId: privilegeIdURL}});
  }

}
