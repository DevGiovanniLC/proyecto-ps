import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import firebase from "firebase/compat/app";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from "./AuthService.service";
import {MyRecordsComponent} from "../my-records/my-records.component"

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  user: firebase.User | null = null;


  public urls: Array<string> = [];
  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore,
              private authService:AuthService) {}

  loadFileUrl(userId: string): void {
    this.getUserFileUrl(userId).subscribe(userDoc => {
      this.urls = userDoc?.urls || null;
    });
  }


  uploadFile(file: File, userId: string): Observable<string[]> {
    const filePath = `uploads/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    //this.loadFileUrl("lElU2rh5onTVk8JbDrHKfvXtqr03")

    return new Observable<string[]>(observer => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            // Almacena la URL en el documento del usuario
            this.urls.push(url)



            let urls: Array<string> = this.urls


            this.firestore.collection('users').doc(userId).update(({ urls }));


            observer.next(urls);
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
