Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke, labelsClickHandlers) {
    var paper = this;
    var rad = Math.PI / 180;
    var chart = this.set();
	var popupLabel = this.set();
    var popup = null;
    var popupLabelFontLine1 = {"font-family":"Helvetica, Arial","font-size":"12px","font-weight":"bold", fill: "#000000"};
    var popupLabelFontLine2 = {"font-family":"Helvetica, Arial","font-size":"12px","font-weight":"normal","color":"#ffffff", fill: "#ffffff"};
	popupLabel.push(paper.text(cx, cy, "First Line").attr(popupLabelFontLine1));
	popupLabel.push(paper.text(cx, cy, "Second Line").attr(popupLabelFontLine2));
	popup = paper.popup(100, 100, popupLabel, "right").hide();
    popupLabel.hide();
	
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
	
    var angle = 0;
	var total = 0;
	var start = 0;
	var process = function (j) {
            var value = values[j];
            var angleplus = 360 * value / total;
			var popangle = angle + (angleplus / 2);
			var color = Raphael.hsb(start, .75, 1);
			var ms = 500;
			var delta = 20;
			var bcolor = Raphael.hsb(start, 1, 1);
			var p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 3});
			var txt = paper.text(cx + (r + delta) * Math.cos(-popangle * rad), cy + (r + delta) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20});
			var currLabel = labels[j];
			var clickHandler = null;
			
			//check the current label
			if (labelsClickHandlers!="undefined" && labelsClickHandlers!=null) {
				//loop through the click handlers
				for (var k=0;k<labelsClickHandlers.length;k++) {
					//check if its the current label
					if (currLabel == labelsClickHandlers[k]["key"]) {
						clickHandler = labelsClickHandlers[k]["eventHandler"];
						p.attr({"cursor":"pointer"});
						p.click(clickHandler);
					}
				}
			}
			
			p.mouseover(function (event) {
                p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "linear");
                //txt.stop().animate({opacity: 1}, ms, "linear");
				var lbl = txt.attr("text");
				var txtY = Math.round(txt.attr("y"));
				var x = event.clientX;
				var y = event.clientY;
				y = txtY;
				var line2 = "";
				var side = "right";
                if (x + popup.getBBox().width > (r*2)) {
                    side = "right";
                }
				//set the second line's text
				line2 = values[j];
				//line2 = "txtY=["+txtY+"]:event.clientY=["+event.clientY+"]:cy=["+cy+"]:height=["+r*2+"]";
				popupLabel[0].attr({"x": x, "y": y,"text": lbl});
				popupLabel[0].toFront();
				popupLabel[1].attr({"x": x, "y": y+16,"text": line2});
				popupLabel[1].toFront();
				popupLabel.show();
				popup = paper.popup(x, y, popupLabel, side).attr({fill: "#000", stroke: "#666", "stroke-width": 2, "fill-opacity": .7}).hide();
				popup.show();
            });
			p.mouseout(function () {
                p.stop().animate({transform: ""}, ms, "linear");
                //txt.stop().animate({opacity: 0}, ms);
				popup.hide();
				popupLabel[0].hide();
				popupLabel[1].hide();
			});
            angle += angleplus;
            chart.push(p);
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
