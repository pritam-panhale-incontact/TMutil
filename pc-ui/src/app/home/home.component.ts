import {Component, OnInit} from '@angular/core';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private commonService: CommonService) {
    commonService.readFiles();
  }

  ngOnInit() {
  }

}
