function UpdateCircleList() {
	// Get and clear the circle container
	var circleContainer = document.getElementById("gridMain");
	circleContainer.innerHTML = '';
	
	// Retrieve the close circle list from localStorage
	if (localStorage.CloseCircles != undefined) {
		var list = JSON.parse(localStorage.CloseCircles);
		
		for (var serializedCircle of list) {
			circleContainer.appendChild(Circle.unserialize(serializedCircle).createListItem());
		}
	}
}

$(document).ready(function() {
	UpdateCircleList();
});