var showGrid = true;
var gridExists = false;
function toggleGrid(){
	if(showGrid){
		//Shows all URLS in array
		if(!gridExists){
			initGrid();
			gridExists = true;
		}
		document.getElementById("grid").style.display = 'grid';
		showGrid = false;
	}
	else{
		document.getElementById("grid").style.display = 'none';
		showGrid = true;
	}
}
function initGrid(){
	for(i = 0; i < urls.length; i ++){
			generateGridItem(urls[i]);
		}
}
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
