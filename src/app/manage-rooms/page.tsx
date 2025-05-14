"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  LayoutGrid, 
  Hotel, 
  Check, 
  X, 
  RefreshCw 
} from "lucide-react";
import Navbar from "@/components/Navbar/Nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export function RoomSelectCard() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showRoomSelection, setShowRoomSelection] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/rooms");
      setRooms(response.data.rooms);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setLoading(false);
    }
  };

  const roomStatusColors = {
    AVAILABLE: "bg-green-100 text-green-800",
    OCCUPIED: "bg-red-100 text-red-800",
    CLEANING: "bg-yellow-100 text-yellow-800",
    PLEDGE: "bg-blue-100 text-blue-800"
  };

  const categorizedRooms = {
    Single: rooms.filter((room) => room.type === "Single"),
    Double: rooms.filter((room) => room.type === "Double"),
    Triple: rooms.filter((room) => room.type === "Triple"),
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowRoomSelection(false);
  };

  return (
    <div className="flex w-full min-h-screen">
      <Navbar className="min-h-screen" />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 overflow-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-md mx-auto"
        >
          <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
              <div className="flex items-center space-x-3">
                <LayoutGrid className="w-6 h-6 text-blue-600" />
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">จัดการห้อง</CardTitle>
                  <CardDescription>เลือกห้องและสถานะที่ต้องการ</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Hotel className="w-5 h-5 text-gray-600" />
                    <span>ห้อง</span>
                  </Label>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowRoomSelection(true);
                    }}
                  >
                    {selectedRoom ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          ห้องที่เลือก: {selectedRoom.number}
                        </span>
                        <Badge variant="secondary" className="ml-2">
                          {selectedRoom.type}
                        </Badge>
                      </div>
                    ) : (
                      "เลือกห้อง"
                    )}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <RefreshCw className="w-5 h-5 text-gray-600" />
                    <span>สถานะ</span>
                  </Label>
                  <Select onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกสถานะ" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(roomStatusColors).map(([status, colorClass]) => (
                        <SelectItem key={status} value={status}>
                          <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
                            <span>{status}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" className="text-gray-600">
                <X className="w-4 h-4 mr-2" /> ยกเลิก
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Check className="w-4 h-4 mr-2" /> ยืนยัน
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <AnimatePresence>
          {showRoomSelection && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white rounded-xl shadow-2xl w-[700px] max-h-[80vh] overflow-y-auto p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">เลือกห้อง</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowRoomSelection(false)}
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </Button>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(categorizedRooms).map(([category, rooms]) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                          {category} Rooms
                        </h3>
                        <div className="grid grid-cols-5 gap-3">
                          {rooms.length > 0 ? (
                            rooms.map((room) => (
                              <motion.button
                                key={room.number}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-3 rounded-lg border-2 transition-all 
                                  ${selectedRoom?.number === room.number 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-blue-300'}`}
                                onClick={() => handleRoomSelect(room)}
                              >
                                <div className="flex flex-col items-center">
                                  <span className="font-bold text-lg">{room.number}</span>
                                  <Badge 
                                    className={`mt-1 ${roomStatusColors[room.status] || 'bg-gray-100'}`}
                                  >
                                    {room.status}
                                  </Badge>
                                </div>
                              </motion.button>
                            ))
                          ) : (
                            <p className="text-gray-500 col-span-5 text-center">
                              ไม่มีห้อง
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default RoomSelectCard;