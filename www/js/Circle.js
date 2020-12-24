class Circle { 

	constructor(name, memberCount, photo, mode) {
		this.type = this.constructor.name;
		this.name = name;
		this.memberCount = memberCount;
		this.photo = photo;
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
}

class OpenCircle extends Circle {
	
	constructor(name, memberCount, photo, mode) {
		super(name, memberCount, photo, mode);
		this.startTime = new Date();		
	}
}

class CloseCircle extends Circle {
	
	constructor(name, memberCount, photo, mode) {
		super(name, memberCount, photo, mode);
		this.roomCode = Math.random().toString(36).substring(2,7);	
	}
}