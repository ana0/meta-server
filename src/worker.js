import db from "./database";
import tasks from "./tasks";
import submitJob from "./tasks/submitJob";

const CRON_NIGHTLY = "0 0 0 * * *";

// Check database connection
db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully");
    submitJob(tasks.cleanup, "cleanUp-nightly", null, {
      repeat: {
        cron: CRON_NIGHTLY,
      },
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Unable to connect to database");
    process.exit(1);
  });
