import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePastelPage } from './detalle-pastel.page';

describe('DetallePastelPage', () => {
  let component: DetallePastelPage;
  let fixture: ComponentFixture<DetallePastelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePastelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
