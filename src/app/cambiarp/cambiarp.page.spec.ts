import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarpPage } from './cambiarp.page';

describe('CambiarpPage', () => {
  let component: CambiarpPage;
  let fixture: ComponentFixture<CambiarpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
