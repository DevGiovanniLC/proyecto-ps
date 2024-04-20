import { Component, Output, EventEmitter, inject } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { AuthService } from "../../auth/sign-up/auth.service";


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
  videoformat:string;
  imageformat:string

	@Output() framerate_event: EventEmitter<number> =new EventEmitter<number>();
	@Output() resolution_event: EventEmitter<number> = new EventEmitter<number>();
	@Output() delay_event: EventEmitter<number> = new EventEmitter<number>();
  @Output() formatvideochange: EventEmitter<string> = new EventEmitter<string>();
  @Output() formatimagechange: EventEmitter<string> = new EventEmitter<string>();


	onFramerateChange() {
		this.framerate_event.emit(this.framerate);
	}
	onResolutionChange() {
		this.resolution_event.emit(this.resolution);
	}
	onDelayChange() {
		this.delay_event.emit(this.delay);
	}
  onformatVideoChange(){
    this.formatvideochange.emit(this.videoformat);

  }
  onformatImageChange(){
    this.formatimagechange.emit(this.imageformat);

  }
  firebaseService = inject(AuthService);


	constructor() {
		this.framerate = 60;
		this.resolution = 1080;
		this.delay = 0;
    this.videoformat="mp4";
    this.imageformat="png"
	}

  storage(){

    const x = localStorage.getItem('isloogedIn') === 'true';
    console.log(x)
    return x

  }
}
