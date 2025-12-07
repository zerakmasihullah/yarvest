"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  AlertCircle
} from "lucide-react"
import { useState } from "react"

const mockDocuments = [
  {
    id: 1,
    name: "Driver's License",
    type: "license",
    status: "verified",
    expiryDate: "2025-12-31",
    uploadedDate: "2024-01-01",
    file: "license.pdf",
  },
  {
    id: 2,
    name: "Vehicle Registration",
    type: "registration",
    status: "verified",
    expiryDate: "2024-06-30",
    uploadedDate: "2024-01-01",
    file: "registration.pdf",
  },
  {
    id: 3,
    name: "Insurance Certificate",
    type: "insurance",
    status: "pending",
    expiryDate: "2024-03-31",
    uploadedDate: "2024-01-10",
    file: "insurance.pdf",
  },
  {
    id: 4,
    name: "Background Check",
    type: "background",
    status: "verified",
    expiryDate: null,
    uploadedDate: "2024-01-01",
    file: "background.pdf",
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-emerald-500 text-white"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 text-white"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-500 text-white"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>
    }
  }

  const getExpiryWarning = (expiryDate: string | null) => {
    if (!expiryDate) return null
    const expiry = new Date(expiryDate)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 30) {
      return <Badge className="bg-red-500 text-white">Expires in {daysUntilExpiry} days</Badge>
    } else if (daysUntilExpiry < 60) {
      return <Badge className="bg-yellow-500 text-white">Expires in {daysUntilExpiry} days</Badge>
    }
    return null
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Documents</h1>
          <p className="text-gray-600">Manage your required documents and certifications</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white gap-2 shadow-lg">
          <Upload className="w-5 h-5" />
          Upload Document
        </Button>
      </div>

      {/* Important Notice */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">Document Requirements</h3>
              <p className="text-sm text-gray-700 mb-3">
                All documents must be valid and up-to-date to continue delivering. Please ensure your documents are verified before they expire.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-gray-700">3 documents verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="text-gray-700">1 pending review</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="border-2 hover:shadow-xl transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{doc.name}</CardTitle>
                    <p className="text-xs text-gray-500 mt-1">Uploaded: {doc.uploadedDate}</p>
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {doc.expiryDate && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Expiry Date</p>
                    <p className="font-semibold text-gray-900">{new Date(doc.expiryDate).toLocaleDateString()}</p>
                  </div>
                  {getExpiryWarning(doc.expiryDate)}
                </div>
              )}
              
              {doc.status === "rejected" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-red-900">Document Rejected</p>
                      <p className="text-xs text-red-700">Please upload a clearer copy or updated document.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-2">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1 border-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Replace
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Required Documents Info */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle>Required Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Driver's License</p>
                <p className="text-sm text-gray-600">Valid driver's license required. Must be clear and readable.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Vehicle Registration</p>
                <p className="text-sm text-gray-600">Current vehicle registration for your delivery vehicle.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Insurance Certificate</p>
                <p className="text-sm text-gray-600">Proof of vehicle insurance coverage.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Background Check</p>
                <p className="text-sm text-gray-600">Completed background verification.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

