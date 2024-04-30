import { Component, OnInit } from '@angular/core';
import HeaderComponent from '../components/header/header.component';
import { HTTPVideoTransfer } from '../services/HTTPVideoTransfer.service';

@Component({
  selector: 'app-formatconverter-page',
  standalone: true,
  templateUrl: './formatconverter-page.component.html',
  styleUrls: ['./formatconverter-page.component.css'],
  imports: [
    HeaderComponent,
  ],
  providers: [HTTPVideoTransfer]

})
export class FormatconverterPageComponent implements OnInit {

  constructor(private httpVideo: HTTPVideoTransfer) { }

  ngOnInit() { }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.httpVideo.sendVideo(files[0],"mp4");
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    this.httpVideo.sendVideo(files[0],"mp4");
  }

}
