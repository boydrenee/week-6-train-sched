// Initialize Firebase
var config = {
	apiKey: "AIzaSyBvghtYo6jb0asRJibiAXcH08yNDKlGjVM",
	authDomain: "trainsched-c3e7e.firebaseapp.com",
	databaseURL: "https://trainsched-c3e7e.firebaseio.com",
	projectId: "trainsched-c3e7e",
	storageBucket: "trainsched-c3e7e.appspot.com",
	messagingSenderId: "892821452664"
  };
  firebase.initializeApp(config);




// Assign the reference to the database to a variable named 'database'
//var database = ...
var database = firebase.database(); 




$("#addTrain").on("click",function(event){
	event.preventDefault();
//Get all inputs
	var tName = $("#trainNameInput").val().trim();
	var tDestination = $("#destinationInput").val().trim();
	var tStartTime = $("#trainStartTimeInput").val().trim();
	var tFrequency = $("#trainFrequencyInput").val().trim();
	//Creatre objects and push them to database

	firebase.database().ref().push({
		tName:tName,
		tDestination:tDestination,
		tStartTime:parseInt(tStartTime),
		tFrequency:parseInt(tFrequency),
		dateAdded:firebase.database.ServerValue.TIMESTAMP
	})
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#trainStartTimeInput").val("");
	$("#trainFrequencyInput").val("");

})

//clear input fields
/*	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#trainStartTimeInput").val("");
	$("#trainFrequencyInput").val("");
*/

//create a function for the calc
var tNextTime = 0;
var tMinAway = 0;

/* I commented out the function and the function call.
   I could not get the function to work.  Part of the problem
   is pulling the data that is not using the data stored in the 
   DB but not used anywhere else; frequency for example.  Another 
   problem (I think) is the scope of my variables.
*/

/*function calcTime() {
	var firstTwoStartTime = tStartTime.substr(0, 2);
	var lastTwoStartTime = tStartTime.substr(2,2);
	var startTimeHours = parseInt(firstTwoStartTime);
	var startTimeMin = parseInt(lastTwoStartTime);
	var now = new Date();
	var tMinAway = 0;
	var nowHour = now.getHours();
	var nowMin = now.getMinutes();
	startMin = (startTimeHours * 60) + startTimeMin;
	currentMin = (nowHour * 60) + nowMin;
	newMin = currentMin - startMin;
	remainderMin = newMin % tFrequency;
	tMinAway = tFrequency - remainderMin;
	var totMin = (nowMin + tMinAway);
	tNextTime = (nowHour.toString() + ":" + totMin.toString());
}*/

firebase.database().ref().orderByChild("dateAdded").limitToLast(6).on("child_added",function(snapshot){
	console.log(snapshot.val());
	var data = snapshot.val();
	var row  = $("<tr>");
	var cell  = $("<td>");
	cell.text(data.tName);
	row.append(cell)
	var cell  = $("<td>");
	cell.text(data.tDestination);
	row.append(cell)
	var cell  = $("<td>");
	cell.text(data.tFrequency);
	row.append(cell)
	// calcTime();
	var cell  = $("<td>");
	cell.text(tNextTime);
	row.append(cell)
	var cell = $("<td>");
	cell.text(tMinAway);
	row.append(cell)
	$(".traintable > tbody").append(row)
})