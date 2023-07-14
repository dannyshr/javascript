Raphael.fn.barChart = function (x, y, width, height, values, labelsX, labelsY, showGrid, stroke, labelsClickHandlers) {
    var paper = this;
    var chart = this.set();
	var popupLabel = this.set();
    var popup = null;
    var popupLabelFontLine1 = {"font-family":"Helvetica, Arial","font-size":"12px","font-weight":"bold", fill: "#000000"};
    var popupLabelFontLine2 = {"font-family":"Helvetica, Arial","font-size":"12px","font-weight":"normal","color":"#ffffff", fill: "#ffffff"};
	popupLabel.push(paper.text(x, y, "First Line").attr(popupLabelFontLine1));
	popupLabel.push(paper.text(x, y, "Second Line").attr(popupLabelFontLine2));
	popup = paper.popup(100, 100, popupLabel, "right").hide();
    popupLabel.hide();
	var leftgutter = 150;
    var bottomgutter = 200;
    var topgutter = 400;
	var gridX = (width - leftgutter) / labelsX.length;
	var maxValue = getMax();
	var minValue = getMin();

	if (showGrid==true) {
		paper.grid(leftgutter + gridX * .5 + .5, topgutter + .5, width - leftgutter - gridX, height - topgutter - bottomgutter, 10, 10, "#000000");
	}
	else {
		var x2 = x + width;
        var y2 = y - height;
		paper.path(["M",x,y,"L",x,y2,"M",x,y,"L",x2,y,"z"]).attr({stroke: stroke, "stroke-width": 1});
		//paper.grid(leftgutter + gridX * .5 + .5, topgutter + .5, width - leftgutter - gridX, height - topgutter - bottomgutter, 0, 0, "#000000");
	}
	
    function sector(x, y, barWidth, barValue, params) {
        var x1 = x;
		var x2 = x + barWidth;
		var y1 = y;
        var y2 = y - barValue;
        return paper.path(["M",x1,y1,"L",x1,y2,"L",x2,y2,"L",x2,y1,"z"]).attr(params);
    }
	
	function getMax() {
		//declare locals
		var _max = 0;
		
		//loop through the values
		for (var i=0;i<values.length;i++) {
			//check if its the max
			if (values[i]>_max) {
				_max = values[i];
			}
		}
		
		//return the method's value
		return _max;
	}
	
	function getMin() {
		//declare locals
		var _min = 0;
		
		//loop through the values
		for (var i=0;i<values.length;i++) {
			//check if its the max
			if (values[i]<_min) {
				_min = values[i];
			}
		}
		
		//return the method's value
		return _min;
	}
	
	function getPercent(value) {
		//declare locals
		var precision = 2;
		var percent = 0;
		var max = 0;
		
		//calculate the percent
		max = getMax();
		percent = (value / max) * 100;
		percent = Math.round(percent * Math.pow(10, precision)) / Math.pow(10, precision);
		
		//return the method's value
		return percent;
	}
	
	function getPercentHeight(value) {
		//declare locals
		var precision = 2;
		var percent = 0;
		var heightUnit = 0;
		
		//get the value's percent
		percent = getPercent(value);
		
		//get the height unit of a single percent
		heightUnit = Math.round((height/100) * Math.pow(10, precision)) / Math.pow(10, precision);
		
		//return the method's value
		return (percent*heightUnit);
	}
	
    var total = 0;
    var start = 0;
    var process = function (j) {
		var value = values[j];
		var color = Raphael.hsb(start, .75, 1);
		var ms = 500;
		var delta = 20;
		var bcolor = Raphael.hsb(start, 1, 1);
		var barsSpace = 10;
		var barWidth = 50;
		var barHeight = getPercentHeight(value);
		var currX = x;
		if (j==0) {
			currX += barsSpace;
		}
		else {
			currX += (barWidth*j) + (barsSpace*(j+1));
		}
		var b = sector(currX, y, barWidth, barHeight, {fill: "#cccccc", stroke: stroke, "stroke-width": 3});
		var txt = paper.text(currX, y - delta, labelsX[j]).attr({fill: bcolor, stroke: "#000000", opacity: 0, "font-size": 20});
		var currLabel = labelsX[j];
		var clickHandler = null;
			
			//check the current label
			if (labelsClickHandlers!="undefined" && labelsClickHandlers!=null) {
				//loop through the click handlers
				for (var k=0;k<labelsClickHandlers.length;k++) {
					//check if its the current label
					if (currLabel == labelsClickHandlers[k]["key"]) {
						clickHandler = labelsClickHandlers[k]["eventHandler"];
						b.attr({"cursor":"pointer"});
						b.click(clickHandler);
					}
				}
			}
			
			b.mouseover(function (event) {
                //b.stop().animate({transform: "s1.1 1.1 " + x + " " + y}, ms, "linear");
                //txt.stop().animate({opacity: 1}, ms, "linear");
				var lbl = txt.attr("text");
				var txtY = Math.round(txt.attr("y"));
				var xEv = event.clientX;
				var yEv = event.clientY;
				yEv = txtY;
				var line2 = "";
				var side = "right";
                if (xEv + popup.getBBox().width > (width)) {
                    side = "left";
                }
				//set the second line's text
				line2 = values[j];
				//line2 = "txtY=["+txtY+"]:event.clientY=["+yEv+"]:y=["+y+"]:height=["+height+"]";
				popupLabel[0].attr({"x": xEv, "y": yEv,"text": lbl});
				popupLabel[0].toFront();
				popupLabel[1].attr({"x": xEv, "y": yEv+16,"text": line2});
				popupLabel[1].toFront();
				popupLabel.show();
				popup = paper.popup(xEv, yEv, popupLabel, side).attr({fill: "#000", stroke: "#666", "stroke-width": 2, "fill-opacity": .7}).hide();
				popup.show();
            });
			b.mouseout(function () {
                //b.stop().animate({transform: ""}, ms, "linear");
				popup.hide();
				popupLabel[0].hide();
				popupLabel[1].hide();
			});
            chart.push(b);
            chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};