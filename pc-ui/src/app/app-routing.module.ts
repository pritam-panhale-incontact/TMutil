import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Constants} from './constants/constants';
import {ApplicationsComponent} from './applications/applications.component';
import {FeaturesComponent} from './features/features.component';
import {PrivilegesComponent} from './privileges/privileges.component';
import {CategoriesComponent} from './categories/categories.component';
import {DependenciesComponent} from './dependencies/dependencies.component';
import {AppFeatureComponent} from './app-feature/app-feature.component';
import {FeaturePrivilegeComponent} from './feature-privilege/feature-privilege.component';
import {PrivilegeActionComponent} from './privilege-action/privilege-action.component';
import {ViewCategoriesComponent} from './view-categories/view-categories.component';
import {ViewDependencyComponent} from './view-dependency/view-dependency.component';
import {FeatureToggleComponent} from './feature-toggle/feature-toggle.component';


const routes: Routes = [
  {
    path: Constants.PATH_APPLICATION,
    component: ApplicationsComponent
  },
  {
    path: Constants.PATH_FEATURES,
    component: FeaturesComponent
  },
  {
    path: Constants.PATH_PRIVILEGES,
    component: PrivilegesComponent
  },
  {
    path: Constants.PATH_CATEGORIES,
    component: CategoriesComponent
  },
  {
    path: Constants.PATH_DEPENDENCIES,
    component: DependenciesComponent
  },
  {
    path: Constants.PATH_APP_FEATURE,
    component: AppFeatureComponent
  },
  {
    path: Constants.PATH_FEATURE_PRIVILEGE,
    component: FeaturePrivilegeComponent
  },
  {
    path: Constants.PATH_PRIVILEGE_ACTION,
    component: PrivilegeActionComponent
  },
  {
    path: Constants.PATH_VIEW_CATEGORIES,
    component: ViewCategoriesComponent
  },
  {
    path: Constants.PATH_VIEW_DEPENDENCY,
    component: ViewDependencyComponent
  },
  {
    path: Constants.PATH_FEATURE_TOGGLES,
    component: FeatureToggleComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
