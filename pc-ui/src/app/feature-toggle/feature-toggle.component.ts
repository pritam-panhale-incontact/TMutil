import {Component, OnInit} from '@angular/core';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-feature-toggle',
  templateUrl: './feature-toggle.component.html',
  styleUrls: ['./feature-toggle.component.css']
})
export class FeatureToggleComponent implements OnInit {

  ftNames: string;
  ftResponse: any;

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
  }

  public getFeatureToggleStatus() {
    const ftArr = this.ftNames.split('\n');
    const ftResponseLocal = [];
    console.log('Checking status of FT', ftArr);
    this.commonService.readFeatureToggles(ftArr).subscribe((data) => {
      console.log('Data received', data);
      if (data && data.length && data.length > 0) {
        data.forEach((ft: string) => {
          const ftSplit = ft.split(',');
          ftResponseLocal.push(ftSplit);
        });
        this.ftResponse = ftResponseLocal;
      }
    });

  }
}
