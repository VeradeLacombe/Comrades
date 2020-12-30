class Circle { 

	constructor(name, memberCount, mode) {
		this.type = this.constructor.name;
		this.name = name;
		this.memberCount = memberCount;
		this.photo = "img/Avatar.png";
		this.mode = mode;
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
				circle.startTime = data.startTime;
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
		memberCountContainer.innerHTML = this.memberCount;
		item.appendChild(memberCountContainer);
		
		// Create name element
		var nameContainer = document.createElement("div");
		nameContainer.className = "circleName";
		nameContainer.innerHTML = this.name;
		item.appendChild(nameContainer);
		
		
		return item;
	}
}

class OpenCircle extends Circle {
	
	constructor(name, memberCount, mode) {
		super(name, memberCount, mode);
		this.startTime = new Date();		
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