import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from "@angular/material/dialog";
import { HTTPVideoTransfer } from "../../../services/HTTPVideoTransfer.service";
import { strict } from "assert";

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
    VideoUrl: string

    constructor(private httpVideo: HTTPVideoTransfer, @Inject(MAT_DIALOG_DATA) public data) {
        this.VideoUrl = URL.createObjectURL(this.data.blobData)
    }

    async downloadVideo(): Promise<void> {
        this.httpVideo.sendVideo(this.data.blobData, this.data.format)
    }
}
