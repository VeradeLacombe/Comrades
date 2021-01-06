function updatePage() {
	
}

function sendMessage() {
	var textInput = $("#textInput");
	var text = textInput.val();
	textInput.val("");
	
	var message = new Message(text);
	var circle = Circle.getCurrent();
	circle.messages.push(message);
	circle.updateLocalStorage();
	circle.setCurrent();
	updatePage();
}

$(document).ready(function() {
	updatePage();
	
	var currentCircle = Circle.getCurrent();
	
	if (currentCircle.type == "OpenCircle") {
		$("#backButton").click(function() {
			window.location.href = "openCircle.html";
		});
	}
	else {
		$("#backButton").click(function() {
			window.location.href = "closeCircle.html";
		});
	}
	
	$("#title").html(currentCircle.name);
	$("circlePhoto").attr("src", currentCircle.photo);
});