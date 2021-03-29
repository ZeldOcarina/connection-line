const mongoose = require("mongoose");

const { app, appState } = require("./app");

process.on("uncaughtException", (err) => {
  console.error(err.name, err.message, err.stack);
  console.log("Uncaught Exception, shutting down");
  process.exit(1);
});

let port = process.env.PORT;
if (port == null || port == "") port = 3000;

/*if (appState === "development")
  mongoose
    .connect("mongodb://localhost:27017/connectionLineDB", {
      useNewUrlParser: true
    })
    .then(console.log("DB Connection successful on dev DB!"));
else if (appState === "production")*/
mongoose
  .connect(
    "mongodb+srv://admin-mattia:" +
      process.env.MONGO_PWD +
      "@connection-line-fzqvp.mongodb.net/connectionLineDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(console.log("DB Connection successful on production DB!"));

//PORT SETUP
const server = app.listen(port, () =>
  console.log("Server started on port " + port)
);

process.on("unhandledRejection", (err) => {
  console.log(err.stack);
  console.log("Unhandled rejection, shutting down");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
