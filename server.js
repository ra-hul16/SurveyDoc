const path = require('path');

// Serve static files from the "public" directory

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post("/send-email", (req, res) => {
  const { name, email, city, hospital, doctorType, date, time } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "surveyshielders@gmail.com",
      pass: "zwxa irmc fqbl vmor"
    }
  });

  const mailOptions = {
    from: "surveyshielders@gmail.com",
    to: email,
    subject: "Appointment Confirmation",
    text: `Hello ${name},\n\nYour appointment has been confirmed with the following details:\n
           City: ${city}\n
           Hospital: ${hospital}\n
           Doctor: ${doctorType}\n
           Date: ${date}\n
           Time: ${time}\n\nThank you for choosing us!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
