"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart,
  Leaf,
  Package,
  Users,
  Award,
  TrendingUp,
  Globe,
  Recycle
} from "lucide-react"

const impactStats = {
  totalImpact: 1245,
  deliveriesCompleted: 156,
  harvestsCompleted: 89,
  foodRescued: "2,450 lbs",
  co2Saved: "1,200 kg",
  peopleFed: 245,
  farmsHelped: 15,
}

const achievements = [
  {
    id: 1,
    title: "Food Hero",
    description: "Rescued 1,000+ lbs of food",
    icon: Leaf,
    earned: true,
    date: "2024-01-10",
  },
  {
    id: 2,
    title: "Community Champion",
    description: "Helped feed 100+ people",
    icon: Users,
    earned: true,
    date: "2024-01-08",
  },
  {
    id: 3,
    title: "Eco Warrior",
    description: "Saved 500+ kg of CO2",
    icon: Recycle,
    earned: true,
    date: "2024-01-05",
  },
  {
    id: 4,
    title: "Farm Friend",
    description: "Helped 10+ farms",
    icon: Award,
    earned: false,
  },
]

export default function ImpactPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Impact</h1>
        <p className="text-gray-600">See the difference you're making in your community</p>
      </div>

      {/* Main Impact Score */}
      <Card className="border-4 border-orange-500 bg-gradient-to-r from-orange-500 to-amber-500 shadow-2xl">
        <CardContent className="p-12 text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Heart className="w-16 h-16" />
            <div>
              <p className="text-3xl font-bold mb-2">Your Impact Score</p>
              <p className="text-orange-100 text-lg">Making a real difference!</p>
            </div>
          </div>
          <p className="text-8xl font-bold mb-4">{impactStats.totalImpact.toLocaleString()}</p>
          <p className="text-orange-100 text-xl">points earned through your volunteer work</p>
        </CardContent>
      </Card>

      {/* Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-2 border-orange-200 hover:shadow-lg transition-all bg-white">
          <CardContent className="p-4 text-center">
            <Package className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-1">Deliveries</p>
            <p className="text-2xl font-bold text-gray-900">{impactStats.deliveriesCompleted}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-emerald-200 hover:shadow-lg transition-all bg-white">
          <CardContent className="p-4 text-center">
            <Leaf className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-1">Harvests</p>
            <p className="text-2xl font-bold text-emerald-600">{impactStats.harvestsCompleted}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-200 hover:shadow-lg transition-all bg-white">
          <CardContent className="p-4 text-center">
            <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-1">Food Rescued</p>
            <p className="text-2xl font-bold text-green-600">{impactStats.foodRescued}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-blue-200 hover:shadow-lg transition-all bg-white">
          <CardContent className="p-4 text-center">
            <Recycle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-1">CO₂ Saved</p>
            <p className="text-2xl font-bold text-blue-600">{impactStats.co2Saved}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-purple-200 hover:shadow-lg transition-all bg-white">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-1">People Fed</p>
            <p className="text-2xl font-bold text-purple-600">{impactStats.peopleFed}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-yellow-200 hover:shadow-lg transition-all bg-white">
          <CardContent className="p-4 text-center">
            <Globe className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-1">Farms Helped</p>
            <p className="text-2xl font-bold text-yellow-600">{impactStats.farmsHelped}</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="border-2 border-orange-200 shadow-lg">
        <CardHeader className="border-b-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-600" />
            Impact Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-6 rounded-xl border-2 ${
                  achievement.earned
                    ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 shadow-lg"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                  achievement.earned ? "bg-yellow-100" : "bg-gray-200"
                }`}>
                  <achievement.icon className={`w-8 h-8 ${
                    achievement.earned ? "text-yellow-600" : "text-gray-400"
                  }`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                {achievement.earned ? (
                  <Badge className="bg-emerald-500 text-white w-full justify-center">
                    Earned {achievement.date}
                  </Badge>
                ) : (
                  <Badge className="bg-gray-400 text-white w-full justify-center">
                    Not earned yet
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Story */}
      <Card className="border-2 border-orange-200 shadow-lg bg-gradient-to-r from-orange-50 to-amber-50">
        <CardContent className="p-8">
          <div className="text-center">
            <Heart className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Making a Difference!</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              Through your {impactStats.deliveriesCompleted} deliveries and {impactStats.harvestsCompleted} harvests, 
              you've helped rescue {impactStats.foodRescued} of food, fed {impactStats.peopleFed} people, 
              and saved {impactStats.co2Saved} of CO₂ emissions. Your dedication to your community is truly inspiring!
            </p>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <span className="text-xl font-bold text-orange-600">Keep up the amazing work!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

