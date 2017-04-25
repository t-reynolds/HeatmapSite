var urls = [
	"https://www.youtube.com/embed/YH3c1QZzRK4&t",
	"https://www.youtube.com/embed/oj1AfkPQa6M",
	"https://www.youtube.com/embed/NM2wtte1JRE",
	"https://www.youtube.com/embed/4PN5JJDh78I",
	"https://www.youtube.com/embed/hu6hIhW00Fk",
	"https://www.youtube.com/embed/6v2L2UGZJAM",
	"https://www.youtube.com/embed/M1wkPUZ9vX4",
	"https://www.youtube.com/embed/tEYCjJqr21A",
	"https://www.youtube.com/embed/lPWEKUQLb9Y",
	"https://www.youtube.com/embed/bBMcDPV2NrQ"
	];
var player;
var showGrid = false;
var gridExists = false;
function toggleGrid(){
	if(!showGrid){
		//Shows all URLS in array
		if(!gridExists){
			initGrid();
			gridExists = true;
		}
		document.getElementById("grid").style.display = 'grid';
		showGrid = true;
	}
	else{
		document.getElementById("grid").style.display = 'none';
		showGrid = false;
	}
}
function initGrid(){
	for(i = 0; i < urls.length; i ++){
			generateGridItem(urls[i]);
		}
}
function randomURL(){
	var num = Math.round(Math.random() * (urls.length-1));
	player.loadVideoById(convertURL(urls[num]));
	playVideo();
};
function convertURL(url){
	return url.replace("https://www.youtube.com/embed/", "");
}
function addURL(){
	//Adds URL to array and parses out unaccepted format
	var url = prompt("Paste YouTube URL in here! \n Format: https://www.youtube.com/watch?v=bBMcDPV2NrQ");
	var valid_url = url.replace("watch?v=", "embed/");
	if(!urls.includes(valid_url) && isValidURL(url)){
		urls.push(valid_url);
		generateGridItem(valid_url);
	}
	else if(urls.includes(valid_url)){
		alert("That URL already exists!");
	}
	else{
		alert("Invalid URL! Stop trying to break me >:(");
	}

};
function isValidURL(url){
	if(url.includes("www.youtube.com/watch?v=")){
		return true;
	}
	return false;
};
function generateGridItem(url){
	//Programatically add IFRAME elements to a grid element
	var video = document.createElement("IFRAME");
	video.src = url;
	video.controls = '0';
	document.getElementById("grid").appendChild(video);          
};

//tag script contains YouTube API functions
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
	player = new YT.Player('ytPlayer', {
		playerVars: { 'autoplay': 1, 'controls': 0 },
	  	height: '390',
	  	width: '640',
	 	 videoId: 'M7lc1UVf-VE',
	 	 events : {'onStateChange': onPlayerStateChange }
	});
}
function playing(){
	document.getElementById("pauseVideo").style.display = "block";
	document.getElementById("playVideo").style.display = "none";
}
function paused(){
	document.getElementById("pauseVideo").style.display = "none";
	document.getElementById("playVideo").style.display = "block";
}
function playVideo(){
	player.playVideo();
	playing();
}
function pauseVideo(){
	player.pauseVideo()
	paused();
}
function skipBackward() {
    var currentTime = player.getCurrentTime();
    player.seekTo(currentTime - 10, true);
    playVideo();
}

function skipForward() {
    var currentTime = player.getCurrentTime();
    player.seekTo(currentTime + 10, true);
    playVideo();  
}

function restartVideo() {
	player.stopVideo();
	playVideo();
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