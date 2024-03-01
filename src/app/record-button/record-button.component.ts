import { Component } from '@angular/core';

@Component({
    selector: 'app-record-button',
    standalone: true,
    imports: [],
    templateUrl: './record-button.component.html',
    styleUrl: './record-button.component.css'
})

export class RecordButtonComponent {

    mediaRecorder: any = null;

    constructor(){
        const  record_button = document.getElementById('record-button');

        if (record_button) {
            record_button.addEventListener('click', (event) =>{ 

            if (this.mediaRecorder == null) {
                this.setRecord(event)
                return
            }

            if (this.mediaRecorder.state == 'recording') {
                this.mediaRecorder.stop();
                this.mediaRecorder = null;
            }
            
            });
        }

    }

    async setRecord( event : MouseEvent ): Promise<void> {
        
        let media = await this.getMedia(30)

        this.mediaRecorder = this.getMediaRecorder(media)

        this.mediaRecorder.start()
        
        const video = this.getVideoTrack(media)

        video.addEventListener("ended", async () => {
            this.mediaRecorder.stop()     
        })
        
        this.mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => { 
            this.downloadVideo(event) 
        })

    }

    private async  getMedia(framerate : number): Promise<MediaStream> {
        return  navigator.mediaDevices.getDisplayMedia({
            video: { frameRate: { ideal: framerate } }
        })
    }
    
    private getMediaRecorder(media: MediaStream): MediaRecorder {        
        return new  MediaRecorder(media, {
            mimeType: 'video/webm;codecs=vp8,opus'
        })
    }
    
    private  getVideoTrack(media: MediaStream): MediaStreamTrack{
        return  media.getVideoTracks()[0]
    }
    
    private downloadVideo(event: BlobEvent): void{
        const link = document.createElement("a")
        link.href = URL.createObjectURL(event.data)
        link.download = "captura.webm"
        link.click()
    }
    
    public async getScreen(){
        return this 
    }
    
}
