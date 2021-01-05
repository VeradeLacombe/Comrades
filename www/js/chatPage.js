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
});