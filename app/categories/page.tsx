"use client"

import { useState } from "react"
import { Edit2, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CategoryPieChart } from "@/components/charts/category-pie-chart"

type Category = {
  id: string
  name: string
  description: string
  color: string
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Housing",
    description: "Rent, mortgage, property taxes, repairs",
    color: "#10b981",
  },
  {
    id: "2",
    name: "Food",
    description: "Groceries, restaurants, takeout",
    color: "#3b82f6",
  },
  {
    id: "3",
    name: "Transportation",
    description: "Gas, public transit, car maintenance",
    color: "#f43f5e",
  },
  {
    id: "4",
    name: "Entertainment",
    description: "Movies, concerts, subscriptions",
    color: "#f59e0b",
  },
  {
    id: "5",
    name: "Utilities",
    description: "Electricity, water, internet, phone",
    color: "#8b5cf6",
  },
  {
    id: "6",
    name: "Others",
    description: "Miscellaneous expenses",
    color: "#64748b",
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "#10b981",
  })

  const handleAddCategory = () => {
    if (!newCategory.name) return

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      color: newCategory.color,
    }

    setCategories([...categories, category])
    setNewCategory({ name: "", description: "", color: "#10b981" })
    setShowAddCategory(false)
  }

  const handleUpdateCategory = () => {
    if (!editingCategory) return

    setCategories(categories.map((category) => (category.id === editingCategory.id ? editingCategory : category)))
    setEditingCategory(null)
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">Manage your transaction categories.</p>
          </div>
          <Button onClick={() => setShowAddCategory(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Expense Distribution</CardTitle>
              <CardDescription>Breakdown of your spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryPieChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category List</CardTitle>
              <CardDescription>Manage your transaction categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full" style={{ backgroundColor: category.color }} />
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground">{category.description}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingCategory(category)}
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Create a new transaction category.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="Housing"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Rent, mortgage, property taxes"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  className="w-12 h-10 p-1"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                />
                <Input
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog
        open={!!editingCategory}
        onOpenChange={(open) => {
          if (!open) setEditingCategory(null)
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update your transaction category.</DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
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
                    value={editingCategory.color}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        color: e.target.value,
                      })
                    }
                  />
                  <Input
                    value={editingCategory.color}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        color: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateCategory}>Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
