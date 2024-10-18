import mongoose from "mongoose";

const connectDB = async () => {
    try {
        
        await mongoose.connect(
            `${process.env.MONGODB_URI}/?retryWrites=true&w=majority&appName=Cluster0`
        )

        console.log("Database Connected...");

    } catch (error) {
        console.error("Error connecting to Database", error.message);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;