import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-previsualition-content-dialog',
  standalone: true,
  imports: [],
  templateUrl: './previsualition-content-dialog.component.html',
  styleUrl: './previsualition-content-dialog.component.css'
})
export class PrevisualitionContentDialogComponent {
  VideoUrl : string
  constructor(public _matDialogRef: MatDialogRef<PrevisualitionContentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.VideoUrl = URL.createObjectURL(data.blobData);
  }
  private async downloadVideo(data: Blob): Promise<void> {
    const link = document.createElement('a');
    link.download = 'video.mkv';
    link.click();
  }
}
