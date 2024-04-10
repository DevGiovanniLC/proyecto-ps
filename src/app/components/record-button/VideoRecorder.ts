import { NextObserver, Subscribable, Unsubscribable } from 'rxjs';
import { MediaCombiner } from './MediaCombiner';

export class VideoRecorder implements Subscribable<any>, Unsubscribable {
	private mediaRecorder!: MediaRecorder;
	private framerate_value: number;
	private resolution_value: number;
	private delay_value: number;
	private observers: NextObserver<any>[];
	private micro: boolean;

	constructor(
		framerate_value: number,
		resolution_value: number,
		delay_value: number
	) {
		this.framerate_value = framerate_value;
		this.resolution_value = resolution_value;
		this.delay_value = delay_value;
		this.observers = [];
		this.micro = true;
	}

	public async start(): Promise<void> {
		let media: MediaStream;

		if (this.micro) {
			const audioStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});

			const videoStream = await this.getMedia(
				this.framerate_value,
				this.resolution_value
			);

			media = new MediaCombiner([audioStream, videoStream]).combine();
		} else {
			media = await this.getMedia(
				this.framerate_value,
				this.resolution_value
			);
		}

		this.mediaRecorder = this.generateMediaRecorder(media);
		this.notify(this.mediaRecorder);

		await this.delay(this.delay_value);

		this.mediaRecorder.start();

		this.generateTracks(media);
	}

	private async delay(ms: number): Promise<void> {
		new Promise((resolve) => setTimeout(resolve, ms * 1000)).then(() => {
			console.log(
				'El retraso ha terminado después de ' +
					this.delay_value +
					'segundos'
			);
		});
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

	private generateMediaRecorder(media: MediaStream): MediaRecorder {
		const mediaRecorder = new MediaRecorder(media, {
			mimeType: 'video/x-matroska',
		});

		mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
			this.downloadVideo(event.data);
		});

		return mediaRecorder;
	}

	private async downloadVideo(data: Blob): Promise<void> {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(data);
		link.download = 'video.mkv';
		link.click();
	}

	private generateTracks(media: MediaStream): MediaStreamTrack {
		const video = media.getVideoTracks()[0];

		video.onended = () => {
			this.stop();
		};

		return video;
	}

	async stop(): Promise<void> {
		this.mediaRecorder.stop();
	}

	state(): string {
		if (this.mediaRecorder === undefined) return 'stopped';
		return this.mediaRecorder.state;
	}

	microphone(state: boolean) {
		this.micro = state;
	}

	subscribe(observer: NextObserver<any>): Unsubscribable {
		this.observers.push(observer);
		return this;
	}

	private notify(data: any) {
		this.observers.forEach((observer) => {
			observer.next(data);
		});
	}

	unsubscribe(): void {
		console.log('observer unsusbribed');
	}
}
