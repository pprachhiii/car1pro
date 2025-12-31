"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Trash2, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: string
  rating: number
  comment: string | null
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
  product: {
    id: string
    name: string
    image: string
  }
}

export default function ReviewsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews")
      const data = await res.json()
      setReviews(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return

    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" })

      if (!res.ok) throw new Error("Failed to delete review")

      toast({
        title: "Review deleted",
        description: "Successfully deleted the review",
      })

      fetchReviews()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Reviews</h1>
        <p className="text-muted-foreground">Moderate customer reviews</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={review.product.image || "/placeholder.svg"}
                      alt={review.product.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                    <span className="font-medium">{review.product.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{review.user.name}</div>
                    <div className="text-sm text-muted-foreground">{review.user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="font-medium">{review.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{review.comment || "-"}</TableCell>
                <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(review.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
