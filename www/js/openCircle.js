function UpdateCircleList() {
	// Get and clear the circle container
	var circleContainer = document.getElementById("gridMain");
	circleContainer.innerHTML = '';
	
	// Retrieve the close circle list from localStorage
	if (localStorage.OpenCircles != undefined) {
		var list = JSON.parse(localStorage.OpenCircles);
		
		for (var serializedCircle of list) {
			circleContainer.appendChild(Circle.unserialize(serializedCircle).createListItem());
		}
	}
}

$(document).ready(function() {
	UpdateCircleList();
});

function plusButtonPress() {
	var container = document.getElementById("gridContainer_AddButtonPopUp");
	if (container.style.gridTemplateRows === "8vh auto 90px 12vh") {
		container.style.gridTemplateRows = "8vh auto 0vh 12vh";
	} else {
		container.style.gridTemplateRows = "8vh auto 90px 12vh";
	}
}

