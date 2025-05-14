import dbConnect from "@/lib/db";
import Room from "@/models/room.model";

export default async function handler(req, res) {
    await dbConnect(); // ✅ เชื่อมต่อ MongoDB

    if (req.method === "GET") {
        try {
            const rooms = await Room.find().sort({ number: 1 });
            return res.status(200).json({ rooms });
        } catch (error) {
            console.error("❌ Error fetching rooms:", error);
            return res.status(500).json({ error: "เกิดข้อผิดพลาดในการโหลดข้อมูลห้อง" });
        }
    }

    if (req.method === "POST") {
        try {
            const { number, type, status } = req.body;

            // ตรวจสอบค่า
            if (!number || !type) {
                return res.status(400).json({ error: "กรุณากรอกหมายเลขห้องและประเภทห้อง" });
            }

            // ตรวจสอบว่าเลขห้องมี 3 หลัก (001, 002, ...)
            if (!/^\d{3}$/.test(number)) {
                return res.status(400).json({ error: "กรุณากรอกเลขห้อง 3 หลัก เช่น 001" });
            }

            // ตรวจสอบว่าห้องมีอยู่แล้วหรือไม่
            const existingRoom = await Room.findOne({ number });
            if (existingRoom) {
                return res.status(400).json({ error: "ห้องนี้มีอยู่แล้ว" });
            }

            // สร้างห้องใหม่
            const newRoom = new Room({
                number,
                type, // ✅ ต้องมี type
                status: status || "AVAILABLE"
            });

            await newRoom.save();

            return res.status(201).json({ message: "เพิ่มห้องสำเร็จ", room: newRoom });
        } catch (error) {
            console.error("❌ Error creating room:", error);
            return res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มห้อง" });
        }
    }

    if (req.method === "DELETE") {
        try {
            const { number } = req.body;

            // ตรวจสอบว่าหมายเลขห้องถูกส่งมาหรือไม่
            if (!number) {
                return res.status(400).json({ error: "กรุณาระบุหมายเลขห้องที่ต้องการลบ" });
            }

            // ลบห้องจากฐานข้อมูล
            const deletedRoom = await Room.findOneAndDelete({ number });
            if (!deletedRoom) {
                return res.status(404).json({ error: "ไม่พบห้องนี้" });
            }

            return res.status(200).json({ message: "ลบห้องสำเร็จ" });
        } catch (error) {
            console.error("❌ Error deleting room:", error);
            return res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบห้อง" });
        }
    }

    if (req.method === "PATCH") {
        try {
            const { number, status } = req.body;

            if (!number || !status) {
                return res.status(400).json({ error: "กรุณาระบุหมายเลขห้องและสถานะใหม่" });
            }

            const updatedRoom = await Room.findOneAndUpdate(
                { number },
                { status },
                { new: true }
            );

            if (!updatedRoom) {
                return res.status(404).json({ error: "ไม่พบห้องนี้" });
            }

            return res.status(200).json({ message: "อัปเดตสถานะห้องสำเร็จ", room: updatedRoom });
        } catch (error) {
            console.error("❌ Error updating room status:", error);
            return res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตสถานะห้อง" });
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
