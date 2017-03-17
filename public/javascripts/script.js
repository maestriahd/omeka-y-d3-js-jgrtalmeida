
var video = document.getElementByClassName("inicio");
video.addEventListener("timeupdate", function(){
  if(this.currentTime >=34){
    this.pause;
  }
});
