//-----------------------------------------------------------------------------------
// This code creates a user document in firestore,
// using the "uid" that came with the authenticated user.
//-----------------------------------------------------------------------------------
function createUser() {

    // if the current user logged in user
    // is authenticated, then grab "uid" "displayName" and "email"
    // use "set()" with merge (if document did not exist it will be created)
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).set({
            "name": user.displayName,
            "email": user.email,
        }, {
            merge: true
        });
    });
}


//-----------------------------------------------------------------------------------
// This code listens for the submit button on form, grabs the text that user typed
// then writes this value (converted to int first) into firestore
// as a new document in the assignments collection.
//-----------------------------------------------------------------------------------
function setFormListener(form) {
    document.getElementById("myform").addEventListener("submit", function (e) {
        e.preventDefault();
        var q0 = document.getElementById("q0").value;
        var q1 = document.getElementById("q1").value;
        var q2 = document.getElementById("q2").value;
        var q3 = document.getElementById("q3").value;

        processForm(q0, q1, q2, q3);
    })
}

function processForm(q0, q1, q2, q3) {
    console.log("inside processAndSaveAnswers..." + q0 + q1 + q2 + q3);
    firebase.auth().onAuthStateChanged(function (user) {
        //write the answers, then generate recommendations
        console.log (user.uid);
        db.collection("users").doc(user.uid).set({
                answers: [q0, q1, q2, q3]
            }, {
                merge: true
            })
            .then(function () {
                getAndSaveRecommendation(q0, q1, q2, q3);
            })
    });
}

//-------------------------------------------------------------------------
//
// This function generates results based on a very simple alogorithm
// based on the results from 3 questions.
//
// Q1:  “What is your major?”
// Choices:  a)  Business;  b)Sciences;  c)Nursing; d) Others;
//
// Q2:  “What type of school work will you mainly be using the device for?”
// Choices:  a) mostly coding; b)  mostly word or excel;  c)mostly browser based applications;
//
// Q3:  "How frequently will you bring this device to school?"
// Choices:   a) once a week;  b) 2-3 times a week;   c)daily;
//
// Q4: "Will you be using the device more heavily for (hobbies outside of school work)?"
// Choices: a) Gaming; b) Video Editing; c) Photography; d) Others;
//
//
//-------------------------------------------------------------------------
function getAndSaveRecommendation(q0, q1, q2, q3) {

    // defaults

    var ram = "n/a"; //4, 8, 16 MB
    var drive = "n/a"; //32, 64, 128, 256 512 GB
    var cpu = "n/a"; //i3, i5, i7 core
    var type = "n/a"; // laptop, tablet
    var message = "n/a";

       // for the power coding student who codes
    if (q0.localeCompare("Sciences") == 0 &&
        q1.localeCompare("Mostly coding") == 0) {
        ram = "16GB";
        drive = "512GB";
        cpu = "i7";
        type = "laptop or desktop";
        message = "You need a powerful machine to ace your school, and keep up your hobbies"
    }
      // for people who are in business and uses excel
    else if (q0.localeCompare("Business") == 0 &&
        q1.localeCompare("Mostly word or excel") == 0){
        ram = "8GB";
        drive = "256GB";
        cpu = "i5";
        type = "laptop";
        message = "Have fun doing business."
    }
  else if (q3.localeCompare("Gaming") == 0){
        ram = "8GB";
        drive = "256GB";
        cpu = "i7";
        type = "desktop";
        message = "Have fun gaming."
    }
      // for people who are others and use mostly browser based applications & photoshop
    else if (q0.localeCompare("Others") == 0 &&
        q1.localeCompare("Mostly browser based applications") == 0 &&
        q3.localeCompare("Photography") == 0){
        ram = "16GB";
        drive = "512GB";
        cpu = "i5";
        type = "desktop";
        message = "Get a MAC, bro. Have fun with Photoshop!"
    }
      // for people who use browser based apps and video editing
    else if (q0.localeCompare("Others") == 0 &&
        q1.localeCompare("Mostly browser based applications") == 0 &&
        q3.localeCompare("Video Editing") == 0){
        ram = "16GB";
        drive = "512GB";
        cpu = "i5";
        type = "desktop";
        message = "Get a MAC, bro. Need something good for video editing."
    }
      // default choice
    else {

        ram = "8GB";
        drive = "128GB";
        cpu = "i3";
        type = "desktop";
        message = "You need just a basic computer on your desk."

    }

    // write the recommendations into the database for this user. 
    firebase.auth().onAuthStateChanged(function (user) {
        //console.log(user.uid);
        // write a new document of grade value
        db.collection("users").doc(user.uid).set({
            ram: ram,
            drive: drive,
            cpu: cpu,
            type: type,
            message: message
        }, {
            merge: true
        });
    });

}