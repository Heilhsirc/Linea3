import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAsociadosComponent } from './no-asociados.component';

describe('NoAsociadosComponent', () => {
  let component: NoAsociadosComponent;
  let fixture: ComponentFixture<NoAsociadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAsociadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
