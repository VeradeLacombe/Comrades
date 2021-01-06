function updatePage() {
	// Get and clear the message container
	var messageContainer = document.getElementById("gridMain");
	messageContainer.innerHTML = '';
	
	// Retrieve the message list from localStorage
	var currentCircle = Circle.getCurrent();
	for (var message of currentCircle.messages) {
		messageContainer.appendChild(message.createMessageItem());
	}
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
	circle.playScript(document.getElementById("gridMain"), true);
}

function LeftButtonClick() {
	Circle.getCurrent().playQuestion(document.getElementById("gridMain"));
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
	
	currentCircle.playScript(document.getElementById("gridMain"));
});