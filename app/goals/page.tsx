"use client"

import { useState } from "react"
import { Check, Plus, Target, Trash2 } from "lucide-react"

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
import { useToast } from "@/components/ui/use-toast"

type Goal = {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  category: string
  progress: number
  color: string
}

const initialGoals: Goal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 5000,
    targetDate: "2023-12-31",
    category: "Savings",
    progress: 50,
    color: "#10b981",
  },
  {
    id: "2",
    name: "New Car",
    targetAmount: 25000,
    currentAmount: 8000,
    targetDate: "2024-06-30",
    category: "Transportation",
    progress: 32,
    color: "#3b82f6",
  },
  {
    id: "3",
    name: "Vacation",
    targetAmount: 5000,
    currentAmount: 3500,
    targetDate: "2023-08-15",
    category: "Travel",
    progress: 70,
    color: "#f59e0b",
  },
  {
    id: "4",
    name: "Home Down Payment",
    targetAmount: 50000,
    currentAmount: 15000,
    targetDate: "2025-01-01",
    category: "Housing",
    progress: 30,
    color: "#8b5cf6",
  },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [showContributeDialog, setShowContributeDialog] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [contributionAmount, setContributionAmount] = useState("")
  const { toast } = useToast()

  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    category: "",
    color: "#10b981",
  })

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const targetAmount = Number.parseFloat(newGoal.targetAmount)
    const currentAmount = Number.parseFloat(newGoal.currentAmount) || 0

    if (currentAmount > targetAmount) {
      toast({
        title: "Invalid amount",
        description: "Current amount cannot be greater than target amount.",
        variant: "destructive",
      })
      return
    }

    const progress = Math.round((currentAmount / targetAmount) * 100)

    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount,
      currentAmount,
      targetDate: newGoal.targetDate,
      category: newGoal.category || "Other",
      progress,
      color: newGoal.color,
    }

    setGoals([...goals, goal])
    setNewGoal({
      name: "",
      targetAmount: "",
      currentAmount: "",
      targetDate: "",
      category: "",
      color: "#10b981",
    })
    setShowAddGoal(false)

    toast({
      title: "Goal added",
      description: "Your financial goal has been added successfully.",
    })
  }

  const handleUpdateGoal = () => {
    if (!editingGoal) return

    const targetAmount = editingGoal.targetAmount
    const currentAmount = editingGoal.currentAmount

    if (currentAmount > targetAmount) {
      toast({
        title: "Invalid amount",
        description: "Current amount cannot be greater than target amount.",
        variant: "destructive",
      })
      return
    }

    const progress = Math.round((currentAmount / targetAmount) * 100)

    const updatedGoal = {
      ...editingGoal,
      progress,
    }

    setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
    setEditingGoal(null)

    toast({
      title: "Goal updated",
      description: "Your financial goal has been updated successfully.",
    })
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
    toast({
      title: "Goal deleted",
      description: "Your financial goal has been deleted.",
    })
  }

  const handleContribute = () => {
    if (!selectedGoal || !contributionAmount) return

    const amount = Number.parseFloat(contributionAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid contribution amount.",
        variant: "destructive",
      })
      return
    }

    const newCurrentAmount = selectedGoal.currentAmount + amount
    if (newCurrentAmount > selectedGoal.targetAmount) {
      toast({
        title: "Exceeds target",
        description: "Contribution would exceed the target amount.",
        variant: "destructive",
      })
      return
    }

    const progress = Math.round((newCurrentAmount / selectedGoal.targetAmount) * 100)

    const updatedGoal = {
      ...selectedGoal,
      currentAmount: newCurrentAmount,
      progress,
    }

    setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
    setSelectedGoal(null)
    setContributionAmount("")
    setShowContributeDialog(false)

    toast({
      title: "Contribution added",
      description: `$${amount.toFixed(2)} has been added to your ${updatedGoal.name} goal.`,
    })
  }

  const openContributeDialog = (goal: Goal) => {
    setSelectedGoal(goal)
    setContributionAmount("")
    setShowContributeDialog(true)
  }

  const calculateTimeRemaining = (targetDate: string) => {
    const target = new Date(targetDate)
    const today = new Date()

    // Calculate difference in days
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return "Overdue"
    } else if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Tomorrow"
    } else if (diffDays < 30) {
      return `${diffDays} days left`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} month${months > 1 ? "s" : ""} left`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years} year${years > 1 ? "s" : ""} left`
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Financial Goals</h1>
            <p className="text-muted-foreground">Track your progress towards your financial goals.</p>
          </div>
          <Button onClick={() => setShowAddGoal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.id} className="overflow-hidden">
              <div className="h-2" style={{ backgroundColor: goal.color }} />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" style={{ color: goal.color }} />
                    {goal.name}
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingGoal(goal)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <CardDescription>{goal.category}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>
                      ${goal.currentAmount.toFixed(2)} of ${goal.targetAmount.toFixed(2)}
                    </span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Target Date</p>
                    <p>{new Date(goal.targetDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Time Remaining</p>
                    <p>{calculateTimeRemaining(goal.targetDate)}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => openContributeDialog(goal)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Contribution
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {goals.length === 0 && (
          <Card className="p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Target className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No goals yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Start by adding a financial goal to track your progress.
            </p>
            <Button className="mt-4" onClick={() => setShowAddGoal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Goal
            </Button>
          </Card>
        )}
      </div>

      {/* Add Goal Dialog */}
      <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Financial Goal</DialogTitle>
            <DialogDescription>Create a new financial goal to track your progress.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Goal Name</Label>
              <Input
                id="name"
                placeholder="Emergency Fund"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Savings">Savings</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Retirement">Retirement</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetAmount">Target Amount</Label>
              <Input
                id="targetAmount"
                placeholder="10000"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currentAmount">Current Amount (Optional)</Label>
              <Input
                id="currentAmount"
                placeholder="0"
                value={newGoal.currentAmount}
                onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  className="w-12 h-10 p-1"
                  value={newGoal.color}
                  onChange={(e) => setNewGoal({ ...newGoal, color: e.target.value })}
                />
                <Input value={newGoal.color} onChange={(e) => setNewGoal({ ...newGoal, color: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Goal Dialog */}
      <Dialog
        open={!!editingGoal}
        onOpenChange={(open) => {
          if (!open) setEditingGoal(null)
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>Update your financial goal details.</DialogDescription>
          </DialogHeader>
          {editingGoal && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Goal Name</Label>
                <Input
                  id="edit-name"
                  value={editingGoal.name}
                  onChange={(e) =>
                    setEditingGoal({
                      ...editingGoal,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingGoal.category}
                  onValueChange={(value) =>
                    setEditingGoal({
                      ...editingGoal,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Savings">Savings</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Retirement">Retirement</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-targetAmount">Target Amount</Label>
                <Input
                  id="edit-targetAmount"
                  value={editingGoal.targetAmount}
                  onChange={(e) =>
                    setEditingGoal({
                      ...editingGoal,
                      targetAmount: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-currentAmount">Current Amount</Label>
                <Input
                  id="edit-currentAmount"
                  value={editingGoal.currentAmount}
                  onChange={(e) =>
                    setEditingGoal({
                      ...editingGoal,
                      currentAmount: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-targetDate">Target Date</Label>
                <Input
                  id="edit-targetDate"
                  type="date"
                  value={editingGoal.targetDate}
                  onChange={(e) =>
                    setEditingGoal({
                      ...editingGoal,
                      targetDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-color">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-color"
                    type="color"
                    className="w-12 h-10 p-1"
                    value={editingGoal.color}
                    onChange={(e) =>
                      setEditingGoal({
                        ...editingGoal,
                        color: e.target.value,
                      })
                    }
                  />
                  <Input
                    value={editingGoal.color}
                    onChange={(e) =>
                      setEditingGoal({
                        ...editingGoal,
                        color: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateGoal}>Update Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contribute Dialog */}
      <Dialog open={showContributeDialog} onOpenChange={setShowContributeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Contribution</DialogTitle>
            <DialogDescription>
              {selectedGoal ? `Add money to your ${selectedGoal.name} goal.` : "Add money to your goal."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedGoal && (
              <>
                <div className="flex justify-between text-sm">
                  <span>Current Amount:</span>
                  <span className="font-medium">${selectedGoal.currentAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Target Amount:</span>
                  <span className="font-medium">${selectedGoal.targetAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining:</span>
                  <span className="font-medium">
                    ${(selectedGoal.targetAmount - selectedGoal.currentAmount).toFixed(2)}
                  </span>
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="contribution">Contribution Amount</Label>
                  <Input
                    id="contribution"
                    placeholder="0.00"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleContribute}>
              <Check className="mr-2 h-4 w-4" />
              Add Contribution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
