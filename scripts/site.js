var docHeight = $(document).height();
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
			if (Math.random()<.5) {
				table += '<td id="' + tdId + '" class="on"></td>';
			}
			else {
				table += '<td id="' + tdId + '" class="off"></td>';
			}
		}
		table += '</tr>';
	}
	$(boxId).append(table);
}

var setOff = function() {
	var id = Math.floor(Math.random() * tdId) + 1;
	$('#' + id).removeClass('on off high');
	$('#' + id).addClass('on');
}

var setOn = function() {
	var id = Math.floor(Math.random() * tdId) + 1;
	$('#' + id).removeClass('on off high');
	$('#' + id).addClass('off');
}

var setHigh = function() {
	var id = Math.floor(Math.random() * tdId) + 1;
	$('#' + id).removeClass('on off high');
	$('#' + id).addClass('high');
}

var transitions = function() {
	setOff();
	setHigh();
	setOn();
}

for (var i = 0; i < 300; i++) {
	window.setTimeout(transitions, (i * 1000));
}

$(document).ready(function() {
	addCells(leftBoxWidth, '#left-box');
	addCells(rightBoxWidth, '#right-box');
});


//todo:
//mobile version
//handle resizing
//noscript version (images?)