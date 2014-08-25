var docHeight = $(document).height();
var docWidth = $(document).width();
var rightBoxWidth = $('#right-box').width();
var leftBoxWidth = $('#left-box').width();
var cellHeight = 12;
var cellWidth = 12;
var tdId = 0;

var addCells = function(boxWidth, boxId) {
	var table = '';
	for (var i = 0; i < docHeight / cellHeight; i++) {
		table += '<tr class="' + i + '">';
		for (var j = 0; j < boxWidth / cellWidth; j++) {
			tdId++;
			if (Math.random() < 0.5) {
				table += '<td id="' + tdId + '" class="on"></td>';
			}
			else if (Math.random() < 0.99) {
				table += '<td id="' + tdId + '" class="off"></td>';
			}
			else {
				table += '<td id="' + tdId + '" class="high"></td>';
			}
		}
		table += '</tr>';
	}
	$(boxId).append(table);
};

var setOff = function() {
	var id = Math.floor(Math.random() * tdId) + 1;
	$('#' + id).removeClass('on off high');
	$('#' + id).addClass('on');
};

var setOn = function() {
	var id = Math.floor(Math.random() * tdId) + 1;
	$('#' + id).removeClass('on off high');
	$('#' + id).addClass('off');
};

var setHigh = function() {
	var id = Math.floor(Math.random() * tdId) + 1;
	$('#' + id).removeClass('on off high');
	$('#' + id).addClass('high');
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
	$('#mail').mouseenter(function() {
		$('.high').addClass('mail-high');		
	});
	$('#mail').mouseleave(function() {
		$('.mail-high').removeClass('mail-high');
	});

	$('#github').mouseenter(function() {
		$('.high').addClass('github-high');		
	});
	$('#github').mouseleave(function() {
		$('.github-high').removeClass('github-high');
	});
	
	$('#stack').mouseenter(function() {
		$('.high').addClass('stack-high');		
	});
	$('#stack').mouseleave(function() {
		$('.stack-high').removeClass('stack-high');
	});
	
	$('#android').mouseenter(function() {
		$('.high').addClass('android-high');		
	});
	$('#android').mouseleave(function() {
		$('.android-high').removeClass('android-high');
	});

	$('#linkedin').mouseenter(function() {
		$('.high').addClass('linkedin-high');		
	});
	$('#linkedin').mouseleave(function() {
		$('.linkedin-high').removeClass('linkedin-high');
	});
});

$(document).ready(function() {
	if (docWidth > 1000) {
		addCells(leftBoxWidth, '#left-box');
		addCells(rightBoxWidth, '#right-box');
	}
});


//todo:
//mobile version
//handle resizing
//noscript version (images?)