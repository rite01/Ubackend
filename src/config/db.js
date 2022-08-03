const { default: mongoose } = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connection SuccessFully............");
  } catch (error) {
    console.log(error, "Could not connect to database...........");
  } 
};
