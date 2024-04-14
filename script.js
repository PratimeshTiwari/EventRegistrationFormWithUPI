function openContactForm() {
    document.getElementById('contactForm').style.display = 'block';
}

function closeContactForm() {
    document.getElementById('contactForm').style.display = 'none';
}

function calculateAndDisplayPayment1() {
    // var teamSize = parseInt(document.getElementById("teamSize").value);
    var paymentAmount = document.getElementById("paymentAmount");
    var payment = 300 * 1;
    paymentSection.style.display = 'block';
    paymentAmount.textContent = "Payment Amount: INR " + payment;
}

//old function
// function calculateAndDisplayPayment() {
//     var teamSize = parseInt(document.getElementById("teamSize").value);
//     var paymentAmount = document.getElementById("paymentAmount");
//     var payment = 300 * teamSize;
    
//     paymentAmount.textContent = "Payment Amount: INR " + payment;
// }

// new function
function calculateAndDisplayPayment() {
    var teamSize = parseInt(document.getElementById("teamSize").value);
    var paymentAmount = 0;

    // Set payment amount based on team size
    if (teamSize === 1) {
        paymentAmount = 300;
    } else if (teamSize === 2) {
        paymentAmount = 600;
    } else if (teamSize === 3) {
        paymentAmount = 900;
    } else if (teamSize === 4) {
        paymentAmount = 1200;
    }

    // Update UPI payment link with the new payment amount
    var payNowLink = document.getElementById("payNowLink");
    payNowLink.href = `upi://pay?pa=9415083886331@paytm&pn=RajKunwarPandey&am=${paymentAmount}&cu=INR`;

    // Display the updated payment amount in the existing section
    var paymentAmountElement = document.getElementById("paymentAmount");
    paymentAmountElement.textContent = "Payment Amount: INR " + paymentAmount;
}


document.addEventListener("DOMContentLoaded", function () {
    // Call the function to calculate and display payment on page load
    calculateAndDisplayPayment1();

    document.getElementById("myForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        var formData = new FormData(this);

        // Send the form data using Ajax
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "submit_form.php", true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        
        // Define what happens on successful data submission
        xhr.onload = function () {
            if (xhr.status == 200) {
                // Parse the JSON response
                var response = JSON.parse(xhr.responseText);

                // Display a message to the user (you might want to enhance this)
                alert(response.message);

                // Close the contact form (if you want to)
                closeContactForm();
            }
        };

        // Handle errors, if any
        xhr.onerror = function () {
            console.error("Error occurred during the form submission.");
        };

        // Send the form data
        xhr.send(formData);
    });

    document.getElementById("teamSize").addEventListener("change", function () {
        var teamSize = parseInt(this.value);
        var membersInfoContainer = document.getElementById("membersInfo");

        // Clear previous member information
        membersInfoContainer.innerHTML = "";

        // Generate input fields for member information based on Team Size
        for (var i = 1; i <= teamSize-1; i++) {
            var memberDiv = document.createElement("div");
            memberDiv.className = "form-group";
            memberDiv.innerHTML = `
                <label for="memberName${i}">Member ${i} Name:</label>
                <input type="text" class="form-control" id="memberName${i}" name="memberName${i}" required>

                <label for="memberRegNo${i}">Member ${i} Registration Number:</label>
                <input type="text" class="form-control" id="memberRegNo${i}" name="memberRegNo${i}" required>

                <label for="memberEmail${i}">Member ${i} Email:</label>
                <input type="email" class="form-control" id="memberEmail${i}" name="memberEmail${i}" required>

                <label for="memberPhone${i}">Member ${i} Phone Number:</label>
                <input type="tel" class="form-control" id="memberPhone${i}" name="memberPhone${i}" required>
            `;
            membersInfoContainer.appendChild(memberDiv);
        }

        // Calculate and display payment amount
        calculateAndDisplayPayment();
    });
});


//working comment
// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("myForm").addEventListener("submit", function (event) {
//         event.preventDefault(); // Prevent the default form submission

//         // Collect form data
//         var formData = new FormData(this);

//         // Send the form data using Ajax
//         var xhr = new XMLHttpRequest();
//         xhr.open("POST", "submit_form.php", true);
//         xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

//         // Define what happens on successful data submission
//         xhr.onload = function () {
//             if (xhr.status == 200) {
//                 // Parse the JSON response
//                 var response = JSON.parse(xhr.responseText);

//                 // Display a message to the user (you might want to enhance this)
//                 alert(response.message);

//                 // Close the contact form (if you want to)
//                 closeContactForm();
//             }
//         };

//         // Handle errors, if any
//         xhr.onerror = function () {
//             console.error("Error occurred during the form submission.");
//         };

//         // Send the form data
//         xhr.send(formData);
//     });

//     // Update Member Information based on Team Size
//     document.getElementById("teamSize").addEventListener("change", function () {
//         var teamSize = parseInt(this.value);
//         var membersInfoContainer = document.getElementById("membersInfo");

//         // Clear previous member information
//         membersInfoContainer.innerHTML = "";

//         // Generate input fields for member information based on Team Size
//         for (var i = 1; i <= teamSize-1; i++) {
//             var memberDiv = document.createElement("div");
//             memberDiv.className = "form-group";
//             memberDiv.innerHTML = `
//                 <label for="memberName${i}">Member ${i} Name:</label>
//                 <input type="text" class="form-control" id="memberName${i}" name="memberName${i}" required>

//                 <label for="memberRegNo${i}">Member ${i} Registration Number:</label>
//                 <input type="text" class="form-control" id="memberRegNo${i}" name="memberRegNo${i}" required>

//                 <label for="memberEmail${i}">Member ${i} Email:</label>
//                 <input type="email" class="form-control" id="memberEmail${i}" name="memberEmail${i}" required>

//                 <label for="memberPhone${i}">Member ${i} Phone Number:</label>
//                 <input type="tel" class="form-control" id="memberPhone${i}" name="memberPhone${i}" required>
//             `;
//             membersInfoContainer.appendChild(memberDiv);
//         }
//     });
// });
