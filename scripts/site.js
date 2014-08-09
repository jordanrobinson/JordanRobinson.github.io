var docHeight = $(document).height();
var rightBoxWidth = $('#right-box').width();
var leftBoxWidth = $('#left-box').width();
var cellHeight = 14;
var cellWidth = 14;
var tdId = 0;

var addCells = function(boxWidth, boxId) {
	var table = '';
	for (var i = 0; i < docHeight / cellHeight; i++) {
		table += '<tr class="' + i + '">';
		console.log(i);
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

setInterval(function(){
	setOff();
	setHigh();
	setOn();
}, 1000);

$(document).ready(function() {
	addCells(leftBoxWidth, '#left-box');
	addCells(rightBoxWidth, '#right-box');
});
