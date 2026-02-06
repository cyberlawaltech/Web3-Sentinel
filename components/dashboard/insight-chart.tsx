"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"

interface DataPoint {
  name: string
  value: number
  color?: string
}

export function InsightChart({ data, height = 140 }: { data: DataPoint[]; height?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">No data</div>
  }

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={Math.min(height / 2 - 8, 64)} innerRadius={Math.min(height / 4, 28)} paddingAngle={2}>
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color ?? undefined} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => `${value} (${((Number(value) / total) * 100).toFixed(1)}%)`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
