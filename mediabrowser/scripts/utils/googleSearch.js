//<![CDATA[
	google.load('search', '1.0');
	var searchControl = null;
	var divId = "searchDiv";
	function googleSearchOnLoad() {
		var app = new ImageSearchService();
	}
	
	function ImageSearchService() {
		//Create a search control
		searchControl = new google.search.SearchControl();
		var localSearch = new google.search.LocalSearch();

		//Add in a full set of searchers
		//searchControl.addSearcher(localSearch);
		//searchControl.addSearcher(new google.search.WebSearch());
		//searchControl.addSearcher(new google.search.VideoSearch());
		//searchControl.addSearcher(new google.search.BlogSearch());
		//searchControl.addSearcher(new google.search.NewsSearch());
		searchControl.addSearcher(new google.search.ImageSearch());
		//searchControl.addSearcher(new google.search.BookSearch());
		//searchControl.addSearcher(new google.search.PatentSearch());
		
		//Set the Local Search center point
		//localSearch.setCenterPoint("New York, NY");
		searchControl.setSearchCompleteCallback(this, ImageSearchService.prototype.OnSearchComplete);

		//tell the searcher to draw itself and tell it where to attach
		searchControl.draw(document.getElementById(divId));
	}
	
	ImageSearchService.prototype.OnSearchComplete = function(sc, searcher) {
		// if we have local search results, put them on the map
		if (searcher.results && searcher.results.length > 0) {
			//create a combo with the number of results
			createResultsNumCombo(searcher.results.length);
			var caption = document.getElementById("search").value;
			//alert("searcher.results.length: "+searcher.results.length);
			getCover();
		}
	}
	
	function createResultsNumCombo(numResults) {
		var divId = "numResDiv";
		var caption = document.getElementById("search").value;
		caption = caption.replace("'","\\'");
		var cmbHtml = "<select id=\"cmbNumRes\" onchange=\"getCover();\">";
		for (var i=0;i<numResults;i++) {
			cmbHtml += "<option value=\""+(i+1)+"\">"+(i+1)+"</option>";
		}
		cmbHtml += "</select>";
		document.getElementById(divId).innerHTML = cmbHtml;
	}
	
	function doSearch() {
		var textboxId = "search";
		var textboxObj = document.getElementById(textboxId);
		var search = null;
		var cmbId = "cmbTypes";
		var searchType = document.getElementById(cmbId).value;
		if (textboxObj==null) {
			return;
		}
		//search = escape(textboxObj.value);
		search = textboxObj.value;
		if (searchType.toLowerCase()=="video") {
			search += " dvd cover";
		}
		else if (searchType.toLowerCase()=="audio") {
			search += " cd cover";
		}
		else if (searchType.toLowerCase()=="ebook") {
			//searchControl.addSearcher(new google.search.BookSearch());
		}
		
		//execute a search
		searchControl.execute(search);
	}
	
	function sleep(_interval) {
		window.setTimeout("_void()",_interval);
	}
	
	function _void() {
		//do nothing
	}
	
	function getCover(caption) {
		//declare local variables
		var searchDivId = "searchDiv";
		var searchDivObj = null;
		var resultsDivId = "resultsDiv";
		var resultsDivObj = null;
		var comboId = "cmbNumRes";
		var comboObj = null;
		var imgSrcMatch = "http://images.google.com/images";
		var imgIndex = 0;
		var imgSource = null;
		var imgs = null;
		
		//get elements by their ids
		searchDivObj = document.getElementById(searchDivId);
		resultsDivObj = document.getElementById(resultsDivId);
		comboObj = document.getElementById(comboId);
		
		//check for nulls
		if (searchDivObj==null || resultsDivObj==null || comboObj==null) {
			return;
		}
		
		if (comboObj.value==null || comboObj.value=="") {
			if (BrowserDetect.browser.toLowerCase()=="explorer") {
				imgIndex = 0;
			}
			else {
				imgIndex = 1;
			}
		}
		else {
			imgIndex = parseInt(comboObj.value);
			if (BrowserDetect.browser.toLowerCase()=="explorer") {
				imgIndex -= 1;
			}
		}
		
		//check for images inside the search DOM node
		var imgs = searchDivObj.getElementsByTagName("img");
		if (imgs && imgs.length>0) {
			imgSource = imgs[imgIndex].src;
			imgSource = imgSource.substring((imgSource.indexOf("::")+2));
			imgSource = "http://" + unescape(imgSource);
			resultsDivObj.innerHTML = "<img src=\""+imgSource+"\">";
			/*
			try {
				addCover(caption);
			}
			catch(err){}
			*/
		}
	}
	
//]]>
