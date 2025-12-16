import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
    try {
        const db_url = process.env.MONGO_URL as string;
        const username = process.env.DATABASE_USERNAME as string;
        const password = process.env.DATABASE_PASSWORD as string;

        const db_url2 = db_url
            .replace("<db_username>", username)
            .replace("<db_password>", password);

        await mongoose.connect(db_url2);
        console.log("✅ db is running");

        const collections = await mongoose.connection?.listCollections();
            
        console.log(
            "📦 Collections in DB:",
            collections.map(c => c.name)
        );

    } catch (error) {
        console.error("❌ DB connection error:", error);
        throw error;
    }
};
