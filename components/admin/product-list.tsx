"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductForm } from "./product-form"
import { Edit, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Product } from "@/lib/types"

export function ProductList({ products: initialProducts }: { products: Product[] }) {
  const router = useRouter()
  const { toast } = useToast()
  const [products] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to deactivate "${name}"?`)) return

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" })

      if (!res.ok) throw new Error("Failed to delete product")

      toast({
        title: "Product deactivated",
        description: `Successfully deactivated ${name}`,
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deactivate product",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Create a new product for your store</DialogDescription>
            </DialogHeader>
            <ProductForm
              onSuccess={() => {
                setIsAddDialogOpen(false)
                router.refresh()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={product.stock < 5 ? "destructive" : "secondary"}>{product.stock}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {product.featured && <Badge variant="default">Featured</Badge>}
                    {!product.isActive && <Badge variant="outline">Inactive</Badge>}
                    {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog
                      open={isEditDialogOpen && editingProduct?.id === product.id}
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open)
                        if (!open) setEditingProduct(null)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                          <DialogDescription>Update product information</DialogDescription>
                        </DialogHeader>
                        <ProductForm
                          product={editingProduct}
                          onSuccess={() => {
                            setIsEditDialogOpen(false)
                            setEditingProduct(null)
                            router.refresh()
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id, product.name)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
