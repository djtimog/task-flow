import mongoose from "mongoose";
import logger from "./lib/logger.js";

const connectToDb = async (URI) => {
  logger.info(`connecting... to database ${URI}`);
  try {
    await mongoose.connect(URI);
    logger.info("connected to database");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default connectToDb;
