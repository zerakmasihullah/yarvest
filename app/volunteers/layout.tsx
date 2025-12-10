"use client"

import DashboardLayout from "../dashboard/layout"

export default function VolunteersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
