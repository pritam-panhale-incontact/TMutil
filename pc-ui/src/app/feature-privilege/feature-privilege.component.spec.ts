import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePrivilegeComponent } from './feature-privilege.component';

describe('FeaturePrivilegeComponent', () => {
  let component: FeaturePrivilegeComponent;
  let fixture: ComponentFixture<FeaturePrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturePrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturePrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
