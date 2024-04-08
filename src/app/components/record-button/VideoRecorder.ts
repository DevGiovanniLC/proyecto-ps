import { delay } from "rxjs";

export class VideoRecorder {
	mediaRecorder: any = null;
	video: any = null;

	async start(
		framerate_value: number,
		resolution_value: number,
		delay_value: number,
		
		record_button: HTMLElement
	): Promise<void> {

    	let media = await this.getMedia(framerate_value, resolution_value);

		this.mediaRecorder = this.getMediaRecorder(media);

		await this.delay(delay_value * 1000); // Esperar el tiempo de retraso
    
    	console.log('El retraso ha terminado después de ' + delay_value + ' segundos');

		this.mediaRecorder.start();

		record_button.style.backgroundImage = "url('../../assets/stop.png')";

		this.video = this.getVideoTrack(media);

		this.video.addEventListener('ended', async () => {
			this.stop()
		});

		this.mediaRecorder.addEventListener(
			'dataavailable',
			(event: BlobEvent) => {
				this.downloadVideo(event);
				record_button.style.backgroundImage =
					"url('../../assets/record.png')";
			}
		);
	}

	private delay(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	private async getMedia(
		framerate: number,
		resolution: number
	): Promise<MediaStream> {
		return navigator.mediaDevices.getDisplayMedia({
			video: {
				frameRate: { ideal: framerate, max: 60 },
				height: resolution,
			},
			audio: true,
		});
	}

	private getMediaRecorder(media: MediaStream): MediaRecorder {
		return new MediaRecorder(media, {
			mimeType: 'video/x-matroska',
		});
	}

	private getVideoTrack(media: MediaStream): MediaStreamTrack {
		return media.getVideoTracks()[0];
	}

	private async downloadVideo(event: BlobEvent): Promise<void> {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(event.data);
		link.download = 'captura.mkv';
		link.click();
	}

	public isRecording(): boolean {
		return this.mediaRecorder != null;
	}

	public async stop(): Promise<void> {
		this.mediaRecorder.stop();
		this.mediaRecorder = null;
	}
}
