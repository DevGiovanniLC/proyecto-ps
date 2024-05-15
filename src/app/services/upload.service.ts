import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import firebase from "firebase/compat/app";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) {}

  uploadFile(file: File, userId: string): Observable<string> {
    const filePath = `uploads/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Observable<string>(observer => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            // Almacena la URL en el documento del usuario
            this.firestore.collection('users').doc(userId).update({ url });
            observer.next(url);
            observer.complete();
          });
        })
      ).subscribe();
    });
  }

  getUploadProgress(file: File): Observable<number | undefined> {
    const filePath = `uploads/${new Date().getTime()}_${file.name}`;
    const task = this.storage.upload(filePath, file);

    return task.percentageChanges();
  }

  getUserFileUrl(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }


}