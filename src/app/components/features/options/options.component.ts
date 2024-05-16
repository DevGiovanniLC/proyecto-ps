import { Component, Output, EventEmitter, inject } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { AuthService } from "../../../services/AuthService.service";


@Component({
    selector: 'app-options',
    standalone: true,
    imports: [FormsModule, ScreenshotButtonComponent],
    templateUrl: './options.component.html',
    styleUrl: './options.component.css',
})
export class OptionsComponent {
    framerate: number;
    resolution: number;
    delay: number;
    videoformat: string;
    imageformat: string

    constructor() {
        this.framerate = 60;
        this.resolution = 1080;
        this.videoformat = "mp4";
        this.imageformat = "png";
        this.delay = 0;
    }

    firebaseService = inject(AuthService);

    storage() {
        return (localStorage.getItem('isloogedIn') === 'true');
    }

    getOptions() {
        return {
            framerate: this.framerate,
            resolution: this.resolution,
            delay: this.delay,
            videoformat: this.videoformat,
            imageformat: this.imageformat
        };
    }
}
