 var displayHeatmap = true;
 window.onload = function() {
    // create a heatmap instance
    var heatmap = h337.create({
      container: document.getElementById('heatmapContainer'),
      maxOpacity: .6,
      radius: 50,
      blur: .90,
    });
    var heatmapContainer = document.getElementById('heatmapContainerWrapper');
    heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function(e) {
      // we need preventDefault for the touchmove
      e.preventDefault();
      var x = e.layerX;
      var y = e.layerY;
      if (e.touches) {
        x = e.touches[0].pageX;
        y = e.touches[0].pageY;
      }
      //Generates canvas information
      heatmap.addData({ x: x, y: y, value: 2 });
    };
    //Initial click briefly removes heatmap canvas, second copy click hits underlying elements
    heatmapContainer.onclick = function (e) {
        console.log("heatmap working...");
        hideHeatmap();
        document.elementFromPoint(e.layerX, e.layerY).click();
        showHeatmap();   
        if(!displayHeatmap){ hideHeatmap();}
      };
      heatmap.repaint();
  };
function toggleHeatmap(){
  if(displayHeatmap){
    displayHeatmap =false;
  }
  else{
    showHeatmap();
    displayHeatmap = true;
  }
};
function showHeatmap(){
   document.getElementById('heatmapContainerWrapper').style.display = 'block';
    document.getElementById('heatmapContainer').style.display = 'block';
};
function hideHeatmap(){
   document.getElementById('heatmapContainerWrapper').style.display = 'none';
    document.getElementById('heatmapContainer').style.display = 'none';
};