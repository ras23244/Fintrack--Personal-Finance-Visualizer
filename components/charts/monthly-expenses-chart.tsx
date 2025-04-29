"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
  { name: "Jul", income: 3490, expenses: 4300 },
  { name: "Aug", income: 4000, expenses: 2400 },
  { name: "Sep", income: 3000, expenses: 1398 },
  { name: "Oct", income: 2000, expenses: 9800 },
  { name: "Nov", income: 2780, expenses: 3908 },
  { name: "Dec", income: 1890, expenses: 4800 },
]

export function MonthlyExpensesChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "6px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
