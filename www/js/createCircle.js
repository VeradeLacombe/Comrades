$(document).ready(function() {
	
});

function radioClick() {
	if ($("#openButton").is(":checked")) {
		$("#explainCloseorOpen").html("I want to meet new people and form a new community");
	}
	if ($("#closeButton").is(":checked")) {
		$("#explainCloseorOpen").html("I want talk to my friends or my family!");
	}
	
	if ($("#connectButton").is(":checked")) {
		$("#explainConnectorChitchat").html("I want to answer statements about serious topics to connect on a deeper level");
	}
	if ($("#chitchatButton").is(":checked")) {
		$("#explainConnectorChitchat").html("I want to answer lighthearted statements to connect in a fun way");
	}
	
	if ($("#audioButton").is(":checked")) {
		$("#explainCommunicationstyle").html("I want to connect via ONLY audiocalling");
	}
	if ($("#textmessagesButton").is(":checked")) {
		$("#explainCommunicationstyle").html("I want to connect via ONLY text messaging");
	}
	if ($("#videoButton").is(":checked")) {
		$("#explainCommunicationstyle").html("I want to connect via videocalling");
	}
}