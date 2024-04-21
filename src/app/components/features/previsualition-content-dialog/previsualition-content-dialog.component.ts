import { Component, Inject } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import { HTTPVideoTransfer } from "../../../services/HTTPVideoTransfer";

@Component({
  selector: 'app-previsualition-content-dialog',
  standalone: true,
  providers: [HTTPVideoTransfer],
  imports: [
    MatDialogContent,
    MatDialogClose
  ],
  templateUrl: './previsualition-content-dialog.component.html',
  styleUrl: './previsualition-content-dialog.component.css'
})
export class PrevisualitionContentDialogComponent {
  VideoUrl : string
  blob: Blob
  format: string;
  constructor( private httpVideo: HTTPVideoTransfer, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.blob = data.blobData
    this.VideoUrl = URL.createObjectURL(data.blobData);
    this.format = data.format
  }
  async downloadVideo(data: Blob): Promise<void> {
    this.httpVideo.sendVideo(data, this.format)
  }
}
