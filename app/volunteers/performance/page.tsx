"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp,
  TrendingDown,
  Award,
  Clock,
  Target,
  Zap,
  CheckCircle,
  XCircle,
  Calendar,
  Star
} from "lucide-react"

const performanceMetrics = [
  {
    title: "On-Time Delivery Rate",
    value: "96.5%",
    change: "+2.3%",
    trend: "up",
    target: "95%",
    status: "exceeded",
  },
  {
    title: "Average Delivery Time",
    value: "28 min",
    change: "-3 min",
    trend: "up",
    target: "30 min",
    status: "exceeded",
  },
  {
    title: "Customer Rating",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    target: "4.5",
    status: "exceeded",
  },
  {
    title: "Completion Rate",
    value: "98.2%",
    change: "+1.1%",
    trend: "up",
    target: "95%",
    status: "exceeded",
  },
]

const achievements = [
  { id: 1, title: "Speed Demon", description: "Complete 10 deliveries in under 30 minutes", icon: Zap, earned: true, date: "2024-01-10" },
  { id: 2, title: "Perfect Week", description: "100% on-time delivery for a week", icon: Award, earned: true, date: "2024-01-08" },
  { id: 3, title: "Customer Favorite", description: "50 five-star reviews", icon: Star, earned: true, date: "2024-01-05" },
  { id: 4, title: "Distance Master", description: "Complete 100 deliveries", icon: Target, earned: false },
]

const weeklyStats = [
  { day: "Mon", deliveries: 8, earnings: 95.50, rating: 4.9 },
  { day: "Tue", deliveries: 12, earnings: 142.00, rating: 4.8 },
  { day: "Wed", deliveries: 10, earnings: 118.75, rating: 5.0 },
  { day: "Thu", deliveries: 9, earnings: 105.25, rating: 4.7 },
  { day: "Fri", deliveries: 11, earnings: 132.50, rating: 4.9 },
  { day: "Sat", deliveries: 15, earnings: 178.00, rating: 4.8 },
  { day: "Sun", deliveries: 7, earnings: 84.25, rating: 4.9 },
]

export default function PerformancePage() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Performance & Analytics</h1>
        <p className="text-gray-600">Track your delivery performance and achievements</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.title} className="border-2 hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  metric.status === "exceeded" ? "bg-emerald-100" : "bg-blue-100"
                }`}>
                  {metric.trend === "up" ? (
                    <TrendingUp className={`w-6 h-6 ${metric.status === "exceeded" ? "text-emerald-600" : "text-blue-600"}`} />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <Badge className={
                  metric.status === "exceeded" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
                }>
                  {metric.status === "exceeded" ? "Exceeded" : "On Track"}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
              <div className="flex items-center justify-between">
                <p className={`text-sm font-semibold ${
                  metric.trend === "up" ? "text-emerald-600" : "text-red-600"
                }`}>
                  {metric.change} from last week
                </p>
                <p className="text-xs text-gray-500">Target: {metric.target}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Achievements & Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 ${
                  achievement.earned
                    ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                  achievement.earned ? "bg-yellow-100" : "bg-gray-200"
                }`}>
                  <achievement.icon className={`w-6 h-6 ${
                    achievement.earned ? "text-yellow-600" : "text-gray-400"
                  }`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                {achievement.earned ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-emerald-600 font-semibold">Earned {achievement.date}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-400">Not earned yet</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Performance */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle>Weekly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Day</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Deliveries</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Earnings</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Rating</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {weeklyStats.map((day, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-semibold text-gray-900">{day.day}</td>
                    <td className="py-4 px-6">
                      <Badge className="bg-blue-100 text-blue-800">{day.deliveries}</Badge>
                    </td>
                    <td className="py-4 px-6 font-semibold text-emerald-600">${day.earnings.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{day.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className="bg-emerald-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Excellent
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

