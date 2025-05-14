import dbConnect from "@/lib/db";
import Room from "@/models/room.model";

export default async function handler(req, res) {
    await dbConnect(); // เชื่อมต่อ MongoDB

    if (req.method === "DELETE") {
        try {
            const { number } = req.query;

            const deletedRoom = await Room.findOneAndDelete({ number });
            if (!deletedRoom) {
                return res.status(404).json({ error: "ไม่พบห้องนี้" });
            }

            return res.status(200).json({ message: "ลบห้องสำเร็จ" });
        } catch (error) {
            return res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบห้อง" });
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
