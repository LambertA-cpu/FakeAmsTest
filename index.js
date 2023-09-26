// Import the functions you need from the SDKs you need
            // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
            // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
            // import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
            // import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries
        
            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2YuH3e3-zUUQj4ZKBRuLyU0sSF0GFBKA",
    authDomain: "campuspoints-e80de.firebaseapp.com",
    projectId: "campuspoints-e80de",
    storageBucket: "campuspoints-e80de.appspot.com",
    messagingSenderId: "10545011166",
    appId: "1:10545011166:web:cb7294a71671f19e25e54f",
    measurementId: "G-WW9HHC6SYT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();



            // Set up our register function
            function register() {
            // Get all our input fields
            email = document.getElementById('email').value
            password = document.getElementById('password').value
            full_name = document.getElementById('full_name').value
            student_Id = document.getElementById('student_Id').value
            phone = document.getElementById("phone").value  

            // Validate input fields
            if (validate_email(email) == false || validate_password(password) == false) {
                alert('Email or Password is Incorrect!!')
                return
            // Don't continue running the code
            }
            if (validate_field(full_name) == false || validate_field(student_Id) == false || validate_field(phone) == false || validate_field(grades) == false) {
                alert('One or More Extra Fields is Outta Line!!')
                return
            }

            // Move on with Auth
            auth.createUserWithEmailAndPassword(email, password)
            .then(function() {
                // Declare user variable
                var user = auth.currentUser

                // Add this user to Firebase Database
                var database_ref = database.ref()

                // Create User data
                var user_data = {
                email : email,
                full_name : full_name,
                student_Id : student_Id,
                phone : phone,
                last_login : Date.now()
                }

                    // Push to Firebase Database
                database_ref.child('users/' +'student_Id'+ user.uid).set(user_data)

                // DOne
                alert('User Created!!')
                window.location.href = "StudentData.html";
                })
                .catch(function(error) {
                // Firebase will use this to alert of its errors
                var error_code = error.code
                var error_message = error.message

                alert(error_message)
                })
            }

            // Set up our login function
            function login() {
            // Get all our input fields
            email = document.getElementById('email').value
            password = document.getElementById('password').value

            // Validate input fields
            if (validate_email(email) == false || validate_password(password) == false) {
                alert('Email or Password is Incorrect!!')
                return
                // Don't continue running the code
            }

            auth.signInWithEmailAndPassword(email, password)
            .then(function() {
                // Declare user variable
                var user = auth.currentUser

                // Add this user to Firebase Database
                var database_ref = database.ref()

                // Create User data
                var user_data = {
                last_login : Date.now()
                }

                // Push to Firebase Database
                database_ref.child('users/' + user.uid).update(user_data)

                // DOne
                alert('User Logged In!!')
                window.location.href = "StudentData.html";

                })
                .catch(function(error) {
                // Firebase will use this to alert of its errors
                var error_code = error.code
                var error_message = error.message

                alert(error_message)
                })
            }
                // Validate Functions
                function validate_email(email) {
                expression = /^[^@]+@\w+(\.\w+)+\w$/
                if (expression.test(email) == true) {
                    // Email is good
                    return true
                } else {
                    // Email is not good
                    return false
                }
                }

                function validate_password(password) {
                // Firebase only accepts lengths greater than 6
                if (password < 6) {
                    return false
                } else {
                    return true
                }
                }

                function validate_field(field) {
                if (field == null) {
                    return false
                }
                if (field.length <= 0) {
                    return false
                } else {
                    return true
                }
                }
                // Function to add data to Firebase
// Function to add data to Firebase

function addData(){
    Subject = document.getElementById('subject').value
    Marks = document.getElementById('marks').value
    Grades = document.getElementById('grades').value
    Attendance = document.getElementById('attendance').value
    // Get all rows of the table (excluding the header row)
    const tableRows = document.querySelectorAll('table tr:not(:first-child)');
    const data = [];

    // Loop through each row
    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td input'); // Get all input fields in the row
        const rowData = {
            subject: cells[0].value,
            marks: parseInt(cells[1].value),
            grades: cells[2].value,
            attendance: parseFloat(cells[3].value),
        };
        data.push(rowData);
    });

    const user = firebase.auth().currentUser;

    if (user) {
        // Assuming you have a specific path for each user's data
        const userPath = 'users/' + user.uid + '/student_data';

        // Push the data to Firebase under the user's path
        const database_ref = firebase.database().ref(); // Assuming you've already initialized Firebase
        database_ref.child(userPath).push(data);

        // Reset input fields after data is added
        tableRows.forEach(row => {
            const cells = row.querySelectorAll('td input');
            cells.forEach(cell => {
                cell.value = ''; // Clear input fields
            });
        });

        alert('Data Added to Firebase!');
    } else {
        alert('User is not authenticated. Please log in first.');
    }
}
