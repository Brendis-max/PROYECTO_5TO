import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevopPage } from './nuevop.page';

describe('NuevopPage', () => {
  let component: NuevopPage;
  let fixture: ComponentFixture<NuevopPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
