
import mongoose from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/blog-app";

const connectToDB = async () => {
    await mongoose.connect(MONGO_URL);
}

export default connectToDB;