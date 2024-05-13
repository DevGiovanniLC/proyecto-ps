import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslationService } from '../../../../translation';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-frame-uploader',
    standalone: true,
    templateUrl: './frame-uploader.component.html',
    styleUrls: ['./frame-uploader.component.css']
})
export class FrameUploaderComponent implements OnInit {

    @Output() fileList_event: EventEmitter<FileList> = new EventEmitter<FileList>();

    fileList: FileList 
	jsonData: any;
	selectedLanguage: string;
	menuItems: string[] = ['', ''];

	constructor(private translation: TranslationService, private http: HttpClient) {
		this.selectedLanguage = localStorage.getItem('selectedLanguage');
	}

	async ngOnInit() {
        this.jsonData = await this.http.get<any>("../../../../assets/i18n/frame_uploader.json").toPromise();
        
        this.translateAll();    
    }

	translateAll() {
        
        localStorage.setItem('selectedLanguage', this.selectedLanguage);
        let values: string[] = Object.values(this.jsonData);
        
        

        values.forEach((text, index) => {
          this.translate(text, index);
          
        });
      }

    translate(text: string, index: number) {
        this.translation.translateText(text, this.selectedLanguage)
          .subscribe((response: any) => {
            this.menuItems[index] = response.data.translations[0].translatedText;
          }, (error) => {
            console.error('Error al traducir:', error);
          });
        }

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
