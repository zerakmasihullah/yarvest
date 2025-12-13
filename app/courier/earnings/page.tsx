"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign,
  TrendingUp,
  Download,
  ArrowUpRight
} from "lucide-react"
import { useState } from "react"

const mockEarnings = [
  { date: "2024-01-15", deliveries: 8, basePay: 80.50, tips: 15.00, total: 95.50, hours: 8.5 },
  { date: "2024-01-14", deliveries: 12, basePay: 114.00, tips: 28.00, total: 142.00, hours: 10.0 },
  { date: "2024-01-13", deliveries: 10, basePay: 96.25, tips: 22.50, total: 118.75, hours: 9.0 },
  { date: "2024-01-12", deliveries: 6, basePay: 60.00, tips: 12.00, total: 72.00, hours: 6.5 },
  { date: "2024-01-11", deliveries: 9, basePay: 87.75, tips: 18.00, total: 105.75, hours: 8.0 },
  { date: "2024-01-10", deliveries: 11, basePay: 104.50, tips: 25.00, total: 129.50, hours: 9.5 },
]

export default function EarningsPage() {
  const [timeFilter, setTimeFilter] = useState("week")

  const totalEarnings = mockEarnings.reduce((sum, day) => sum + day.total, 0)
  const totalBasePay = mockEarnings.reduce((sum, day) => sum + day.basePay, 0)
  const totalTips = mockEarnings.reduce((sum, day) => sum + day.tips, 0)
  const totalDeliveries = mockEarnings.reduce((sum, day) => sum + day.deliveries, 0)
  const totalHours = mockEarnings.reduce((sum, day) => sum + day.hours, 0)
  const averagePerDelivery = totalEarnings / totalDeliveries
  const hourlyRate = totalEarnings / totalHours

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Earnings</h1>
          <p className="text-gray-600">Track your delivery earnings and performance</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a]"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 hover:shadow-xl transition-all bg-gradient-to-br from-emerald-50 to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-100">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
            <p className="text-3xl font-bold text-gray-900">${totalEarnings.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">+12% from last week</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Base Pay</p>
            <p className="text-3xl font-bold text-gray-900">${totalBasePay.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">{totalDeliveries} deliveries</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Tips</p>
            <p className="text-3xl font-bold text-gray-900">${totalTips.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">${(totalTips / totalDeliveries).toFixed(2)} avg per delivery</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
            <p className="text-3xl font-bold text-gray-900">${hourlyRate.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">{totalHours.toFixed(1)} hours worked</p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Breakdown */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle>Daily Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Deliveries</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Hours</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Base Pay</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Tips</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Total</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Hourly Rate</th>
                </tr>
              </thead>
              <tbody>
                {mockEarnings.map((day, index) => {
                  const dayRate = day.total / day.hours
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className="bg-blue-100 text-blue-800">{day.deliveries}</Badge>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{day.hours}h</td>
                      <td className="py-4 px-6 font-semibold text-gray-900">${day.basePay.toFixed(2)}</td>
                      <td className="py-4 px-6 font-semibold text-emerald-600">+${day.tips.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-[#5a9c3a] text-lg">${day.total.toFixed(2)}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-gray-900">${dayRate.toFixed(2)}/hr</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="py-4 px-6 font-bold text-gray-900">Total</td>
                  <td className="py-4 px-6">
                    <Badge className="bg-[#5a9c3a] text-white">{totalDeliveries}</Badge>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900">{totalHours.toFixed(1)}h</td>
                  <td className="py-4 px-6 font-bold text-gray-900">${totalBasePay.toFixed(2)}</td>
                  <td className="py-4 px-6 font-bold text-emerald-600">+${totalTips.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-[#5a9c3a] text-xl">${totalEarnings.toFixed(2)}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-900">${hourlyRate.toFixed(2)}/hr</p>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Average per Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#5a9c3a]">${averagePerDelivery.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2">Based on {totalDeliveries} deliveries</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Deliveries per Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{(totalDeliveries / totalHours).toFixed(1)}</p>
            <p className="text-sm text-gray-500 mt-2">Average delivery rate</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Tip Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{((totalTips / totalEarnings) * 100).toFixed(1)}%</p>
            <p className="text-sm text-gray-500 mt-2">Of total earnings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

