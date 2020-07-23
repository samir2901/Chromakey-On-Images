var imgBg, imgFg, canvasBg, canvasFg, ctxFg, ctxBg;

function uploadBg(){
  canvasBg = document.getElementById("canBg");
  canvasBg.width = 500;
  canvasBg.height = 300;
  var fileInput = document.getElementById("bginput");
  //var filename = fileInput.value;
  imgBg = new SimpleImage(fileInput);  
  imgBg.drawTo(canvasBg);
}

function uploadFg(){
  canvasFg = document.getElementById("canFg");
  canvasFg.width = 500;
  canvasFg.height = 300;
  var fileInput2 = document.getElementById("fginput");  
  imgFg = new SimpleImage(fileInput2);
  imgFg.drawTo(canvasFg);
}

function clearCanvas(){
  ctxFg = canvasFg.getContext("2d");
  ctxBg = canvasBg.getContext("2d");  
  ctxFg.clearRect(0,0,canvasFg.width,canvasFg.height);
  ctxBg.clearRect(0,0,canvasBg.width,canvasBg.height);  
}

function clearAll(){
  clearCanvas();
  var fileInput = document.getElementById("bginput");
  var fileInput2 = document.getElementById("fginput");
  fileInput.value = null;
  fileInput2.value = null;
}


function makeComposite(){  
  if(imgFg == null || !imgFg.complete()){
    alert("Foreground Not Loaded.");
    return;
  }
  if(imgBg == null || !imgBg.complete()){
    alert("Background Not Loaded.");
    return;
  }
  clearCanvas();   
  var slider = document.getElementById("slider");
  var greenThreshold = slider.value;
  var imgOutput = new SimpleImage(imgFg.getWidth(),imgFg.getHeight());  
  for(var pixel of imgFg.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if(pixel.getGreen() > greenThreshold){
      var bgPixel = imgBg.getPixel(x, y);
      imgOutput.setPixel(x, y, bgPixel);
    }else{
      imgOutput.setPixel(x, y, pixel);
    }
  }  
  imgOutput.drawTo(canvasFg);
}


function downloadImg(){
  var img = canvasFg.toDataURL("image/png",1.0).replace("image/png","image/octect-stream");
  var link = document.createElement("a");
  link.download = "composite.png";
  link.href = img;
  link.click();
}