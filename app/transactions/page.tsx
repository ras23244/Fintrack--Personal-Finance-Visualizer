"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUp, Coffee, Download, Filter, Home, Plus, Search, ShoppingBag, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { EditTransactionDialog } from "@/components/edit-transaction-dialog"

type Transaction = {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  icon: React.ReactNode
}

const initialTransactions: Transaction[] = [
  {
    id: "1",
    description: "Grocery Shopping",
    amount: 85.45,
    type: "expense",
    category: "Food",
    date: "Today, 2:30 PM",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    id: "2",
    description: "Salary Deposit",
    amount: 3200.0,
    type: "income",
    category: "Income",
    date: "Yesterday",
    icon: <ArrowUp className="h-4 w-4 text-green-500" />,
  },
  {
    id: "3",
    description: "Coffee Shop",
    amount: 4.5,
    type: "expense",
    category: "Food",
    date: "Yesterday",
    icon: <Coffee className="h-4 w-4" />,
  },
  {
    id: "4",
    description: "Rent Payment",
    amount: 1200.0,
    type: "expense",
    category: "Housing",
    date: "Jul 1, 2023",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: "5",
    description: "Restaurant Dinner",
    amount: 65.2,
    type: "expense",
    category: "Food",
    date: "Jun 29, 2023",
    icon: <Utensils className="h-4 w-4" />,
  },
  {
    id: "6",
    description: "Freelance Payment",
    amount: 850.0,
    type: "income",
    category: "Income",
    date: "Jun 28, 2023",
    icon: <ArrowUp className="h-4 w-4 text-green-500" />,
  },
  {
    id: "7",
    description: "Electricity Bill",
    amount: 95.4,
    type: "expense",
    category: "Utilities",
    date: "Jun 25, 2023",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: "8",
    description: "Internet Subscription",
    amount: 60.0,
    type: "expense",
    category: "Utilities",
    date: "Jun 24, 2023",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: "9",
    description: "Movie Tickets",
    amount: 25.0,
    type: "expense",
    category: "Entertainment",
    date: "Jun 20, 2023",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    id: "10",
    description: "Bonus Payment",
    amount: 500.0,
    type: "income",
    category: "Income",
    date: "Jun 15, 2023",
    icon: <ArrowUp className="h-4 w-4 text-green-500" />,
  },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id))
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
  }

  const handleSaveEdit = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
    setEditingTransaction(null)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground">View and manage all your financial transactions.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setShowAddTransaction(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSearchQuery("")}>All Transactions</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("income")}>Income Only</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("expense")}>Expenses Only</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("food")}>Food Category</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("housing")}>Housing Category</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>A list of all your transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No transactions found. Try a different search or add a new transaction.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell
                        className={`text-right ${transaction.type === "expense" ? "text-red-500" : "text-green-500"}`}
                      >
                        {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(transaction)}>
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AddTransactionDialog open={showAddTransaction} onOpenChange={setShowAddTransaction} />

      {editingTransaction && (
        <EditTransactionDialog
          transaction={editingTransaction}
          open={!!editingTransaction}
          onOpenChange={(open) => {
            if (!open) setEditingTransaction(null)
          }}
          onSave={handleSaveEdit}
        />
      )}
    </DashboardLayout>
  )
}
