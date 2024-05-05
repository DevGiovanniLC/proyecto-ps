import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-frame-uploader',
    standalone: true,
    templateUrl: './frame-uploader.component.html',
    styleUrls: ['./frame-uploader.component.css']
})
export class FrameUploaderComponent implements OnInit {

    @Output() fileList_event: EventEmitter<FileList> = new EventEmitter<FileList>();

    fileList: FileList 

    constructor() { }

    ngOnInit() { }

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.fileList = event.dataTransfer.files;
        this.fileList_event.emit(this.fileList);
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
    }

    onFileSelected(event: Event) {
        this.fileList = (event.target as HTMLInputElement).files;
        this.fileList_event.emit(this.fileList);
    }

}
