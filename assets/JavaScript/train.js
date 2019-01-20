var config = {
    apiKey: "AIzaSyBKTAq52HgRsW4J01nEv8rxRilSgDD3RXE",
    authDomain: "trainschedulerhw0119.firebaseapp.com",
    databaseURL: "https://trainschedulerhw0119.firebaseio.com",
    projectId: "trainschedulerhw0119",
    storageBucket: "trainschedulerhw0119.appspot.com",
    messagingSenderId: "138117412519"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

$("#submitInfo").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
        "Train": trainName,
        "Destination": destination,
        "FirstTrain": firstTrain,
        "Frequency": frequency
    });

    $("#trainName").val("")
    $("#destination").val("")
    $("#firstTrain").val("")
    $("#frequency").val("")
})

database.ref().on("child_added", function(childSnapshot) {
    // log the snapshot
    console.log(childSnapshot.val().Train);
    console.log(childSnapshot.val().Destination);
    console.log(childSnapshot.val().FirstTrain);
    console.log(childSnapshot.val().Frequency);

    // update variables from the snapshot
    trainName = childSnapshot.val().Train;
    destination = childSnapshot.val().Destination;
    firstTrain = childSnapshot.val().FirstTrain;
    frequency = childSnapshot.val().Frequency;

    // moment
    // frequency
    var tFrequency = frequency;
    // first train
    var tfirstTrain = firstTrain;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(tfirstTrain, "HH:mm").subtract(1, "years");
    // current time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // time apart
    var tRemainder = diffTime % tFrequency;
    // Minutes until train
    var tMinutesUntilTrain = tFrequency - tRemainder;
    console.log(tMinutesUntilTrain)
    // Next train
    var nextTrain = moment().add(tMinutesUntilTrain, "minutes");
    var nextTrainTime = moment(nextTrain).format("hh:mm A")


    var newTrain = $("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrainTime + "</td><td>" + tMinutesUntilTrain + "</td></tr>")
    $("tbody").append(newTrain)
})

