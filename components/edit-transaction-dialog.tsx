"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"

const categories = [
  { value: "housing", label: "Housing" },
  { value: "food", label: "Food" },
  { value: "transportation", label: "Transportation" },
  { value: "entertainment", label: "Entertainment" },
  { value: "utilities", label: "Utilities" },
  { value: "healthcare", label: "Healthcare" },
  { value: "personal", label: "Personal" },
  { value: "education", label: "Education" },
  { value: "income", label: "Income" },
  { value: "other", label: "Other" },
]

type Transaction = {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  icon: React.ReactNode
}

type EditTransactionDialogProps = {
  transaction: Transaction
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (transaction: Transaction) => void
}

export function EditTransactionDialog({ transaction, open, onOpenChange, onSave }: EditTransactionDialogProps) {
  const [date, setDate] = useState<Date>(new Date())

  const form = useForm({
    defaultValues: {
      description: transaction.description,
      amount: transaction.amount.toString(),
      type: transaction.type,
      category: transaction.category.toLowerCase(),
    },
  })

  useEffect(() => {
    if (transaction) {
      form.reset({
        description: transaction.description,
        amount: transaction.amount.toString(),
        type: transaction.type,
        category: transaction.category.toLowerCase(),
      })
    }
  }, [transaction, form])

  function onSubmit(data: any) {
    onSave({
      ...transaction,
      description: data.description,
      amount: Number.parseFloat(data.amount),
      type: data.type,
      category: data.category,
      date: transaction.date, // Keep the original date for simplicity
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>Update the details of your transaction.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              rules={{
                required: "Amount is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Please enter a valid amount",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
