//counter
var count = 0;

// information needed to connect to firebase database 
var config = {
    apiKey: "AIzaSyD9UxykL2Aix6XolHwDuswjUQWoDGyXj4Y",
    authDomain: "train-schedule-wk7-11d97.firebaseapp.com",
    databaseURL: "https://train-schedule-wk7-11d97.firebaseio.com",
    projectId: "train-schedule-wk7-11d97",
    storageBucket: "train-schedule-wk7-11d97.appspot.com",
    messagingSenderId: "16070555178"
  };
  firebase.initializeApp(config);

var database = firebase.database();


//form on click function
//preventDefault prevent page from reloading 
$("#add-employee-btn").on("click", function () {
    event.preventDefault();

//takes values from input boxes and trims them 
    name = $("#employee-name-input").val().trim();
    destination = $("#role-input").val().trim();
    arrivalTime = $("#start-input").val().trim();
    frequency = $("#rate-input").val().trim();

    //set count to 0
    count = 0;

    console.log(name);
    console.log(destination);
    console.log(arrivalTime);
    console.log(frequency);

    //pushes information in firebase with correct variables 
    database.ref().push({
        name: name,
        destination: destination,
       arrivalTime: arrivalTime,
       frequency: frequency,
       
    });

    //alerts the user they successfully added a train schedule 
    alert("New Train is on the way!");
    
//empties  the inut box value 
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});


//
database.ref().on("child_added", function (document){
   //sets counter equal to 1 
    count += 1;

    console.log(document.key);
    console.log(document.val());

    var name = document.val().name;
    var destination = document.val().destination;
    var arrivalTime = document.val().arrivalTime;
    var frequency = document.val().frequency;
    var trainArrivalMinutes;
    var trainArrivalTime;
    var timeArray = arrivalTime.split(":");
    var now = moment();

    console.log(arrivalTime);

    // var time = moment(arrivalTime, "HH:MM").subtract(1, "years");
    var time = moment().hours(timeArray[0]).minutes(timeArray[1]);



    //your problems is right below 
    var difference =  now.diff(time, "minutes");
    var total = difference % frequency;
    trainArrivalMinutes =  frequency - total;

    console.log(difference);
    console.log(total);
     console.log(time);
     
     


var nextTrain = moment().add(trainArrivalMinutes, "minutes");
trainArrivalTime = moment(nextTrain).format("HH:MM");

var a = "<a href=# onclick=deleteDocument('" + document.key + "');>Delete</a>";

//appends new train information into table 
$("#employee-table").append(
    $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain.format("hh:mm")),
        $("<td>").text(trainArrivalMinutes),
        $("<td>").html(a)
    ));

console.log("Record:" + count);

});

//allows the user to delete train schedule information from both viewer and database 
function deleteDocument(documentId) {
    database.ref().child(documentId).set(null);
    alert("Train successfully deleted!");
    location.reload();
}
