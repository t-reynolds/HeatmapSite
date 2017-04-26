//tag script contains YouTube API functions
var player;
var isPlaying = false;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//

function onYouTubeIframeAPIReady() {
	player = new YT.Player('ytPlayer', {
		playerVars: { 'autoplay': 1, 'controls': 0 },
	  	height: '390',
	  	width: '640',
	 	 videoId: 'M7lc1UVf-VE',
	 	 events : {'onStateChange': onPlayerStateChange }
	});
	console.log("onYouTubeIframeAPIReady");
	randomURL();
}
function randomURL(){
	var num = Math.round(Math.random() * (urls.length-1));
	player.loadVideoById(convertURL(urls[num]));
	playVideo();
};
function playing(){
	document.getElementById("pauseVideo").style.display = "block";
	document.getElementById("playVideo").style.display = "none";
}
function paused(){
	document.getElementById("pauseVideo").style.display = "none";
	document.getElementById("playVideo").style.display = "block";
}
function playVideo(){
	isPlaying = true;
	player.playVideo();
	playing();
}
function pauseVideo(){
	isPlaying = false;
	player.pauseVideo()
	paused();
}
function skipBackward() {
    var currentTime = player.getCurrentTime();
    player.seekTo(currentTime - 10, true);
    if(isPlaying){
    	playVideo();
    }
}

function skipForward() {
    var currentTime = player.getCurrentTime();
    player.seekTo(currentTime + 10, true);
    if(isPlaying){
    	playVideo();
    }  
}

function restartVideo() {
	player.stopVideo();
	if(isPlaying){
    	playVideo();
    }
}

function onPlayerStateChange(event) {
    changeBorderColor(event.data);
  }
function changeBorderColor(playerStatus) {
    var color;
    if (playerStatus == 0) {
      color = "#FFFF00"; // ended = yellow
    } else if (playerStatus == 1) {
      color = "#33691E"; // playing = green
    } else if (playerStatus == 2) {
      color = "#DD2C00"; // paused = red
    } else if (playerStatus == 3) {
      color = "#AA00FF"; // buffering = purple
    }
    if (color) {
      document.getElementById('ytPlayer').style.borderColor = color;
    }
  }