import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    type: { type: String, required: true }, 
    status: { type: String, default: "AVAILABLE" },
    createdAt: { type: Date, default: Date.now }
});

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);

export default Room;
