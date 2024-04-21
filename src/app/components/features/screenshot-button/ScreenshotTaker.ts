export class ScreenshotTaker {
	async take(formatImage: string, delay : number) {
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: { deviceId: 'screen' },
			});

			const videoElement = document.createElement('video');
			videoElement.srcObject = stream;
			videoElement.play();

			await new Promise((resolve) => {
				videoElement.onloadedmetadata = resolve;
			});

			const canvas = document.createElement('canvas');
			canvas.width = videoElement.videoWidth;
			canvas.height = videoElement.videoHeight;

			const context = canvas.getContext('2d')!;
			setTimeout(() => {
			context.drawImage(videoElement, 0, 0, canvas.width, canvas.height)!;

			const screenshotDataUrl = canvas.toDataURL('image/' + formatImage);

			const downloadLink = document.createElement('a');
			downloadLink.href = screenshotDataUrl;
			downloadLink.download = 'screenshot.' + formatImage;

			downloadLink.click();

			stream.getTracks().forEach((track) => track.stop());
			}, delay);
		} catch (error) {
			console.error('Error al tomar la captura de pantalla:', error);
		}
	}
}
