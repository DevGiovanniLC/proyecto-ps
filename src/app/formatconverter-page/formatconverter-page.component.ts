import { Component} from '@angular/core';
import HeaderComponent from '../components/header/header.component';
import { FrameUploaderComponent } from './components/frame-uploader/frame-uploader.component';
import { FileListComponent } from './components/file-list/file-list.component';

@Component({
    selector: 'app-formatconverter-page',
    standalone: true,
    templateUrl: './formatconverter-page.component.html',
    styleUrls: ['./formatconverter-page.component.css'],
    imports: [
        HeaderComponent,
        FrameUploaderComponent,
        FileListComponent
    ],
})
export class FormatconverterPageComponent {

    constructor() { }


}
