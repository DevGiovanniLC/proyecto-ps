import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningMobileDialogComponent } from './warning-mobile-dialog.component';

describe('WarningMobileDialogComponent', () => {
  let component: WarningMobileDialogComponent;
  let fixture: ComponentFixture<WarningMobileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningMobileDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarningMobileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
