import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})

export class HTTPVideoTransfer {
    constructor() { }

    sendVideo(file: Blob, format: string, func?: Function) {

        const formData = new FormData();
        formData.append('video', file);
        formData.append('format', format);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
            .then(async (res) => {
                res.arrayBuffer().then((data) => {
                    if (func) func();
                    this.downloadVideo(new Blob([data]))
                })
            })
            .catch(error => {
                this.downloadVideo(file)
            });

    }

    private async downloadVideo(data: Blob): Promise<void> {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data);
        link.download = 'video'
        link.click();
    }

}