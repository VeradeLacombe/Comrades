class Message {
	
	constructor(message, sender, voteCount, isAQuestion, waitForYou) {
		this.sender = sender;
		this.message = message;
		this.voteCount = voteCount;
		this.isAQuestion = isAQuestion;
		this.waitForYou = waitForYou;
	}
	
	createMessageItem() {
		
		var div1 = document.createElement("div");
		
		var div2 = document.createElement("div");
		div1.appendChild(div2);
		
		if (this.isAQuestion) {
			// Question
			div1.className = "statementContainer";
			div2.className = "gameMode";
			div2.innerHTML = Circle.getCurrent().mode.charAt(0).toUpperCase() + Circle.getCurrent().mode.slice(1);
			
			var div3 = document.createElement("div");
			div3.className = "statement";
			div3.innerHTML = '"' + this.message + '"';
			div1.appendChild(div3);
		}
		else if (this.sender == undefined) {
			// Sent by you
			if (this.voteCount == undefined) {
				div2.className = "textBubleYou";
			}
			else {
				div2.className = "textBubleYouAnswer";
				
				var voteDiv = document.createElement("div");
				voteDiv.className = "voteCountYou";
				voteDiv.innerHTML = this.voteCount;
				div2.appendChild(voteDiv);
			}
				
			div1.className = "textBubleYouContainer";
			div2.innerHTML += this.message;
		}
		else {
			// Sent by other user
			if (this.voteCount == undefined) {
				div2.className = "textBuble";
			}
			else {
				div2.className = "textBubleAnswer";
				var voteDiv  = document.createElement("div");
				voteDiv.className = "voteCount";
				voteDiv.innerHTML = this.voteCount;
				div2.appendChild(voteDiv);
			}
			
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
	
	static unserialize(messages) {
		messages.forEach(function(message, index) {
			this[index] = new Message(message.message, message.sender, message.voteCount, message.isAQuestion, message.waitForYou);
		}, messages);
		
		return messages;
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
		// new Message(text, verzender/ question=undefined, votecount / undefined, isAQuestion = true/false, waitForYou=true/false)
		this.messageScript = [
			new Message("Hi everyone! How are you all doing?", "Just_Stanley"),
			new Message("Heyy I'm Emma. I'm fine. You?", "EmmaG"),
			new Message("Hii, shall we start a question?", "Lisadl_"),
			new Message("I'm Lisa by the way", "Lisadl_", undefined, undefined, true),
			new Message("Why do we dream?", undefined, undefined, true),
			new Message("I think because we process what happened during the day", "Lisadl_", 0),
			new Message("I don't dream much honestly", "Just_Stanley", 0, false, true),
			new Message("Dreams are trying to give us signs about how we truly feel", "EmmaG", 0, false, false),
			
		];
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
			list.unshift(JSON.stringify(this));
			
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
		circle.time = data.time;
		circle.messages = Message.unserialize(data.messages);
		circle.messageScript = Message.unserialize(data.messageScript);
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
	
	playScript(messageContainer, youSentMessage) {
		setTimeout(function(circle, messageContainer, youSentMessage) {
			if (circle.messageScript.length == 0
				|| circle.messageScript[0].isAQuestion
				|| (circle.messageScript[0].waitForYou && !youSentMessage)) {
				return;
			}
			var message = circle.messageScript.shift();
			circle.messages.push(message);
			circle.updateLocalStorage();
			circle.setCurrent();
			messageContainer.appendChild(message.createMessageItem());
			circle.playScript(messageContainer);
		}, 2000, this, messageContainer, youSentMessage);
	}
	
	playQuestion(messageContainer) {
		if (this.messageScript.length == 0 || !this.messageScript[0].isAQuestion) return;
		var message = this.messageScript.shift();
		this.messages.push(message);
		this.updateLocalStorage();
		this.setCurrent();
		messageContainer.appendChild(message.createMessageItem());
		this.playScript(messageContainer);
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