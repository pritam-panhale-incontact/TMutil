import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeActionComponent } from './privilege-action.component';

describe('PrivilegeActionComponent', () => {
  let component: PrivilegeActionComponent;
  let fixture: ComponentFixture<PrivilegeActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegeActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
