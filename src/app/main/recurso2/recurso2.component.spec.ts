import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recurso2Component } from './recurso2.component';

describe('Recurso2Component', () => {
  let component: Recurso2Component;
  let fixture: ComponentFixture<Recurso2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Recurso2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recurso2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
