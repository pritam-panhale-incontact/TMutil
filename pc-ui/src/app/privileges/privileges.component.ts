import { Component, OnInit } from '@angular/core';
import {CommonService} from '../services/common.service';
import {Constants} from '../constants/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.css']
})
export class PrivilegesComponent implements OnInit {

  commonService: CommonService;
  privileges: any;

  constructor(private service: CommonService,
              private router: Router) {
    this.commonService = service;
  }

  ngOnInit() {
    console.log('Feature works!!!');
    if (this.commonService.data == null) {
      this.commonService.readFiles().subscribe((data: any) => {
        this.commonService.data = data;
        this.privileges = data.privilege;
      });
    } else {
      this.privileges = this.commonService.data.privilege;
    }
  }

  viewPrivilege(privilegeIdURL: any) {
    this.router.navigate([Constants.PATH_PRIVILEGE_ACTION],
      {queryParams: {privilegeId: privilegeIdURL}});
  }

}
