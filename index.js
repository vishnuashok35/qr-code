import inquirer from 'inquirer';
import qr from "qr-image";
import fs from 'fs';

inquirer
  .prompt([
    {
      message: "Enter your name",
      name: "name",
    },
    {
      message: "Enter your age",
      name: "age",
    },
    {
      message: "Enter your occupation",
      name: "occupation",
    },
    {
      message: "Enter your email",
      name: "email",
    },
  ])
  .then((answers) => {
    const biodata = {
      name: answers.name,
      age: answers.age,
      occupation: answers.occupation,
      email: answers.email,
    };
    const biodataString = JSON.stringify(biodata, null, 2); // Convert biodata to a formatted string
    var qr_svg = qr.image(biodataString, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('QRCode.png'));
    console.log("QR code generated and saved as 'QRCode.png'");
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something went wrong:", error);
    }
  });

