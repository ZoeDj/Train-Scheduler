// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQq8UjuDhmVGSqYzydlyfmUq8dr5gnAIU",
  authDomain: "train-schedule-f011c.firebaseapp.com",
  //databaseURL: "https://train-schedule-f011c.firebaseio.com",
  databaseURL: "https://train-schedule-f011c-default-rtdb.firebaseio.com",
  projectId: "train-schedule-f011c",
  storageBucket: "train-schedule-f011c.firebasestorage.app",
  messagingSenderId: "318206099540",
  appId: "1:318206099540:web:714e173e9833ccbcf36dc1",
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Capture Button Click
$("#add-train").on("click", function (event) {
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
    frequency: frequency,
  });

  // This clears all of the text boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#next-train-input").val("");
  $("#frequency-input").val("");
});

// Checks for changes in Firebase and loads data from Firebase
database.ref("/trains").on(
  "child_added",
  function (childSnapshot) {
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
    var firstTrainTimeConverted = moment(newTime, "HH:mm").subtract(1, "years");

    var currentTime = moment();

    // Difference between the first train and now
    var timeDifference = moment().diff(
      moment(firstTrainTimeConverted),
      "minutes"
    );

    // Time apart (remainder)
    var remainder = timeDifference % newFrequency;

    // Minute Until Train
    var minutesLeft = newFrequency - remainder;

    // Next Train
    var nextTrain = moment().add(minutesLeft, "minutes").format("HH:mm");

    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#new-train").append(
      "<tr><td>" +
        newName +
        "</td>" +
        "<td>" +
        newDestination +
        "</td>" +
        "<td>" +
        newFrequency +
        "</td>" +
        "<td>" +
        nextTrain +
        "</td>" +
        "<td>" +
        minutesLeft +
        "</td>" +
        "</tr>"
    );

    // Handle the errors
  },
  function (err) {
    console.log("Error: " + err.code);
  }
);
