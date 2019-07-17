// My web app's Firebase configuration
var config = {
  apiKey: "AIzaSyBAdTCr2ttd3Q8Iz-2xg32KFR0VSkNqt0c",
    authDomain: "train-scheduler-b385b.firebaseapp.com",
    databaseURL: "https://train-scheduler-b385b.firebaseio.com",
    projectId: "train-scheduler-b385b",
    storageBucket: "",
    messagingSenderId: "4007830993",
    appId: "1:4007830993:web:00a62c68cc02da79"
};

firebase.initializeApp(config);

var database = firebase.database();

// Capture Button Click
$("#add-train").on("click", function(event) {
  // Don't refresh the page!
  event.preventDefault();

// This grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var nextTrain = $("#next-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

// Code for the push
database.ref("/trains").push({
  name: trainName,
  destination: destination,
  time: nextTrain,
  frequency: frequency
});

// This clears all of the text boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#next-train-input").val("");
$("#frequency-input").val("");

});

database.ref("/trains").on("child_added", function(childSnapshot) {

// Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name); 
  console.log(childSnapshot.val().destination);  
  console.log(childSnapshot.val().time);  
  console.log(childSnapshot.val().frequency);   

$("#new-train").append("<tr><td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>" +
"<td>" + childSnapshot.val().frequency + "</td>" + "<td>" + childSnapshot.val().time + "</td></tr>");

// Handle the errors  
}, function(err) {
  console.log("Error: " + err.code);
});


