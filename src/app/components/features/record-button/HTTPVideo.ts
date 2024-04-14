export class HTTPVideo {
    private constructor() {}
    
    static sendVideo(videoName: string, file: Blob) {
        const axios = require('axios');

        const formData = new FormData();
        formData.append('name', videoName);
        formData.append('video', file);

        axios.post('http://localhost:3000/upload', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al cargar el video:', error);
            });
    }
}