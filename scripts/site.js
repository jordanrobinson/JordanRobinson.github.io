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

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function addStat(stat, element, timeout) {
	var newStat = document.createElement('p');
	newStat.appendChild(document.createTextNode(stat));
	newStat.className = newStat.className + "fadein-text";
	element.appendChild(newStat);

	fadeIn(newStat, timeout);
}

document.onreadystatechange = function () {
	if (document.readyState == 'complete') {

		var textElements = document.getElementsByClassName('fadein-text');
		var linkElements = document.getElementsByClassName('links');
		var timeout = 500;

		for (var i = 0; i < linkElements.length; i++) {
			fadeIn(linkElements[i], timeout);
			timeout += 500;
		}

		for (var j = 0; j < textElements.length; j++) {
			fadeIn(textElements[j], timeout);
			timeout += 200;
		}

		timeout += 3000;

		fetchJSONFile('json/statistics.json', function(data){

			statistics = shuffleArray(data.statistics);

			for (var k = 0; k < 7; k++) {
				var rightSidebar = document.getElementsByClassName('right-sidebar');
				for (var l = 0; l < rightSidebar.length; l++) {
					if (k === 0) {
						addStat("Site statistics...", rightSidebar[l], timeout);
					}
					else if (k === 6) {
						addStat('There are currently 12 of these statistics, randomly shown', rightSidebar[l], timeout);
					}
					else {
						addStat(statistics[k], rightSidebar[l], timeout);						
					}
					timeout += 2000;
				}
			}

		});

		cheet('up up down down left right left right b a', function() {
			var konami = document.getElementsByClassName('heading');
			for (var i = 0; i < konami.length; i++) {
				konami[0].className = konami[0].className + " konami";
			}
		});

		console.log('%cNo bugs here! :D ', 
			'-webkit-background-clip: text; color:white; -webkit-text-fill-color: transparent; -webkit-gradient(linear, left top, right top, from(#ea8711), to(#d96363)); background-image: -webkit-linear-gradient(left, #ea8711, #d96363, #73a6df, #9085fb, #52ca79); background-image: -moz-linear-gradient(left, #ea8711, #d96363, #73a6df, #9085fb, #52ca79); font: 90px sans-serif; letter-spacing:2px;');
	}
};
