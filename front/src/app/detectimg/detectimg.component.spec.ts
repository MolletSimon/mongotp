import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectimgComponent } from './detectimg.component';

describe('DetectimgComponent', () => {
  let component: DetectimgComponent;
  let fixture: ComponentFixture<DetectimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
