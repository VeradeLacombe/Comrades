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
	
	if (Circle.getCurrent().type == "OpenCircle") {
		$("#backButton").click(function() {
			window.location.href = "openCircle.html";
		});
	}
	else {
		$("#backButton").click(function() {
			window.location.href = "closeCircle.html";
		});
	}
});