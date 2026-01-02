"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ProductFormProps {
  product?: any
  onSuccess?: () => void
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    longDescription: product?.longDescription || "",
    features: product?.features?.join("\n") || "",

    price: product?.price || "",
    category: product?.category || "",
    brand: product?.brand || "",
    model: product?.model || "",
    year: product?.year || "",
    stock: product?.stock || "",
    image: product?.image || "",

    featured: product?.featured || false,
    inStock: product?.inStock ?? true,
    isActive: product?.isActive ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        year: formData.year ? Number(formData.year) : null,
        features: formData.features
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
      }

      const url = product
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products"

      const method = product ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to save product")

      toast({
        title: product ? "Product updated" : "Product created",
        description: `Successfully saved ${formData.name}`,
      })

      router.refresh()
      onSuccess?.()
    } catch {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Product Name *</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>
          </div>

          {/* Short description */}
          <div className="space-y-2">
            <Label>Short Description *</Label>
            <Textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Long description */}
          <div className="space-y-2">
            <Label>Detailed Description</Label>
            <Textarea
              rows={6}
              placeholder="Appears on the product detail page"
              value={formData.longDescription}
              onChange={(e) =>
                setFormData({ ...formData, longDescription: e.target.value })
              }
            />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label>Key Features</Label>
            <Textarea
              rows={5}
              placeholder={`One feature per line\n• pH-balanced formula\n• Scratch-free wash`}
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              These will appear as bullet points on the product page
            </p>
          </div>

          {/* Pricing */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Price *</Label>
              <Input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Stock *</Label>
              <Input
                type="number"
                required
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
              />
            </div>
          </div>

          {/* Meta */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Brand</Label>
              <Input
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Model</Label>
              <Input
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Image URL *</Label>
            <Input
              type="url"
              required
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <Label>Featured Product</Label>
              <Switch
                checked={formData.featured}
                onCheckedChange={(v) =>
                  setFormData({ ...formData, featured: v })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>In Stock</Label>
              <Switch
                checked={formData.inStock}
                onCheckedChange={(v) =>
                  setFormData({ ...formData, inStock: v })
                }
              />
            </div>

            {product && (
              <div className="flex items-center justify-between">
                <Label>Active</Label>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(v) =>
                    setFormData({ ...formData, isActive: v })
                  }
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : product ? "Update Product" : "Create Product"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
