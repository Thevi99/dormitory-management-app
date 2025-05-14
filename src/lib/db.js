import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
    throw new Error("⚠️ กรุณาตั้งค่า DATABASE_URL ใน .env");
}

async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    
    mongoose.set("strictQuery", false);
    
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected to:", mongoose.connection.name);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
}

export default dbConnect;
