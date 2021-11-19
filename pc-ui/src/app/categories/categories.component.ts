import {Component, OnInit} from '@angular/core';
import {CommonService} from '../services/common.service';
import {Constants} from '../constants/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  commonService: CommonService;
  categories: any;

  constructor(private service: CommonService,
              private router: Router) {
    this.commonService = service;
  }

  ngOnInit() {
    console.log('categories works!!!');
    if (this.commonService.data == null) {
      this.commonService.readFiles().subscribe((data: any) => {
        this.commonService.data = data;
        this.categories = data.categories;
        this.sortCategoriesBySortIndex();
      });
    } else {
      this.categories = this.commonService.data.categories;
      this.sortCategoriesBySortIndex();
    }
  }

  sortCategoriesBySortIndex() {
    this.categories.sort((a, b) => {
      return a.sortIndex - b.sortIndex;
    });
  }

  viewCategory(categoryIdURL: any) {
    this.router.navigate([Constants.PATH_VIEW_CATEGORIES],
      {queryParams: {categoryId: categoryIdURL}});
  }

}
