import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { OptionsComponent } from '../options/options.component';
import { PrevisualitionContentDialogComponent } from '../previsualition-content-dialog/previsualition-content-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { VideoRecorder } from '../../../services/VideoRecorder.service';

@Component({
    selector: 'app-record-button',
    standalone: true,
    providers: [VideoRecorder],
    imports: [FormsModule, ScreenshotButtonComponent, OptionsComponent],
    templateUrl: './record-button.component.html',
    styleUrl: './record-button.component.css',
})
export class RecordButtonComponent {
    @Input() _framerate: number;
    @Input() _resolution: number;
    @Input() _delay: number;
    @Input() _format: string;

    protected isRecording: boolean;
    protected isMicrophoneEnabled: boolean;
    private icons:any

    protected $iconRecord: string;
    protected $recordingButtonDisabled: boolean;

    protected $iconMicro: string;
    protected $microphoneButtonDisabled: boolean;

    constructor(private _matDialog: MatDialog, private videoRecorder: VideoRecorder) {
        this.icons = {
            STOPPED: 'url(/assets/stopped_state.webp)',
            RECORDING: 'url(/assets/recording_state.webp)',
            MICROENABLED: 'url(/assets/micro_enable.webp)',
            MICROCLOSED: 'url(/assets/micro_disable.webp)',
        }

        this.isRecording = false;
        this.isMicrophoneEnabled = true
    }

    ngOnInit(): void {
        this.videoRecorder.getMediaRecorder().subscribe((mediarecorder) => {
            if (mediarecorder != null) this.handleMediaRecorderEvents(mediarecorder);
        })
    }

    private openModal(data: Blob, format: string) {
        this._matDialog.open(PrevisualitionContentDialogComponent, {
            width: '65%',
            data: {
                blobData: data,
                format: format
            }
        })
    }

    async toggleRecording(): Promise<void> {
        if (this.videoRecorder.isRecording()) {
            await this.videoRecorder.stop();
        } else {
            this.videoRecorder.toggleMicrophone(this.isMicrophoneEnabled);
            await this.videoRecorder.start(this._framerate, this._resolution, this._delay,()=>{
                this.$recordingButtonDisabled = true
            });
        }
    }

    private handleMediaRecorderEvents(recorder: MediaRecorder): void {
        recorder.addEventListener('start', () => {
            this.isRecording = true;
            this.updateStateAndButtonStyle();
            this.$recordingButtonDisabled = false
        }
        );
        recorder.addEventListener('dataavailable', (event: BlobEvent) => {
            this.isRecording = false
            this.updateStateAndButtonStyle()
            this.openModal(event.data, this._format);
        });
    }

    private updateStateAndButtonStyle(): void {

        if (this.isRecording) {
            this.$iconRecord = this.icons.RECORDING
            this.$microphoneButtonDisabled = true;
        } else {
            this.$iconRecord = this.icons.STOPPED
            this.$microphoneButtonDisabled = false
        }
    }

    protected toggleMicrophone() {
        this.isMicrophoneEnabled = !this.isMicrophoneEnabled
        this.$iconMicro = (this.isMicrophoneEnabled) ? this.icons.MICROENABLED : this.icons.MICROCLOSED;
    }
}
