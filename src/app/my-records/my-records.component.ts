import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { AuthService } from '../services/AuthService.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import HeaderComponent from '../components/header/header.component';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { HttpClient } from "@angular/common/http";
import { saveAs} from 'file-saver';
import { HTTPVideoTransfer } from "../services/HTTPVideoTransfer.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-my-records',
  standalone: true,
  templateUrl: './my-records.component.html',
  styleUrl: './my-records.component.css',
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class MyRecordsComponent implements OnInit {
  user: firebase.User | null = null;
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  downloadURL: string[] = []
  downloadURL2: string[] = []
  couldbe:boolean = false

  constructor(private uploadService: UploadService,
              private authService: AuthService,
              private firestore: AngularFirestore, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {

        this.loadFileUrl(this.user.uid);

      }
    });
  }
  getUser(){
    this.authService.getUser().subscribe(user => {
      this.user = user;
      console.log(this.user)
    })

  }

  loadFileUrl(userId: string): void {
    this.uploadService.getUserFileUrl(userId).subscribe(userDoc => {
      this.downloadURL2 = userDoc?.urls || null;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {

    if (!this.selectedFile || !this.user) {
      alert('No file selected or user not authenticated!');
      return;
    }

    this.uploadService.getUploadProgress(this.selectedFile).subscribe(progress => {
      this.uploadProgress = progress;
    });

    this.uploadService.uploadFile(this.selectedFile, this.user.uid).subscribe(url => {
      this.downloadURL =url
      this.downloadURL2 = this.downloadURL
      this.uploadProgress = null;
      this.ngOnInit()
    });
  }
  isImage(): boolean {
    if (this.selectedFile) {
      return this.selectedFile.type.startsWith('image/');
    }
    return false;
  }


  descargarImagen(url): SafeUrl {


    const dataUrl = 'data:image/jpeg;base64,';
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl + url);
  }


}
