"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar/Nav"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2 
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

export default function AddRoom() {
    const [roomNumber, setRoomNumber] = useState("");
    const [roomType, setRoomType] = useState("Single");
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get("/api/rooms");
            setRooms(response.data.rooms);
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setError("เกิดข้อผิดพลาดในการโหลดข้อมูลห้อง");
        }
    };

    const validateRoomNumber = (number: string) => /^\d{3}$/.test(number);

    const addRoom = async () => {
        setError("");
        setSuccessMessage("");

        if (!roomNumber) {
            setError("กรุณากรอกเลขห้อง");
            return;
        }

        if (!validateRoomNumber(roomNumber)) {
            setError("กรุณากรอกเลขห้อง 3 หลัก เช่น 001");
            return;
        }

        try {
            setIsLoading(true);
            await axios.post("/api/rooms", { number: roomNumber, type: roomType });
            await fetchRooms();
            setSuccessMessage(`เพิ่มห้อง ${roomNumber} สำเร็จ`);
            setRoomNumber("");
        } catch (error) {
            console.error("Error adding room:", error);
            setError(error.response?.data?.error || "เกิดข้อผิดพลาดในการเพิ่มห้อง");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteRoom = async (number: string) => {
        try {
            await axios.delete(`/api/rooms/${number}`);
            await fetchRooms();
            setSuccessMessage(`ลบห้อง ${number} สำเร็จ`);
        } catch (error) {
            console.error("Error deleting room:", error);
            setError("เกิดข้อผิดพลาดในการลบห้อง");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addRoom();
        }
    };

    return (
        <div className="flex h-screen">
            <Navbar className="min-h-screen" />
            <div className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 overflow-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Building2 className="h-10 w-10 text-blue-600 animate-pulse" />
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            เพิ่มห้องพัก
                        </h1>
                    </div>

                    {successMessage && (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-4"
                        >
                            <Alert variant="default" className="bg-green-50 border-green-200">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                                <AlertDescription className="text-green-800">
                                    {successMessage}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}

                    <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <CardContent>
                            <div className="flex flex-col space-y-4">
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Input
                                        type="text"
                                        value={roomNumber}
                                        onChange={(e) => setRoomNumber(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="กรอกเลขห้อง เช่น 001"
                                        className="text-lg focus:ring-2 focus:ring-blue-300"
                                        maxLength={3}
                                    />
                                </motion.div>

                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <select
                                        value={roomType}
                                        onChange={(e) => setRoomType(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2 text-lg focus:ring-2 focus:ring-blue-300"
                                    >
                                        <option value="Single">ห้องเดี่ยว (Single)</option>
                                        <option value="Double">ห้องคู่ (Double)</option>
                                        <option value="Triple">ห้องสามเตียง (Triple)</option>
                                    </select>
                                </motion.div>

                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Button 
                                        onClick={addRoom} 
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        ) : (
                                            <>
                                                <Plus className="h-5 w-5 mr-2" />
                                                เพิ่ม
                                            </>
                                        )}
                                    </Button>
                                </motion.div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Alert variant="destructive" className="bg-red-50">
                                            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <AnimatePresence>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                        >
                            {rooms.map((room) => (
                                <motion.div
                                    key={room._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                                        <CardContent className="p-6 text-center relative">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => deleteRoom(room.number)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <Building2 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                                            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                                {room.number}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {room.type} - {room.status === "AVAILABLE" 
                                                    ? <span className="text-green-600">ว่าง</span> 
                                                    : <span className="text-red-600">ไม่ว่าง</span>}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {rooms.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-gray-500 mt-8"
                        >
                            <Building2 className="h-16 w-16 mx-auto mb-2 opacity-50 animate-bounce" />
                            <p className="text-xl">ยังไม่มีห้องพัก กรุณาเพิ่มห้องพัก</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}