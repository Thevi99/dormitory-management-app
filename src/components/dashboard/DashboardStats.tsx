"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, BadgeDollarSign, CalendarDays, ArrowUp, ArrowDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const StatCard = ({ title, value, subValue, icon: Icon, trend = 'up', color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${colors[color]}`}>
            <Icon className="h-4 w-4" />
          </div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 mt-2">
          {trend === 'up' ? (
            <div className="flex items-center text-green-600 text-xs">
              <ArrowUp className="h-3 w-3" />
              <span>+{subValue}</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600 text-xs">
              <ArrowDown className="h-3 w-3" />
              <span>{subValue}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ApplicationCard = ({ student, roomType, date, status }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors">
      <div>
        <p className="font-medium">{student}</p>
        <p className="text-sm text-muted-foreground">Room Type: {roomType}</p>
      </div>
      <div className="text-sm">
        <p>Applied: {date}</p>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
};


const RoomTypeCard = ({ type, occupied, total }) => {
  const percentage = total > 0 ? (occupied / total) * 100 : 0; 

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span>{type}</span>
        <span className="font-medium">{occupied}/{total} occupied</span>
      </div>
      <Progress value={percentage} className="h-2" />
      <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}% occupancy rate</p>
    </div>
  );
};

const DashboardStats = () => {
  const [roomStats, setRoomStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomStats = async () => {
      try {
        const response = await axios.get("/api/rooms/stats");
        if (response.data.roomStats) {
          setRoomStats(response.data.roomStats);
        }
      } catch (error) {
        console.error("Error fetching room stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="p-6 space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Dormitory Management Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Last updated: Just now</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Rooms" value="156" subValue="12 available" icon={Building2} color="blue" />
          <StatCard title="Total Students" value="284" subValue="12 this month" icon={Users} color="green" />
          <StatCard title="Monthly Revenue" value="$42,500" subValue="8% from last month" icon={BadgeDollarSign} color="purple" />
          <StatCard title="Due Payments" value="23" subValue="5 overdue" icon={CalendarDays} color="orange" trend="down" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ApplicationCard student="John Doe" roomType="Double" date="2024/02/01" status="pending" />
              <ApplicationCard student="Jane Smith" roomType="Single" date="2024/02/02" status="approved" />
              <ApplicationCard student="Mike Johnson" roomType="Triple" date="2024/02/03" status="rejected" />
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Room Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <p>Loading...</p>
              ) : roomStats ? (
                <>
                  <RoomTypeCard type="Single Rooms" occupied={roomStats.Single.occupied} total={roomStats.Single.total} />
                  <RoomTypeCard type="Double Rooms" occupied={roomStats.Double.occupied} total={roomStats.Double.total} />
                  <RoomTypeCard type="Triple Rooms" occupied={roomStats.Triple.occupied} total={roomStats.Triple.total} />
                </>
              ) : (
                <p>No data available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
