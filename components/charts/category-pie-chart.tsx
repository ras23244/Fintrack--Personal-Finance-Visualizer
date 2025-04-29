"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Housing", value: 2500 },
  { name: "Food", value: 1200 },
  { name: "Transportation", value: 800 },
  { name: "Entertainment", value: 600 },
  { name: "Utilities", value: 500 },
  { name: "Others", value: 400 },
]

const COLORS = ["#10b981", "#3b82f6", "#f43f5e", "#f59e0b", "#8b5cf6", "#64748b"]

export function CategoryPieChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "6px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            formatter={(value) => [`$${value}`, "Amount"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
