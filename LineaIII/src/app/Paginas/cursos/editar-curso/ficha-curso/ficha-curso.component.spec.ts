import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaCursoComponent } from './ficha-curso.component';

describe('FichaCursoComponent', () => {
  let component: FichaCursoComponent;
  let fixture: ComponentFixture<FichaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
