"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MonthlyExpensesChart } from "@/components/charts/monthly-expenses-chart"
import { CategoryPieChart } from "@/components/charts/category-pie-chart"
import { BudgetComparisonChart } from "@/components/charts/budget-comparison-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"

export function DashboardContent() {
  const [showAddTransaction, setShowAddTransaction] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your finances.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[300px]" />
          </div>
          <Button onClick={() => setShowAddTransaction(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$54,130.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                12.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10,150.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                2.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,817.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                3.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,333.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                8.3%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Financial Statistics</CardTitle>
              <CardDescription>Monthly income and expenses overview</CardDescription>
            </div>
            <Tabs defaultValue="expenses">
              <TabsList>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <MonthlyExpensesChart />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Breakdown of your spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryPieChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Budget vs Actual</CardTitle>
              <CardDescription>Compare your spending against budget</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Set Budget
            </Button>
          </CardHeader>
          <CardContent>
            <BudgetComparisonChart />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/transactions">View All Transactions</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <AddTransactionDialog open={showAddTransaction} onOpenChange={setShowAddTransaction} />
    </div>
  )
}
