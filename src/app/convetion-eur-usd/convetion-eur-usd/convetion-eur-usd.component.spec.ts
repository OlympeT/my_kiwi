import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvetionEurUsdComponent } from './convetion-eur-usd.component';

describe('ConvetionEurUsdComponent', () => {
  let component: ConvetionEurUsdComponent;
  let fixture: ComponentFixture<ConvetionEurUsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvetionEurUsdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvetionEurUsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
