import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScreenshotButtonComponent } from '../components/screenshot-button/screenshot-button.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [FormsModule, ScreenshotButtonComponent],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  framerate_value: number;
	resolution_value: number;
  delay_value: number;

	constructor(private dataService: DataService) {
    this.framerate_value = this.dataService.framerateValue;
    this.resolution_value = this.dataService.resolutionValue;
    this.delay_value = this.dataService.delayValue;
  }

  updateValues() {
    this.dataService.framerateValue = this.framerate_value;
    this.dataService.resolutionValue = this.resolution_value;
    this.dataService.delayValue = this.delay_value;
  }

}
