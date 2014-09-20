var docHeight = $(document).height();
var docWidth = $(document).width();
var rightBoxWidth = $('#right-box').width();
var leftBoxWidth = $('#left-box').width();
var cellHeight = 12;
var cellWidth = 12;
var tdId = 0;

var addCells = function(boxWidth, boxId) {
	var table = '<table>';
	for (var i = 0; i < docHeight / cellHeight; i++) {
		table += '<tr class="' + 'row-' + i + '">';
		for (var j = 0; j < boxWidth / cellWidth; j++) {
			tdId++;
			if (Math.random() < 0.5) {
				table += '<td id="cell-' + tdId + '" class="on"></td>';
			}
			else if (Math.random() < 0.99) {
				table += '<td id="cell-' + tdId + '" class="off"></td>';
			}
			else {
				table += '<td id="cell-' + tdId + '" class="high"></td>';
			}
		}
		table += '</tr>';
	}
	table += '</table>';
	$(boxId).append(table);
};

var setOff = function() {
	var id = Math.floor(Math.random() * tdId) + 1;
	$('#cell-' + id).removeClass('on off high');
	$('#cell-' + id).addClass('on');
};

var setOn = function() {
	var id = Math.floor(Math.random() * tdId) + 1;
	$('#cell-' + id).removeClass('on off high');
	$('#cell-' + id).addClass('off');
};

var setHigh = function() {
	var id = Math.floor(Math.random() * tdId) + 1;
	$('#cell-' + id).removeClass('on off high');
	$('#cell-' + id).addClass('high');
};

var transitions = function() {
	setOff();
	setHigh();
	setOn();
};

for (var i = 0; i < 300; i++) {
	window.setTimeout(transitions, (i * 1000));
}

$(function() {
	$('#mail-span').mouseenter(function() {
		$('.high').addClass('mail-high');		
	});
	$('#mail-span').mouseleave(function() {
		$('.mail-high').removeClass('mail-high');
	});

	$('#github-span').mouseenter(function() {
		$('.high').addClass('github-high');		
	});
	$('#github-span').mouseleave(function() {
		$('.github-high').removeClass('github-high');
	});
	
	$('#stack-span').mouseenter(function() {
		$('.high').addClass('stack-high');		
	});
	$('#stack-span').mouseleave(function() {
		$('.stack-high').removeClass('stack-high');
	});
	
	$('#android-span').mouseenter(function() {
		$('.high').addClass('android-high');		
	});
	$('#android-span').mouseleave(function() {
		$('.android-high').removeClass('android-high');
	});

	$('#linkedin-span').mouseenter(function() {
		$('.high').addClass('linkedin-high');		
	});
	$('#linkedin-span').mouseleave(function() {
		$('.linkedin-high').removeClass('linkedin-high');
	});
});

$(document).ready(function() {
	if (docWidth > 1000) {
		addCells(leftBoxWidth, '#left-box');
		addCells(rightBoxWidth, '#right-box');
	}
	console.log('%cNo bugs here! :D ', 
		'-webkit-background-clip: text; color:white; -webkit-text-fill-color: transparent; -webkit-gradient(linear, left top, right top, from(#ea8711), to(#d96363)); background-image: -webkit-linear-gradient(left, #ea8711, #d96363, #73a6df, #9085fb, #52ca79); background-image: -moz-linear-gradient(left, #ea8711, #d96363, #73a6df, #9085fb, #52ca79); font: 90px sans-serif; letter-spacing:2px;');
});

//todo:
//mobile version
//handle resizing
//noscript version (images?)
//replace out images with font icons
