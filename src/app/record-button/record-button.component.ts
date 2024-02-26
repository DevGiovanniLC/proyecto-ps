import { Component } from '@angular/core';

@Component({
    selector: 'app-record-button',
    standalone: true,
    imports: [],
    templateUrl: './record-button.component.html',
    styleUrl: './record-button.component.css'
})

export class RecordButtonComponent {

    ngOnInit(): void {
        const  button = document.querySelector('button')

        if (button) {
            button.addEventListener('click', this.record);
        }
    }

    async record( event : MouseEvent ): Promise<void> {
        const media = this.getMedia(30)

        const mediaRecorder = this.getMediaRecorder(media)
        
        ;(await mediaRecorder).start()

        const video = this.getVideoTrack(media)

        ;(await video).addEventListener("ended", async () => {
            ;(await mediaRecorder).stop()
        })



        

    }


    async getMedia(framerate : number): Promise<MediaStream> {
        return  await navigator.mediaDevices.getDisplayMedia({
            video: { frameRate: { ideal: framerate } }
        })
    }

    async getMediaRecorder(media: Promise<MediaStream>): Promise<MediaRecorder> {
        return media.then( (mediaStream: MediaStream) => {
            return new  MediaRecorder(mediaStream, {
                mimeType: 'video/webm;codecs=vp8,opus'
            })
        })
    }

    async getVideoTrack(media: Promise<MediaStream>){
        return media.then( (mediaStream: MediaStream): MediaStreamTrack => {
            return  mediaStream.getVideoTracks()[0]
        })
    }

}
