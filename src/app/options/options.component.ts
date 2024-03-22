import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from '../components/record-button/VideoRecorder';
import { ScreenshotButtonComponent } from '../components/screenshot-button/screenshot-button.component';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [FormsModule, ScreenshotButtonComponent],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  framerate_value: number = 60;
	resolution_value: number = 1080;
  delay_value: number = 2;

	constructor() { }
}
