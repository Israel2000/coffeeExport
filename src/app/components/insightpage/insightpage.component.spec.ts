import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightpageComponent } from './insightpage.component';

describe('InsightpageComponent', () => {
  let component: InsightpageComponent;
  let fixture: ComponentFixture<InsightpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
