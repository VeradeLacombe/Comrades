function radioClick() {
	if ($("#circleName").val() != "") {
		$("#circleName").parent().removeClass("missingValue");
	}
	
	updateRadioButton("#openButton", "#explainCloseorOpen", "I want to meet new people and form a new community");
	
	updateRadioButton("#closeButton", "#explainCloseorOpen", "I want talk to my friends or my family!");
	
	if ($("#closeButton").is(":checked")){ 
		$(".textInputContainer").show();
	}
	else { 
		$(".textInputContainer").hide();
	}
	
	updateRadioButton("#connectButton", "#explainConnectorChitchat", "I want to answer statements about serious topics<br>to connect on a deeper level");
	
	updateRadioButton("#chitchatButton", "#explainConnectorChitchat", "I want to answer lighthearted statements to connect in a fun way");
	
	updateRadioButton("#audioButton", "#explainCommunicationstyle", "I want to connect via text messaging and audiocalling");
	
	updateRadioButton("#textmessagesButton", "#explainCommunicationstyle", "I want to connect via text messaging");
	
	updateRadioButton("#videoButton", "#explainCommunicationstyle", "I want to connect via text messaging and videocalling");
}


function updateRadioButton(buttonID, infoDivID, infoText) {
	var button = $(buttonID);
	if (button.is(":checked")) {
		$(infoDivID).html(infoText);
		button.parent().parent().find("label").css("border-style", "none");
	}
}

function createCircle() {
	var name = $("#circleName").val();
	if (name == "") {
		animationBorder($("#circleName").parent());
	}
	var openOrClose = getRadioInput("open or close");
	var connectOrChitchat = getRadioInput("connect or chitchat");
	var audioTextOrVideo = getRadioInput("audio, text or video");
	
	if (openOrClose != undefined && connectOrChitchat != undefined && audioTextOrVideo != undefined && name != "" || openOrClose == "open") {
		if (openOrClose == "open"){
			var openCircle = new OpenCircle ("New open circle", Math.floor(Math.random()*9)+2, connectOrChitchat);
			openCircle.addToLocalStorage("OpenCircles");
			openCircle.setCurrent();
		}
		
		if (openOrClose == "close"){ 
			var closeCircle = new CloseCircle (name, 1, connectOrChitchat);
			closeCircle.addToLocalStorage("CloseCircles");
			closeCircle.setCurrent();
			window.location.href = 'chatPage.html';
		} 
	}
}

function getRadioInput(radioName) {
	var value = $('input[name = "' + radioName + '"]:checked').val();
	if (value == undefined) {
		var labels = $('input[name = "' + radioName + '"]').parent().parent().find("label");
		animationBorder(labels);
	}
	return value;
}

function animationBorder(element) {
	element.removeClass("missingValue");
	void element.width();
	element.addClass("missingValue");
	element.css("border-style", "solid");
	
}