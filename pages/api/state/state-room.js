import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Room from "@/models/room.model";

export async function GET() {
    await dbConnect();

    try {
        const allRooms = await Room.find();

        const roomTypes = ["Single", "Double", "Triple"];
        const roomStats = {};

        for (const type of roomTypes) {
            const totalRooms = allRooms.filter(room => room.type === type).length;
            const availableRooms = allRooms.filter(room => room.type === type && room.status === "AVAILABLE").length;
            const occupancyRate = totalRooms ? ((totalRooms - availableRooms) / totalRooms) * 100 : 0;

            roomStats[type] = {
                total: totalRooms,
                available: availableRooms,
                rate: occupancyRate.toFixed(1),
            };
        }

        return NextResponse.json({ roomStats }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching room stats:", error);
        return NextResponse.json({ error: "เกิดข้อผิดพลาดในการโหลดข้อมูลห้อง" }, { status: 500 });
    }
}
