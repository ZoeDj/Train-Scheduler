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
  event.preventDefault();

// This grabs values from user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = parseInt($("#frequency-input").val().trim());

// Code for the push
database.ref("/trains").push({
  name: trainName,
  destination: destination,
  time: firstTrain,
  frequency: frequency
});

// This clears all of the text boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#next-train-input").val("");
$("#frequency-input").val("");

});

// Checks for changes in Firebase and loades data from Firebase 
database.ref("/trains").on("child_added", function(childSnapshot) {

// Convinient variables for storing the values from the Firebase
  var newName = childSnapshot.val().name;
  var newDestination = childSnapshot.val().destination;
  var newTime = childSnapshot.val().time;
  var newFrequency = childSnapshot.val().frequency;

// Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name); 
  console.log(childSnapshot.val().destination);  
  console.log(childSnapshot.val().time);  
  console.log(childSnapshot.val().frequency);   

// Converts the train time
  var firstTrainTimeConverted = moment(newTime, "HH:mm").subtract(1, "years");;
  var currentTime = moment();
  
// Difference between the first train and now
  var timeDifference = moment().diff(moment(firstTrainTimeConverted), "minutes");

// Time apart (remainder)
  var remainder = timeDifference % newFrequency;

// Minute Until Train
  var minutesLeft = newFrequency - remainder;

// Next Train
  var nextTrain = moment().add(minutesLeft, "minutes").format("HH:mm");

$("#new-train").append("<tr><td>" + 
newName + "</td>" + "<td>" + 
newDestination + "</td>" + "<td>" + 
newFrequency + "</td>" + "<td>" + 
newTime + "</td>" + "<td>" + 
minutesLeft + "</td>" + "</tr>");

// Handle the errors  
}, function(err) {
  console.log("Error: " + err.code);
});


