"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Housing", budget: 2500, actual: 2400 },
  { name: "Food", budget: 1000, actual: 1200 },
  { name: "Transport", budget: 700, actual: 800 },
  { name: "Entertain", budget: 500, actual: 600 },
  { name: "Utilities", budget: 500, actual: 500 },
  { name: "Others", budget: 300, actual: 400 },
]

export function BudgetComparisonChart() {
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
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={80} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "6px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            formatter={(value) => [`$${value}`, ""]}
          />
          <Legend />
          <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
          <Bar dataKey="actual" fill="#f43f5e" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
