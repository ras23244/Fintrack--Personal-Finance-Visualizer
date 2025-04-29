"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  CreditCard,
  DollarSign,
  HelpCircle,
  Home,
  LogOut,
  PieChart,
  Settings,
  User,
  Wallet,
  Target,
} from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState("overview")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r-0">
          <SidebarHeader className="flex h-14 items-center px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <Wallet className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-primary">FinTrack</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-muted-foreground">MAIN MENU</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={activePage === "overview"}
                  onClick={() => setActivePage("overview")}
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={activePage === "transactions"}
                  onClick={() => setActivePage("transactions")}
                >
                  <Link href="/transactions">
                    <DollarSign className="h-4 w-4" />
                    <span>Transactions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activePage === "budget"} onClick={() => setActivePage("budget")}>
                  <Link href="/budget">
                    <BarChart3 className="h-4 w-4" />
                    <span>Budget</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={activePage === "categories"}
                  onClick={() => setActivePage("categories")}
                >
                  <Link href="/categories">
                    <PieChart className="h-4 w-4" />
                    <span>Categories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activePage === "goals"} onClick={() => setActivePage("goals")}>
                  <Link href="/goals">
                    <Target className="h-4 w-4" />
                    <span>Goals</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={activePage === "accounts"}
                  onClick={() => setActivePage("accounts")}
                >
                  <Link href="/accounts">
                    <CreditCard className="h-4 w-4" />
                    <span>Accounts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator />
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-muted-foreground">SETTINGS</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/help">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help Center</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto bg-background">
          <div className="h-full p-4 md:p-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}
