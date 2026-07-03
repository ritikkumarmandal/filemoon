import app from "./app.js";
import connectDB from "./config/db.config.js";
import config from "./config/env.config.js";

const PORT = config.port || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

startServer();