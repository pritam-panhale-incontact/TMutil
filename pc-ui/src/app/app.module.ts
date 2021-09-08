import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ApplicationsComponent } from './applications/applications.component';
import { FeaturesComponent } from './features/features.component';
import { HttpClientModule } from '@angular/common/http';
import { PrivilegesComponent } from './privileges/privileges.component';
import { CategoriesComponent } from './categories/categories.component';
import { DependenciesComponent } from './dependencies/dependencies.component';
import { AppFeatureComponent } from './app-feature/app-feature.component';
import { FeaturePrivilegeComponent } from './feature-privilege/feature-privilege.component';
import { PrivilegeActionComponent } from './privilege-action/privilege-action.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { ViewDependencyComponent } from './view-dependency/view-dependency.component';
import { FeatureToggleComponent } from './feature-toggle/feature-toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    ApplicationsComponent,
    FeaturesComponent,
    PrivilegesComponent,
    CategoriesComponent,
    DependenciesComponent,
    AppFeatureComponent,
    FeaturePrivilegeComponent,
    PrivilegeActionComponent,
    ViewCategoriesComponent,
    ViewDependencyComponent,
    FeatureToggleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
