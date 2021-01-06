class Message {
	
	constructor(message, sender) {
		this.sender = sender;
		this.message = message;
	}
	
	createMessageItem() {
		
		var div1 = document.createElement("div");
		
		var div2 = document.createElement("div");
		div1.appendChild(div2);
		
		if (sender == undefined) {
			// Sent you
			div1.className = "textBubleYouContainer";
			div2.className = "textBubleYou";
			div2.innerHTML = this.message;
			
		}
		else {
			// Sent by other user
			div2.className = "textBuble";
			
			var div3 = document.createElement("div");
			div2.appendChild(div3);
			div3.className = "senderName";
			div3.innerHTML = this.sender;
			
			var div4 = document.createElement("div");
			div2.appendChild(div4);
			div4.className = "message";
			div4.innerHTML = this.message;
		}
		
		return div1;
	}
}

class Circle { 

	constructor(name, memberCount, mode) {
		this.type = this.constructor.name;
		this.name = name;
		this.memberCount = memberCount;
		this.photo = "img/Avatar.png";
		this.mode = mode;
		this.startTime = new Date();
		this.messages = [];
		this.time = 24;
	}
	
	addToLocalStorage(storageName) {
		// If the localStorage list does not exist yet
		if (localStorage.getItem(storageName) == undefined) {
			// Create the localStorage list, containing this circle
			localStorage.setItem(storageName, JSON.stringify([JSON.stringify(this)]));
		}
		else {
			// Retrieve the localStorage list
			var list = JSON.parse(localStorage.getItem(storageName));
			
			// Add this circle to the list
			list.push(JSON.stringify(this));
			
			// Update the localStorage
			localStorage.setItem(storageName, JSON.stringify(list));
		}
	}
	
	updateLocalStorage() {
		if (this.type == "OpenCircle") {
			this.deleteFromLocalStorage("OpenCircles");
			this.addToLocalStorage("OpenCircles");
		}
		else if (this.type == "CloseCircle") {
			this.deleteFromLocalStorage("CloseCircles");
			this.addToLocalStorage("CloseCircles");
		}
	}
	
	deleteFromLocalStorage(storageName) {
		// If the localStorage list does not exist
		if (localStorage.getItem(storageName) == undefined) {
			// The circle is not in the list, so we don't need to delete it
		}
		else {
			// Retrieve the localStorage list
			var list = JSON.parse(localStorage.getItem(storageName));
			
			// For each circle in the list
			for (var i = 0; i < list.length; i++) {
				// Get that circle
				var otherCircle = Circle.unserialize(list[i]);
				
				// If that circle is equal to this circle
				if (this.equals(otherCircle)) {
					// Then delete the circle from the list
					list.splice(i, 1);
					i--;
				}
			}
			
			// Update the localStorage
			localStorage.setItem(storageName, JSON.stringify(list));
		}
	}
	
	equals(other) {
		console.log(this.startTime);
		console.log(other.startTime);
		return this.startTime == other.startTime;
	}
	
	static getCurrent() {
		return Circle.unserialize(localStorage.currentCircle);;
	}
	
	setCurrent() {
		localStorage.currentCircle = JSON.stringify(this);
	}
	
	// Transform the string back into a Circle object
	static unserialize(data) {
		data = JSON.parse(data);
		var circle;
		
		switch(data.type) {
			case "Circle":
				circle = new Circle;
				break;
			case "OpenCircle":
				circle = new OpenCircle;
				break;
			case "CloseCircle":
				circle = new CloseCircle;
				circle.roomCode = data.roomCode;
				break;
		}
		
		circle.type = data.type;
		circle.name = data.name;
		circle.memberCount = data.memberCount;
		circle.photo = data.photo;
		circle.mode = data.mode;
		circle.startTime = data.startTime;
		circle.messages = data.messages;
		return circle;
	}
	
	createListItem() {
		// Create item element
		var item = document.createElement("div");
		item.className = "newCircle";
		
		// Create image element
		var imageContainer = document.createElement("img");
		imageContainer.className = "circlePhoto";
		imageContainer.src = this.photo;
		item.appendChild(imageContainer);
		
		// Create member count element
		var memberCountContainer = document.createElement("p");
		memberCountContainer.className = "memberCount";
		memberCountContainer.innerHTML = this.memberCount + "/10";
		item.appendChild(memberCountContainer);
		
		// Create name element
		var nameContainer = document.createElement("div");
		nameContainer.className = "circleName";
		nameContainer.innerHTML = this.name;
		item.appendChild(nameContainer);
		
		// Make item clickable
		item.circle = this;
		item.onclick = function() {
			this.circle.setCurrent();
			window.location.href = 'chatPage.html';
		}
		
		return item;
	}
}

class OpenCircle extends Circle {
	
	constructor(name, memberCount, mode) {
		super(name, memberCount, mode);	
	}
	
	createListItem() {
		var item = super.createListItem();
		
		// Create roomcode element
		var timeContainer = document.createElement("p");
		timeContainer.className = "code";
		timeContainer.innerHTML = this.time + "h left";
		item.appendChild(timeContainer);
		
		return item;
	}
}

class CloseCircle extends Circle {
	
	constructor(name, memberCount, mode) {
		super(name, memberCount, mode);
		this.roomCode = Math.random().toString(36).substring(2,7);	
	}
	
	createListItem() {
		var item = super.createListItem();
		
		// Create roomcode element
		var roomCodeContainer = document.createElement("p");
		roomCodeContainer.className = "code";
		roomCodeContainer.innerHTML = this.roomCode;
		item.appendChild(roomCodeContainer);
		
		return item;
	}
}