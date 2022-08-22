import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaactividadComponent } from './nuevaactividad.component';

describe('NuevaactividadComponent', () => {
  let component: NuevaactividadComponent;
  let fixture: ComponentFixture<NuevaactividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaactividadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
