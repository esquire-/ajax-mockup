/*
This is buggy. It should remove the error when the form is updated again. It should have a rate limit. It should not request empty strings.
*/

/*
document.getElementById("searchForm").onkeyup = function() {
	var value = document.getElementById("searchForm").value;
	//console.log(value);
	var response;
	var request = new XMLHttpRequest();
	//Need a URL encode
	request.open("GET", "/lookup/"+value, true);
	request.onreadystatechange = function() {
		var done = 4; ok = 200;
		if(request.readyState == done && request.status == ok) {
			response = JSON.parse(request.responseText);
			var b = response.taken;
			//console.log(b);
			if(b) {
				//console.log('updating error');
				document.getElementById("formAlert").innerHTML = "That username is taken.";
			}
		}
	}
	request.send(null);
}
*/

/*
This is better
*/

var alertId = "formAlert";
var searchId = "searchForm";
var notice = "<strong>Sorry</strong>, that username is already in use. Please try another one.";

var username = "";
var lastKeypress = 0;

var timer = 0;

function requestUsernameCheck(username) {
	var response;
	var request = new XMLHttpRequest();
	var location = "/lookup/" + encodeURIComponent(username);
	request.open("GET", location);
	request.onreadystatechange = function() {
		var done = 4, ok = 200;
		if(request.readyState == done && request.status == ok) {
			response = JSON.parse(request.responseText);
			checkResponse(response);
		}
	}
	request.send();
}

function checkResponse(response) {
	if(response.taken) {
		updateError(null);
	}
}

function updateError(text) {
	if(text == null) {
		document.getElementById(alertId).innerHTML = notice;
	} else {
		document.getElementById(alertId).innerHTML = text;
	}
	showError();
}

function hideError() {
	document.getElementById(alertId).style.visibility = 'hidden';
}

function showError() {
	document.getElementById(alertId).style.visibility = 'visible';
}

function usernameUpdate() {
	var un = document.getElementById(searchId).value;
	if(un == "") {
		return;
	}

	if(un != username) {
		username = un;
		requestUsernameCheck(un);
	}
}

function keypress() {
	hideError();
	if(timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(usernameUpdate, 1500);
}

document.getElementById(searchId).onkeyup = keypress;

