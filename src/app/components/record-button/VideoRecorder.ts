import { Observable } from './Observable';
import { Observer } from './Observer';

export class VideoRecorder implements Observable {
	mediaRecorder!: MediaRecorder;
	video!: MediaStreamTrack;
	framerate_value: number;
	resolution_value: number;
	Observers: Observer[];

	constructor(framerate_value: number, resolution_value: number) {
		this.framerate_value = framerate_value;
		this.resolution_value = resolution_value;
		this.Observers = [];
	}

	public async start(): Promise<void> {
		let media = await this.getMedia(
			this.framerate_value,
			this.resolution_value
		);

		this.mediaRecorder = this.generateMediaRecorder(media);
		this.notifyObservers();

		this.mediaRecorder.start();

		this.video = this.generateVideoTrack(media);
	}

	public async stop(): Promise<void> {
		this.mediaRecorder.stop();
	}

	public state(): string {
		if (this.mediaRecorder === undefined) return 'stopped';
		return this.mediaRecorder.state;
	}

	public getMediaRecorder(): MediaRecorder {
		return this.mediaRecorder;
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
			this.downloadVideo(event);
		});

		return mediaRecorder;
	}

	private async downloadVideo(event: BlobEvent): Promise<void> {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(event.data);
		link.download = 'captura.mkv';
		link.click();
	}

	private generateVideoTrack(media: MediaStream): MediaStreamTrack {
		const video = media.getVideoTracks()[0];

		video.onended = () => {
			this.stop();
		};

		return video;
	}

	public notifyObservers() {
		for (const observer of this.Observers) {
			observer.ObsExecute();
		}
	}

	public addObserver(Observer: Observer) {
		this.Observers.push(Observer);
	}
}
