const nodemailer = require("nodemailer");
const config = require("../config/nodemail");

const user = config.user;
const pass = config.pass;

exports.sendMail = async (email, code) => {
  console.log("confirmationCode", code);
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
    html: `<a href=http://localhost:8080/api/v1/confirm/${code}> Click here</a>`,
  };

  return mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("ll", err);
      return err;
    } else {
      return data;
    }
  });
};
