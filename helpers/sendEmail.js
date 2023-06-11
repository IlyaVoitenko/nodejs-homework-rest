const nodemailer = require("nodemailer");
const { ErrorHttp } = require("../helpers");

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: { user: UKR_NET_EMAIL, pass: UKR_NET_PASSWORD },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  await transport.sendMail(email, (error, info) => {
    if (error) {
      throw ErrorHttp(401, `send message error: ${error}`);
    }
  });
  return true;
};

module.exports = sendEmail;
