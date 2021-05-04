import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexControllerComponent } from './index-controller.component';

describe('IndexControllerComponent', () => {
  let component: IndexControllerComponent;
  let fixture: ComponentFixture<IndexControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
