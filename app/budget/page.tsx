"use client"

import { useState } from "react"
import { Edit2, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BudgetComparisonChart } from "@/components/charts/budget-comparison-chart"

type Budget = {
  id: string
  category: string
  amount: number
  spent: number
  remaining: number
  progress: number
}

const initialBudgets: Budget[] = [
  {
    id: "1",
    category: "Housing",
    amount: 2500,
    spent: 2400,
    remaining: 100,
    progress: 96,
  },
  {
    id: "2",
    category: "Food",
    amount: 1000,
    spent: 1200,
    remaining: -200,
    progress: 120,
  },
  {
    id: "3",
    category: "Transportation",
    amount: 700,
    spent: 800,
    remaining: -100,
    progress: 114,
  },
  {
    id: "4",
    category: "Entertainment",
    amount: 500,
    spent: 600,
    remaining: -100,
    progress: 120,
  },
  {
    id: "5",
    category: "Utilities",
    amount: 500,
    spent: 500,
    remaining: 0,
    progress: 100,
  },
  {
    id: "6",
    category: "Others",
    amount: 300,
    spent: 400,
    remaining: -100,
    progress: 133,
  },
]

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets)
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
  })

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.amount) return

    const budget: Budget = {
      id: Date.now().toString(),
      category: newBudget.category,
      amount: Number.parseFloat(newBudget.amount),
      spent: 0,
      remaining: Number.parseFloat(newBudget.amount),
      progress: 0,
    }

    setBudgets([...budgets, budget])
    setNewBudget({ category: "", amount: "" })
    setShowAddBudget(false)
  }

  const handleUpdateBudget = () => {
    if (!editingBudget) return

    setBudgets(budgets.map((budget) => (budget.id === editingBudget.id ? editingBudget : budget)))
    setEditingBudget(null)
  }

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter((budget) => budget.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Budget Management</h1>
            <p className="text-muted-foreground">Set and track your monthly spending limits.</p>
          </div>
          <Button onClick={() => setShowAddBudget(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Budget
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual Spending</CardTitle>
            <CardDescription>Compare your budgeted amounts with actual spending</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetComparisonChart />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => (
            <Card key={budget.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{budget.category}</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingBudget(budget)}>
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => handleDeleteBudget(budget.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <CardDescription>Monthly budget: ${budget.amount.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Spent: ${budget.spent.toFixed(2)}</span>
                  <span className={budget.remaining < 0 ? "text-red-500" : "text-green-500"}>
                    Remaining: ${budget.remaining.toFixed(2)}
                  </span>
                </div>
                <Progress
                  value={budget.progress > 100 ? 100 : budget.progress}
                  className={budget.progress > 100 ? "bg-red-200" : ""}
                  indicatorClassName={budget.progress > 100 ? "bg-red-500" : ""}
                />
              </CardContent>
              <CardFooter className="pt-2">
                <p className="text-xs text-muted-foreground">
                  {budget.progress > 100
                    ? `You've exceeded your budget by ${(budget.progress - 100).toFixed(0)}%`
                    : `You've used ${budget.progress.toFixed(0)}% of your budget`}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Budget Dialog */}
      <Dialog open={showAddBudget} onOpenChange={setShowAddBudget}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Budget</DialogTitle>
            <DialogDescription>Set a new monthly budget for a category.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Budget Amount</Label>
              <Input
                id="amount"
                placeholder="0.00"
                value={newBudget.amount}
                onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddBudget}>Add Budget</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Budget Dialog */}
      <Dialog
        open={!!editingBudget}
        onOpenChange={(open) => {
          if (!open) setEditingBudget(null)
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>Update your monthly budget for {editingBudget?.category}.</DialogDescription>
          </DialogHeader>
          {editingBudget && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-amount">Budget Amount</Label>
                <Input
                  id="edit-amount"
                  placeholder="0.00"
                  value={editingBudget.amount}
                  onChange={(e) =>
                    setEditingBudget({
                      ...editingBudget,
                      amount: Number.parseFloat(e.target.value),
                      remaining: Number.parseFloat(e.target.value) - editingBudget.spent,
                      progress: (editingBudget.spent / Number.parseFloat(e.target.value)) * 100,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-spent">Spent Amount</Label>
                <Input
                  id="edit-spent"
                  placeholder="0.00"
                  value={editingBudget.spent}
                  onChange={(e) =>
                    setEditingBudget({
                      ...editingBudget,
                      spent: Number.parseFloat(e.target.value),
                      remaining: editingBudget.amount - Number.parseFloat(e.target.value),
                      progress: (Number.parseFloat(e.target.value) / editingBudget.amount) * 100,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateBudget}>Update Budget</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
