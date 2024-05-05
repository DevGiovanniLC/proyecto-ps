import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { HTTPVideoTransfer } from '../../../services/HTTPVideoTransfer.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-file-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.css'],
    providers: [HTTPVideoTransfer]
})
export class FileListComponent implements OnInit {
    @Input() inputFiles: EventEmitter<FileList>

    protected fileList = []
    protected format: string;


    constructor(private http: HTTPVideoTransfer) { 
        this.format = "mp4";
    }

    ngOnInit() {

        this.inputFiles.subscribe(files => {

            if (files == undefined) return;

            for (let i = 0; i < files.length; i++) {
                
                if (this.isVideoFormat(files[i])){
                    this.fileList.push(files[i]);
                }

            }
        })
    }

    deleteFile(file: File) {
        this.fileList.splice(this.fileList.indexOf(file), 1);
    }

    convertFiles() {
        for (let file of this.fileList) {
            
            this.http.sendVideo(file, this.format, () => {
                this.fileList.splice(this.fileList.indexOf(file), 1);
            })
        }
    }

    private isVideoFormat(file: File) {
        return /^video\//.test(file.type);
    }

}

