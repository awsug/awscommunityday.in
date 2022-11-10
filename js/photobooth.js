let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
video.setAttribute("playsinline", true);
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
var constraints = {
    audio: false,
    video: {
        facingMode: 'user'
    }
}
function takeshot() {
  
    let div =
        document.getElementById('photoframe'); 
     
  
    html2canvas(div,{ 
        dpi: 144,
        allowTaint: true
      }).then(
        
        function (canvas) {
            
            return Canvas2Image.saveAsPNG(canvas);
        })
   
}
camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia(constraints);
	video.srcObject = stream;
});
camera_button.click();
click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg', 1.0); 
    takeshot();
   	// data url of the image
   //	console.log(image_data_url);
});

