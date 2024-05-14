import { Component } from '@angular/core';
import HeaderComponent from '../components/header/header.component';
import { ReviewService } from '../services/review.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/AuthService.service';
import firebase from "firebase/compat/app";



@Component({
  selector: 'app-review-page',
  standalone: true,
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css',
  imports: [
    HeaderComponent,
    FormsModule,
    CommonModule,
  ],
  
})
export class ReviewPageComponent {
  email: string = '';
  descripcion: string = '';
  valoracion: number = 0;
  reviews: any[] = [];
  user: firebase.User | null = null;
  hasReviewed: boolean = false; 
  
  constructor(private reviewService: ReviewService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadReviews();  // Cargar las reseñas al inicializar el componente
    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.checkIfUserHasReviewed();
      }
    })
  }

  loadReviews() {
    this.reviewService.getReviews().subscribe(data => {
      this.reviews = data;
    });
  }

  checkIfUserHasReviewed() {
    if (this.user) {
      this.reviewService.hasUserReviewed(this.user.uid).subscribe(hasReviewed => {
        this.hasReviewed = hasReviewed;
      });
    }
  }

  onEmailInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.email = inputElement.value;
  }

  onDescripcionInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.descripcion = inputElement.value;
  }

  selectStars(id: number) {
    this.valoracion = id;
  }

  unselectStars(id: number) {
    if (this.valoracion === id) {
      this.valoracion = 0;
    }
  }

  setRating(id: number) {
    this.valoracion = id;
  }

  submit() {
    if (!this.user) {
      alert('Debes iniciar sesión para crear una reseña.');
      return;
    }

    if (this.hasReviewed) {
      alert('Ya has creado una reseña.');
      return;
    }

    const newReview = {
      uid: this.user.uid,
      email: this.email,
      descripcion: this.descripcion,
      valoracion: this.valoracion
    };
    this.reviewService.createReview(newReview);
    alert("Reseña guardada");
    this.email = '';
    this.descripcion = '';
    this.valoracion = 0;
    this.loadReviews();  // Recargar las reseñas después de guardar una nueva
    this.hasReviewed = true;
  }

  
}


