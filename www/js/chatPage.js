var questionIsUnanswered = false;

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
	var textInput = document.getElementById("textInput");
	if (questionIsUnanswered && textInput.value != "") {
		var text = textInput.value;
		textInput.value = "";

		var message = new Message(text, undefined, undefined, 0);
		var circle = Circle.getCurrent();
		circle.messages.push(message);
		circle.updateLocalStorage();
		circle.setCurrent();
		updatePage();
		circle.playScript(document.getElementById("gridMain"), true);
		
		document.getElementById("LeftButton").innerHTML = '<i class="fas fa-question"></i>';
		
		questionIsUnanswered = false;
	}
	else {
		Circle.getCurrent().playQuestion(document.getElementById("gridMain"));
		questionIsUnanswered = true;
	}
}

function Typing() {
	var textInput = document.getElementById("textInput");
	if (questionIsUnanswered && textInput.value != "") {
		document.getElementById("LeftButton").innerHTML = '<i class="fas fa-bullhorn"></i>';
	}
	else {
		document.getElementById("LeftButton").innerHTML = '<i class="fas fa-question"></i>';
	}
}

function MenuButton() {
	event.stopPropagation();
	document.getElementById("dropdown").classList.add("showDropdown");
}

function ScreenClick() {
	document.getElementById("dropdown").classList.remove("showDropdown");
}

function leaveCircleClick() {
	var circle = Circle.getCurrent();
	if (circle.type == "OpenCircle") {
		circle.deleteFromLocalStorage("OpenCircles");
		window.location.href = "openCircle.html";
	}
	else if (circle.type == "CloseCircle") {
		circle.deleteFromLocalStorage("CloseCircles");
		window.location.href = "closeCircle.html";
	}
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
	$("#circlePhoto").attr("src", currentCircle.photo);
	
	currentCircle.playScript(document.getElementById("gridMain"));
});