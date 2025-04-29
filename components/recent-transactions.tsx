"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUp, Coffee, Home, MoreHorizontal, ShoppingBag, Trash2, Utensils } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
]

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

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
    <div className="space-y-4">
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  transaction.type === "expense" ? "bg-red-100" : "bg-green-100",
                )}
              >
                {transaction.icon}
              </div>
              <div>
                <div className="font-medium">{transaction.description}</div>
                <div className="text-xs text-muted-foreground">{transaction.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn("font-medium", transaction.type === "expense" ? "text-red-500" : "text-green-500")}>
                {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(transaction)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(transaction.id)} className="text-red-500">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  )
}
