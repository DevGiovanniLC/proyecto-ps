import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private dbPath = '/reviews';

  constructor(private db: AngularFireDatabase) {}

  createReview(review: { uid: string, username: string, descripcion: string, valoracion: number }): void {
    this.db.list(this.dbPath).push(review).then(_ => {
      console.log('Reseña guardada');
    }).catch(error => {
      console.error('Error al guardar la reseña:', error);
    });
  }

  getReviews(): Observable<any[]> {
    return this.db.list(this.dbPath).valueChanges();
  }

  hasUserReviewed(uid: string): Observable<boolean> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('uid').equalTo(uid)).snapshotChanges().pipe(
      map(changes => changes.length > 0)
    );
  }
}