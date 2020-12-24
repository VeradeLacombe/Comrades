function radioClick() {
	updateRadioButton("#openButton", "#explainCloseorOpen", "I want to meet new people and form a new community");
	
	updateRadioButton("#closeButton", "#explainCloseorOpen", "I want talk to my friends or my family!");
	
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
	var openOrClose = getRadioInput("open or close");
	var connectOrChitchat = getRadioInput("connect or chitchat");
	var audioTextOrVideo = getRadioInput("audio, text or video");
	
	if (openOrClose != undefined && connectOrChitchat != undefined && audioTextOrVideo != undefined) {
		console.log({openOrClose, connectOrChitchat, audioTextOrVideo});
	}
}

function getRadioInput(radioName) {
	var value = $('input[name = "' + radioName + '"]:checked').val();
	if (value == undefined) {
		$('input[name = "' + radioName + '"]').parent().parent().find("label").css("border-style", "solid");
	}
	return value;
}