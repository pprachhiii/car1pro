import { Badge } from "@/components/ui/badge"

export function OrderStatusBadge({ status }: { status: string }) {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    pending: { variant: "secondary", label: "Pending" },
    processing: { variant: "default", label: "Processing" },
    shipped: { variant: "default", label: "Shipped" },
    delivered: { variant: "outline", label: "Delivered" },
    cancelled: { variant: "destructive", label: "Cancelled" },
  }

  const config = variants[status] || { variant: "secondary" as const, label: status }

  return <Badge variant={config.variant}>{config.label}</Badge>
}
