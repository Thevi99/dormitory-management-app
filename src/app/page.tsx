
import DashboardStats from "@/components/dashboard/DashboardStats"
import Navbar from "@/components/Navbar/Nav"

export default function Home() {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1 min-h-screen bg-gray-50 p-6">
        <DashboardStats />
      </main>
    </div>
  )
}