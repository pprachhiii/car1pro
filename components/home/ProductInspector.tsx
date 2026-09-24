import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  features: string[];
  price: number;
  image: string;
  category: string;
  brand?: string;
  model?: string;
  year?: number;
  featured: boolean;
  isActive: boolean;
  inStock: boolean;
  stock: number;
}

interface ProductInspectorProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductInspector({
  product,
  onClose,
}: ProductInspectorProps) {
  const [qty, setQty] = useState(1);
  const [taken, setTaken] = useState(false);
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    if (!product) return;

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product.id,
          quantity: qty,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      setTaken(true);
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        setQty(1);
        setTaken(false);
      }}
    >
      {product && (
        <motion.aside
          key={product.id}
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.96,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            inset-x-3
            bottom-3
            z-40
            max-h-[72dvh]
            overflow-auto
            rounded-sm
            border
            border-[var(--brass)]/40
            bg-card/95
            p-4
            shadow-2xl
            backdrop-blur
            sm:inset-x-auto
            sm:right-6
            sm:bottom-6
            sm:w-[26rem]
            sm:p-5
          "
        >
          {/* PRODUCT */}
          <div className="flex gap-4">
            <motion.div
              initial={{
                rotate: -6,
                y: -10,
              }}
              animate={{
                rotate: 0,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 14,
              }}
              className="
                h-24
                w-24
                shrink-0
                overflow-hidden
                rounded-sm
                border
                border-border
                bg-[var(--plaster)]
                p-1
              "
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <div className="min-w-0">
              <p className="plaque text-muted-foreground">
                {product.category}
              </p>

              <h2
                className="
                  mt-1
                  font-[family-name:var(--font-display)]
                  text-xl
                  leading-tight
                "
              >
                {product.name}
              </h2>

              <p className="mt-1 text-lg text-[var(--clay)]">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {product.longDescription || product.description}
          </p>

          {/* PRODUCT INFO */}
          <div className="mt-2 space-y-1">
            {product.brand && (
              <p className="plaque text-[var(--walnut)]">
                Brand: {product.brand}
              </p>
            )}

            {product.model && (
              <p className="plaque text-[var(--walnut)]">
                Model: {product.model}
              </p>
            )}

            {product.year && (
              <p className="plaque text-[var(--walnut)]">
                Year: {product.year}
              </p>
            )}

            <p className="plaque text-[var(--walnut)]">
              {product.inStock
                ? `In stock: ${product.stock}`
                : "Out of stock"}
            </p>
          </div>

          {/* FEATURES */}
          {product.features?.length > 0 && (
            <div className="mt-3">
              <p className="plaque mb-1 text-muted-foreground">
                Features
              </p>

              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground"
                  >
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* QUANTITY + CART */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center rounded-sm border border-border">
              <button
                onClick={() =>
                  setQty((q) => Math.max(1, q - 1))
                }
                aria-label="One fewer"
                className="
                  px-3
                  py-1.5
                  text-lg
                  leading-none
                  text-muted-foreground
                  hover:text-foreground
                "
              >
                −
              </button>

              <span className="w-8 text-center text-sm">
                {qty}
              </span>

              <button
                onClick={() =>
                  setQty((q) =>
                    Math.min(product.stock || 20, q + 1)
                  )
                }
                aria-label="One more"
                className="
                  px-3
                  py-1.5
                  text-lg
                  leading-none
                  text-muted-foreground
                  hover:text-foreground
                "
              >
                +
              </button>
            </div>

            <button
              onClick={addToCart}
              disabled={!product.inStock || loading}
              className="
                plaque
                flex-1
                rounded-sm
                bg-[var(--walnut)]
                px-4
                py-2.5
                text-[var(--plaster)]
                transition-colors
                hover:bg-[var(--walnut-deep)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {!product.inStock
                ? "Out of stock"
                : loading
                  ? "Adding..."
                  : taken
                    ? "In your trolley"
                    : "Put it in the trolley"}
            </button>
          </div>

          {/* LINKS */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <button
              onClick={onClose}
              className="
                plaque
                ml-auto
                text-muted-foreground
                underline-offset-4
                hover:underline
              "
            >
              Set it back down
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}