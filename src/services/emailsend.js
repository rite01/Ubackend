const nodemailer = require("nodemailer");
const config = require("../config/nodemail");

const user = config.user;
const pass = config.pass;

exports.sendMail = async (email, code) => {
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  console.log(otp);

  let mailTransporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  let mailDetails = {
    from: user,
    to: email,
    subject: "Test mail",
    html: `
    <p>Please click below the button and verify your email</p>
    <a href=http://localhost:5000/api/v1/confirm/${code}> Click here</a>`,
  };

  return mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log("email send successfully");
      return data;
    }
  });
};
