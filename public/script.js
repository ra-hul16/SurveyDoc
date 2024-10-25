

let chatBox = document.getElementById("chat-box");
let userInput = document.getElementById("user-input");

let appointmentDetails = {
  name: '',
  email: '',
  city: '',
  hospital: '',
  doctorType: '',
  date: '',
  time: ''
};

let step = 0;

const doctorOptions = [
  "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology",
  "Gastroenterology", "General Doctor", "Oncology", "Pulmonology",
  "Endocrinology", "Ophthalmology", "Psychiatry", "Urology", 
  "Obstetrics and Gynecology (OB/GYN)", "Nephrology", "Rheumatology", 
  "Hematology", "Allergy and Immunology", "Infectious Diseases", 
  "General Surgery", "Radiology"
];

function displayMessage(message, sender = "bot") {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const message = userInput.value;
  if (!message) return;

  displayMessage(message, "user");
  userInput.value = "";

  switch (step) {
    case 0:
      appointmentDetails.name = message;
      displayMessage("Please enter your email ID:");
      step++;
      break;
    case 1:
      appointmentDetails.email = message;
      displayMessage("Which city are you from?");
      step++;
      break;
    case 2:
      appointmentDetails.city = message;
      displayMessage("Which hospital would you like to visit?");
      step++;
      break;
    case 3:
      appointmentDetails.hospital = message;
      displayMessage("What type of doctor would you like to consult?");
      displayMessage(doctorOptions.join(", "));
      step++;
      break;
    case 4:
      if (doctorOptions.includes(message)) {
        appointmentDetails.doctorType = message;
        displayMessage("Please enter the date for the appointment (YYYY-MM-DD):");
        step++;
      } else {
        displayMessage("Please choose a valid option from the list above.");
      }
      break;
    case 5:
      appointmentDetails.date = message;
      displayMessage("Please enter the time for the appointment (HH:MM):");
      step++;
      break;
    case 6:
      appointmentDetails.time = message;
      displayMessage(`Here are your appointment details:
      Name: ${appointmentDetails.name}
      Email: ${appointmentDetails.email}
      City: ${appointmentDetails.city}
      Hospital: ${appointmentDetails.hospital}
      Doctor Type: ${appointmentDetails.doctorType}
      Date: ${appointmentDetails.date}
      Time: ${appointmentDetails.time}
      Please confirm by typing 'confirm'`);
      step++;
      break;
    case 7:
      if (message.toLowerCase() === "confirm") {
        displayMessage("Your appointment is successfully booked! A confirmation email will be sent shortly.");
        sendConfirmationEmail();
      } else {
        displayMessage("Appointment not confirmed. Type 'confirm' to proceed.");
      }
      break;
  }
}

function sendConfirmationEmail() {
  fetch("/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentDetails)
  });
}

window.onload = function() {
  displayMessage("Hello! Welcome to Shieldbot");
  displayMessage("Please enter your name:");
};

