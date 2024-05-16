import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RecordButtonComponent } from '../components/features/record-button/record-button.component';
import HeaderComponent from '../components/header/header.component';
import { OptionsComponent } from '../components/features/options/options.component';
import { ScreenshotButtonComponent } from '../components/features/screenshot-button/screenshot-button.component';
import { PrevisualitionContentDialogComponent } from '../components/features/previsualition-content-dialog/previsualition-content-dialog.component';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    imports: [
        RouterOutlet,
        RouterLink,
        RecordButtonComponent,
        HeaderComponent,
        OptionsComponent,
        ScreenshotButtonComponent,
        PrevisualitionContentDialogComponent
    ]
})
export class HomePageComponent implements OnInit {
    options: any = {
        framerate: 60, // Valores predeterminados
        resolution: 1080,
        delay: 0,
        videoformat: 'mp4',
        imageformat: 'png'
    };
    constructor() { }

    ngOnInit() {
    }

    receiveOptions(result: any) {
        this.options = result;
        console.log('Opciones recibidas en el MainComponent:', this.options);
    }
}
