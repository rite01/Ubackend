const { app } = require("./src/app");

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`listen on port ${port}...`));
