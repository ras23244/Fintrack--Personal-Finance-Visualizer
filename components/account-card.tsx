"use client"

import { CreditCard, Edit2, Eye, EyeOff, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Account = {
  id: string
  name: string
  type: "bank" | "credit" | "investment" | "cash"
  balance: number
  number: string
  institution: string
  color: string
}

type AccountCardProps = {
  account: Account
  showNumber: boolean
  onToggleNumber: () => void
  onEdit: () => void
  onDelete: () => void
}

export function AccountCard({ account, showNumber, onToggleNumber, onEdit, onDelete }: AccountCardProps) {
  const getTypeIcon = () => {
    switch (account.type) {
      case "bank":
        return <CreditCard className="h-4 w-4 text-blue-500" />
      case "credit":
        return <CreditCard className="h-4 w-4 text-red-500" />
      case "investment":
        return <CreditCard className="h-4 w-4 text-amber-500" />
      case "cash":
        return <CreditCard className="h-4 w-4 text-green-500" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: account.color }}
            >
              {getTypeIcon()}
            </div>
            <CardTitle className="text-base">{account.name}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleNumber}>
              {showNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showNumber ? "Hide" : "Show"} account number</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
              <Edit2 className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-2xl font-bold">
          {account.type === "credit" && account.balance < 0 ? "-" : ""}${Math.abs(account.balance).toFixed(2)}
        </div>
        <div className="text-sm text-muted-foreground">{account.institution}</div>
      </CardContent>
      <CardFooter className="pt-2 text-sm text-muted-foreground">
        Account: {showNumber ? account.number : account.number.replace(/\d(?=\d{4})/g, "*")}
      </CardFooter>
    </Card>
  )
}
