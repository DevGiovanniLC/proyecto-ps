import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewPageComponent } from './review-page.component';
import { FormsModule } from '@angular/forms';

describe('ReviewPageComponent', () => {
  let component: ReviewPageComponent;
  let fixture: ComponentFixture<ReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
