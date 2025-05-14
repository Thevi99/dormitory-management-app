import dbConnect from "@/lib/db";
import Room from "@/models/room.model";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "GET") {
        try {
            const allRooms = await Room.find();

            if (!allRooms.length) {
                return res.status(200).json({ message: "ไม่มีข้อมูลห้องในระบบ", roomStats: {} });
            }

            const roomTypes = ["Single", "Double", "Triple"];
            const roomStats = {};

            for (const type of roomTypes) {
                const totalRooms = allRooms.filter(room => room.type === type).length;
                const occupiedRooms = allRooms.filter(room => room.type === type && room.status === "OCCUPIED").length;
                
                // ✅ ถ้า totalRooms = 0, ให้กำหนด rate เป็น 0 แทน NaN
                const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

                roomStats[type] = {
                    total: totalRooms,
                    occupied: occupiedRooms,
                    rate: occupancyRate.toFixed(1), // ✅ ป้องกัน NaN
                };
            }

            return res.status(200).json({ roomStats });
        } catch (error) {
            console.error("❌ Error fetching room stats:", error);
            return res.status(500).json({ error: "เกิดข้อผิดพลาดในการโหลดข้อมูลห้อง" });
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
