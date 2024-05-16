import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualitionOptionDialogComponent } from './previsualition-option-dialog.component';

describe('PrevisualitionOptionDialogComponent', () => {
  let component: PrevisualitionOptionDialogComponent;
  let fixture: ComponentFixture<PrevisualitionOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevisualitionOptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrevisualitionOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
