import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MorePagePage } from './more-page.page';

describe('MorePagePage', () => {
  let component: MorePagePage;
  let fixture: ComponentFixture<MorePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MorePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
