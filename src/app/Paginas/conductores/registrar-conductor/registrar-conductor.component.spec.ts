import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarConductorComponent } from './registrar-conductor.component';

describe('RegistrarConductorComponent', () => {
  let component: RegistrarConductorComponent;
  let fixture: ComponentFixture<RegistrarConductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarConductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
