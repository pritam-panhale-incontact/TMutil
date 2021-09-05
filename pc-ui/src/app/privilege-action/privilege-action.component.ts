import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-privilege-action',
  templateUrl: './privilege-action.component.html',
  styleUrls: ['./privilege-action.component.css']
})
export class PrivilegeActionComponent implements OnInit {

  privilegeJson = [];
  actions: any;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private router: Router) {
  }

  ngOnInit() {
    this.privilegeJson = [];
    this.route
      .queryParams
      .subscribe(params => {
        this.privilegeJson = [];
        if (params.privilegeId !== null) {
          const privId = params.privilegeId;
          this.commonService.setDataInMap();
          const privilege = this.commonService.privilegeMap.get(privId);
          for (const [key, value] of Object.entries(privilege)) {
            if (key !== 'actions') {
              this.privilegeJson.push({k: key, val: value});
            }
          }
          const actions = [];
          privilege.actions.forEach((action) => {
            actions.push(action);
          });
          this.actions = actions;
        }
      });
  }

}
