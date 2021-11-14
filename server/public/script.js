let wsConnection;


function connectWebsocket() {
    wsConnection = new WebSocket(`ws://${document.location.host}`);
    wsConnection.onmessage = (msg => {
        const imageBlob = msg.data;
        console.log(imageBlob);
        var reader = new FileReader();
        reader.readAsDataURL(imageBlob); 
        reader.onloadend = function() {
            var base64data = reader.result.substr(reader.result.indexOf(',')+1);                
            const imgEl = document.getElementById('image');
            imgEl.src = `data:image/jpeg;charset=utf-8;base64,${base64data}`;
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
        connectWebsocket();
    }, false);
