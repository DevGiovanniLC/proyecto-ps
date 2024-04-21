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

	@Output() framerate_event: EventEmitter<number> = new EventEmitter<number>();
	@Output() resolution_event: EventEmitter<number> = new EventEmitter<number>();
	@Output() delay_event: EventEmitter<number> = new EventEmitter<number>();
	@Output() formatvideochange: EventEmitter<string> = new EventEmitter<string>();
	@Output() formatimagechange: EventEmitter<string> = new EventEmitter<string>();

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

	onFramerateChange() {
		this.framerate_event.emit(this.framerate);
	}
	onResolutionChange() {
		this.resolution_event.emit(this.resolution);
	}
	onDelayChange() {
		this.delay_event.emit(this.delay);
	}
	onformatVideoChange() {
		this.formatvideochange.emit(this.videoformat);

	}
	onformatImageChange() {
		this.formatimagechange.emit(this.imageformat);
	}
}
