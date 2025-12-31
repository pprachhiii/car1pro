import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserRoleSelector } from "@/components/admin/user-role-selector"
import { Star } from "lucide-react"
import { notFound } from "next/navigation"

async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      orders: {
        select: {
          id: true,
          total: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          product: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!user) notFound()

  return user
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getUser(id)

  const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">User Details</h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Name</div>
              <div className="font-medium">{user.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{user.email}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Role</div>
              <UserRoleSelector userId={user.id} currentRole={user.role} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Member Since</div>
              <div className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Orders</span>
              <span className="text-lg font-bold">{user.orders.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Spent</span>
              <span className="text-lg font-bold">${totalSpent.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Reviews</span>
              <span className="text-lg font-bold">{user.reviews.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                  <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge>{order.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {user.reviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{review.product.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="font-medium">{review.rating}</span>
                    </div>
                  </div>
                  {review.comment && <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>}
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
