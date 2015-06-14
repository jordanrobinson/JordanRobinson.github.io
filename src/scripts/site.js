
//GA
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-54149799-1', 'auto');
ga('send', 'pageview');

//Animations

var fadeIn = function(element, timeout) {
	setTimeout(function() {
		element.className = element.className + " loaded";
	}, timeout);
};

var fetchJSONFile = function(path, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200 || httpRequest.status === 0) {
				console.log(httpRequest.responseText);
				var data = JSON.parse(httpRequest.responseText);
				if (callback) {
					callback(data);
				}
			}
		}
	};
	httpRequest.open('GET', path);
	httpRequest.send(); 
};

document.onreadystatechange = function () {
	if (document.readyState == 'complete') {

		var textElements = document.getElementsByClassName('fadein-text');
		var linkElements = document.getElementsByClassName('links');
		var timeout = 500;

		for (var i = 0; i < linkElements.length; i++) {
			fadeIn(linkElements[i], timeout);
			timeout += 500;
		}

		for (var i = 0; i < textElements.length; i++) {
			fadeIn(textElements[i], timeout);
			timeout += 200;
		}

		timeout += 3000;

		fetchJSONFile('json/statistics.json', function(data){

			for (var i = 0; i < data.statistics.length; i++) {
				var rightSidebar = document.getElementsByClassName('right-sidebar');
				for (var j = 0; j < rightSidebar.length; j++) {
					var newStat = document.createElement('p');
					newStat.appendChild(document.createTextNode(data.statistics[i]));
					newStat.className = newStat.className + "fadein-text";
					rightSidebar[j].appendChild(newStat);

					fadeIn(newStat, timeout);
					timeout += 2000;
				}
			}
		});

		console.log('%cNo bugs here! :D ', 
			'-webkit-background-clip: text; color:white; -webkit-text-fill-color: transparent; -webkit-gradient(linear, left top, right top, from(#ea8711), to(#d96363)); background-image: -webkit-linear-gradient(left, #ea8711, #d96363, #73a6df, #9085fb, #52ca79); background-image: -moz-linear-gradient(left, #ea8711, #d96363, #73a6df, #9085fb, #52ca79); font: 90px sans-serif; letter-spacing:2px;');
	}
};
