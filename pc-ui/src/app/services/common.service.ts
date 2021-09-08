import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  data: any;
  applicationMap: Map<string, any> = new Map<string, any>();
  featureMap: Map<any, any> = new Map<any, any>();
  privilegeMap: Map<string, any> = new Map<string, any>();
  categoryMap: Map<string, any> = new Map<string, any>();
  dependencyMap: Map<string, any> = new Map<string, any>();

  constructor(private http: HttpClient) {

  }

  public readFiles() {
    return this.http.get<any>(Constants.BASE_URL + Constants.URL_PRODUCT_CATALOG, {});
  }

  public readFeatureToggles(ftArray: any) {
    const body = {
      featureToggles: ftArray
    };
    return this.http.post<any>(Constants.BASE_URL + Constants.URL_FEATURE_TOGGLES, body, {});
  }

  public setData(data: any) {
    this.data = data;
  }

  public getData(): any {
    return this.data;
  }

  public setDataInMap() {
    if (this.data) {
      this.data.application.forEach((app: any) => {
        this.applicationMap.set(app.id, app);
      });
      this.data.features.forEach((feature: any) => {
        this.featureMap.set(feature.id, feature);
      });
      this.data.privilege.forEach((privilege: any) => {
        this.privilegeMap.set(privilege.id, privilege);
      });
      this.data.categories.forEach((category: any) => {
        this.categoryMap.set(category.id, category);
      });
      this.data.dependencies.forEach((dependency: any) => {
        this.dependencyMap.set(dependency.id, dependency);
      });
    }
  }
}
