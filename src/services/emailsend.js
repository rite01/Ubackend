const nodemailer = require("nodemailer");
const config = require("../config/nodemail");

const user = config.user;
const pass = config.pass;

exports.sendMail = async (email, newCode) => {
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
    <p>OTP for email verification ${newCode}</p>`,
  };

  return mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err);
      return err;
    } else {
      return data;
    }
  });
};
