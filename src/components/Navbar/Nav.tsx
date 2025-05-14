// components/Nav.tsx
"use client";

// components/Nav.tsx
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  Settings,
  ChevronLeft,
  LogOut,
  ChevronRight,
  Bell,
  Hotel,
  BedDouble,
} from 'lucide-react'

interface NavItemProps {
  icon: React.ReactNode
  title: string
  href: string
  isCollapsed: boolean
}

const NavItem = ({ icon, title, href, isCollapsed }: NavItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <div className="relative">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-4 px-4 transition-all duration-300',
            isActive && 'bg-primary/10 text-primary hover:bg-primary/20',
            isCollapsed ? 'h-12' : 'h-11',
            'group'
          )}
        >
          <span className={cn(
            "transition-transform duration-300 group-hover:scale-110",
            isActive && "text-primary"
          )}>
            {icon}
          </span>
          {!isCollapsed && (
            <span className={cn(
              "font-medium transition-colors",
              isActive && "text-primary"
            )}>
              {title}
            </span>
          )}
        </Button>
        {/* Active Indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full" />
        )}
        {/* Hover tooltip when collapsed */}
        {isCollapsed && (
          <div className="absolute left-full top-0 ml-2 hidden group-hover:block">
            <div className="bg-secondary px-2 py-1 rounded-md text-sm whitespace-nowrap">
              {title}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

const Nav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        'relative flex flex-col h-screen border-r bg-card px-3 py-4 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
        'shadow-lg'
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border shadow-md",
          "transition-transform duration-300 hover:scale-110"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight size={14} />
        ) : (
          <ChevronLeft size={14} />
        )}
      </Button>

      {/* Brand */}
      <div className={cn(
        'flex items-center gap-3 px-2 mb-8 mt-2',
        isCollapsed && 'justify-center'
      )}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <LayoutDashboard className="w-5 h-5 text-primary" />
        </div>
        {!isCollapsed && (
          <span className="font-semibold text-lg">Your Brand</span>
        )}
      </div>

      {/* Navigation */}
        <nav className="flex flex-col gap-2">
            <NavItem
            href="/"
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="หน้าหลัก"
            isCollapsed={isCollapsed}
            />
            <NavItem
            href="/users"
            icon={<Users className="h-5 w-5" />}
            title="ผู้ใช้งาน"
            isCollapsed={isCollapsed}
            />
            <NavItem
            href="/settings"
            icon={<Settings className="h-5 w-5" />}
            title="ตั้งค่า"
            isCollapsed={isCollapsed}
            />
            <NavItem
                href="/add-rooms"
                icon={<Hotel className="h-5 w-5" />}
                title="เพิ่มห้อง"
                isCollapsed={isCollapsed}
            />
            <NavItem
                href = "/manage-rooms"
                icon={<BedDouble className="h-5 w-5" />}
                title="จัดการห้องเช่า"
                isCollapsed={isCollapsed}
            />
        </nav>

      {/* Notifications Section */}
      <div className="mt-8 px-2">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start gap-4 border-dashed",
            isCollapsed && "justify-center"
          )}
        >
          <Bell className="h-5 w-5" />
          {!isCollapsed && <span>การแจ้งเตือน</span>}
        </Button>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto pt-4 border-t">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-4 px-4 text-red-500 hover:text-red-600 hover:bg-red-50',
            isCollapsed && 'justify-center'
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>ออกจากระบบ</span>}
        </Button>
      </div>
    </div>
  )
}

export default Nav