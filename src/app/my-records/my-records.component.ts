import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { AuthService } from '../services/AuthService.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import HeaderComponent from '../components/header/header.component';

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
  downloadURL: string | null = null;

  constructor(private uploadService: UploadService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        console.log("mamahuevo");
        this.loadFileUrl(this.user.uid);
      }
    });
  }

  loadFileUrl(userId: string): void {
    this.uploadService.getUserFileUrl(userId).subscribe(userDoc => {
      this.downloadURL = userDoc?.url || null;
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
      this.downloadURL = url;
      this.uploadProgress = null;
    });
  }
}