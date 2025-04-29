"use client"

import { useState } from "react"
import { CreditCard, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { AccountCard } from "@/components/account-card"

type Account = {
  id: string
  name: string
  type: "bank" | "credit" | "investment" | "cash"
  balance: number
  number: string
  institution: string
  color: string
}

const initialAccounts: Account[] = [
  {
    id: "1",
    name: "Main Checking",
    type: "bank",
    balance: 5430.28,
    number: "****4567",
    institution: "Chase Bank",
    color: "#3b82f6",
  },
  {
    id: "2",
    name: "Savings Account",
    type: "bank",
    balance: 12500.0,
    number: "****7890",
    institution: "Bank of America",
    color: "#10b981",
  },
  {
    id: "3",
    name: "Credit Card",
    type: "credit",
    balance: -2450.75,
    number: "****1234",
    institution: "American Express",
    color: "#f43f5e",
  },
  {
    id: "4",
    name: "Investment Portfolio",
    type: "investment",
    balance: 34200.5,
    number: "****8901",
    institution: "Vanguard",
    color: "#f59e0b",
  },
  {
    id: "5",
    name: "Emergency Fund",
    type: "bank",
    balance: 10000.0,
    number: "****5678",
    institution: "Ally Bank",
    color: "#8b5cf6",
  },
]

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [showAddAccount, setShowAddAccount] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [showAccountNumber, setShowAccountNumber] = useState<Record<string, boolean>>({})
  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "bank",
    balance: "",
    number: "",
    institution: "",
    color: "#3b82f6",
  })

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
  const bankBalance = accounts
    .filter((account) => account.type === "bank" || account.type === "cash")
    .reduce((sum, account) => sum + account.balance, 0)
  const creditBalance = accounts
    .filter((account) => account.type === "credit")
    .reduce((sum, account) => sum + account.balance, 0)
  const investmentBalance = accounts
    .filter((account) => account.type === "investment")
    .reduce((sum, account) => sum + account.balance, 0)

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.number || !newAccount.institution) return

    const account: Account = {
      id: Date.now().toString(),
      name: newAccount.name,
      type: newAccount.type as "bank" | "credit" | "investment" | "cash",
      balance: Number.parseFloat(newAccount.balance) || 0,
      number: newAccount.number,
      institution: newAccount.institution,
      color: newAccount.color,
    }

    setAccounts([...accounts, account])
    setNewAccount({
      name: "",
      type: "bank",
      balance: "",
      number: "",
      institution: "",
      color: "#3b82f6",
    })
    setShowAddAccount(false)
  }

  const handleUpdateAccount = () => {
    if (!editingAccount) return

    setAccounts(accounts.map((account) => (account.id === editingAccount.id ? editingAccount : account)))
    setEditingAccount(null)
  }

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id))
  }

  const toggleAccountNumber = (id: string) => {
    setShowAccountNumber({
      ...showAccountNumber,
      [id]: !showAccountNumber[id],
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
            <p className="text-muted-foreground">Manage your financial accounts and track balances.</p>
          </div>
          <Button onClick={() => setShowAddAccount(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Across all accounts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bank Accounts</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${bankBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Available funds</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Cards</CardTitle>
              <CreditCard className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.abs(creditBalance).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Outstanding balance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investments</CardTitle>
              <CreditCard className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${investmentBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Portfolio value</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="all">All Accounts</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
            <TabsTrigger value="credit">Credit</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  showNumber={!!showAccountNumber[account.id]}
                  onToggleNumber={() => toggleAccountNumber(account.id)}
                  onEdit={() => setEditingAccount(account)}
                  onDelete={() => handleDeleteAccount(account.id)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="bank" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {accounts
                .filter((account) => account.type === "bank" || account.type === "cash")
                .map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    showNumber={!!showAccountNumber[account.id]}
                    onToggleNumber={() => toggleAccountNumber(account.id)}
                    onEdit={() => setEditingAccount(account)}
                    onDelete={() => handleDeleteAccount(account.id)}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="credit" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {accounts
                .filter((account) => account.type === "credit")
                .map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    showNumber={!!showAccountNumber[account.id]}
                    onToggleNumber={() => toggleAccountNumber(account.id)}
                    onEdit={() => setEditingAccount(account)}
                    onDelete={() => handleDeleteAccount(account.id)}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="investment" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {accounts
                .filter((account) => account.type === "investment")
                .map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    showNumber={!!showAccountNumber[account.id]}
                    onToggleNumber={() => toggleAccountNumber(account.id)}
                    onEdit={() => setEditingAccount(account)}
                    onDelete={() => handleDeleteAccount(account.id)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Account Dialog */}
      <Dialog open={showAddAccount} onOpenChange={setShowAddAccount}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Account</DialogTitle>
            <DialogDescription>Add a new financial account to track.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Account Name</Label>
              <Input
                id="name"
                placeholder="Main Checking"
                value={newAccount.name}
                onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Account Type</Label>
              <Select value={newAccount.type} onValueChange={(value) => setNewAccount({ ...newAccount, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Account</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="institution">Financial Institution</Label>
              <Input
                id="institution"
                placeholder="Bank of America"
                value={newAccount.institution}
                onChange={(e) => setNewAccount({ ...newAccount, institution: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number">Account Number</Label>
              <Input
                id="number"
                placeholder="Last 4 digits or full number"
                value={newAccount.number}
                onChange={(e) => setNewAccount({ ...newAccount, number: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="balance">Current Balance</Label>
              <Input
                id="balance"
                placeholder="0.00"
                value={newAccount.balance}
                onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  className="w-12 h-10 p-1"
                  value={newAccount.color}
                  onChange={(e) => setNewAccount({ ...newAccount, color: e.target.value })}
                />
                <Input
                  value={newAccount.color}
                  onChange={(e) => setNewAccount({ ...newAccount, color: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddAccount}>Add Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Account Dialog */}
      <Dialog
        open={!!editingAccount}
        onOpenChange={(open) => {
          if (!open) setEditingAccount(null)
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>Update your account information.</DialogDescription>
          </DialogHeader>
          {editingAccount && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Account Name</Label>
                <Input
                  id="edit-name"
                  value={editingAccount.name}
                  onChange={(e) =>
                    setEditingAccount({
                      ...editingAccount,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Account Type</Label>
                <Select
                  value={editingAccount.type}
                  onValueChange={(value) =>
                    setEditingAccount({
                      ...editingAccount,
                      type: value as "bank" | "credit" | "investment" | "cash",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Account</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-institution">Financial Institution</Label>
                <Input
                  id="edit-institution"
                  value={editingAccount.institution}
                  onChange={(e) =>
                    setEditingAccount({
                      ...editingAccount,
                      institution: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-number">Account Number</Label>
                <Input
                  id="edit-number"
                  value={editingAccount.number}
                  onChange={(e) =>
                    setEditingAccount({
                      ...editingAccount,
                      number: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-balance">Current Balance</Label>
                <Input
                  id="edit-balance"
                  value={editingAccount.balance}
                  onChange={(e) =>
                    setEditingAccount({
                      ...editingAccount,
                      balance: Number.parseFloat(e.target.value) || 0,
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
                    value={editingAccount.color}
                    onChange={(e) =>
                      setEditingAccount({
                        ...editingAccount,
                        color: e.target.value,
                      })
                    }
                  />
                  <Input
                    value={editingAccount.color}
                    onChange={(e) =>
                      setEditingAccount({
                        ...editingAccount,
                        color: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateAccount}>Update Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
