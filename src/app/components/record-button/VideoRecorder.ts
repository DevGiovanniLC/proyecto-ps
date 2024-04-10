import { NextObserver, Subscribable, Unsubscribable } from 'rxjs';

export class VideoRecorder implements Subscribable<any>, Unsubscribable {
	mediaRecorder!: MediaRecorder;
	framerate_value: number;
	resolution_value: number;
	delay_value: number;
	observers: NextObserver<any>[];

	constructor(
		framerate_value: number,
		resolution_value: number,
		delay_value: number
	) {
		this.framerate_value = framerate_value;
		this.resolution_value = resolution_value;
		this.delay_value = delay_value;
		this.observers = [];
	}

	public async start(): Promise<void> {
		const audioStream = await navigator.mediaDevices.getUserMedia({
			audio: true,
		});

		const videoStream = await this.getMedia(
			this.framerate_value,
			this.resolution_value
		);

		const media = this.combineVideoAndAudio(audioStream, videoStream);

		this.mediaRecorder = this.generateMediaRecorder(media);
		this.notify(this.mediaRecorder);

		await this.delay(this.delay_value * 1000); // Esperar el tiempo de retraso

		console.log(
			'El retraso ha terminado después de ' +
				this.delay_value +
				' segundos'
		);

		this.mediaRecorder.start();

		this.generateTracks(media);
	}

	public async stop(): Promise<void> {
		this.mediaRecorder.stop();
	}

	public state(): string {
		if (this.mediaRecorder === undefined) return 'stopped';
		return this.mediaRecorder.state;
	}

	private delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
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

	private combineVideoAndAudio(
		audioStream: MediaStream,
		videoStream: MediaStream
	) {
		const combinedStream = new MediaStream();
		[videoStream, audioStream].forEach((stream) =>
			stream
				.getTracks()
				.forEach((track) => combinedStream.addTrack(track))
		);
		return combinedStream;
	}

	private notify(data: any) {
		for (const observer of this.observers) {
			observer.next(data);
		}
	}

	unsubscribe(): void {
		console.log('observer unsusbribed');
	}
	subscribe(observer: NextObserver<any>): Unsubscribable {
		this.observers.push(observer);
		return this;
	}
}
