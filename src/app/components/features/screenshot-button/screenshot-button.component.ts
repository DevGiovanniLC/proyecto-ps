import {AfterViewInit, Component, ElementRef, inject, Input, ViewChild} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { ScreenshotTaker } from '../../../services/ScreenshotTaker.service';
import { AuthService } from "../../../services/AuthService.service";

@Component({
	selector: 'app-screenshot-button',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './screenshot-button.component.html',
	styleUrl: './screenshot-button.component.css',
})
export class ScreenshotButtonComponent {
  @Input() _formatImage: string;
  @Input() _delay: number;

	constructor(private screenshotTaker: ScreenshotTaker) { }

	screenshotEvent(): void {
		this.screenshotTaker.take(this._formatImage,this._delay);
	}
}
