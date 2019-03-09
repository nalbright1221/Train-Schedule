var config = {
    apiKey: "AIzaSyD2SKqBaSGwXr20LRV4AYEqN7jpTjuFPsA",
    authDomain: "pib-122194-55a93.firebaseapp.com",
    databaseURL: "https://pib-122194-55a93.firebaseio.com",
    projectId: "pib-122194-55a93",
    storageBucket: "pib-122194-55a93.appspot.com",
    messagingSenderId: "635335084465"
};

firebase.initializeApp(config);

var database = firebase.database();



$("#userSubmit").on("click", function () {
    event.preventDefault();


    name = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#arrivalTime").val().trim();
    nextArrival = $("#frequency").val().trim();




    console.log(name);
    console.log(destination);
    console.log(frequency);
    console.log(nextArrival);

    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival
    });

    alert("New Train is on the way!");
});