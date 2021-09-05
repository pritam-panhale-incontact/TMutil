import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDependencyComponent } from './view-dependency.component';

describe('ViewDependencyComponent', () => {
  let component: ViewDependencyComponent;
  let fixture: ComponentFixture<ViewDependencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDependencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
