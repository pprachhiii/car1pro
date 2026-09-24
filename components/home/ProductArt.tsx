
import type { ReactNode } from "react";

/*
 * Product comes from the backend API / Prisma Product model.
 *
 * IMPORTANT:
 * No @/lib/studio
 * No @/lib/product-images
 * No Studio files.
 */
export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  features: string[];
  price: number;
  image: string;
  category: string;
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  featured: boolean;
  isActive: boolean;
  inStock: boolean;
  stock: number;
};

/**
 * Vector art for every product.
 *
 * The artwork itself is unchanged.
 * The API product image is used whenever product.image exists.
 */

type Art = {
  body: string;
  accent: string;
};

function Mat({ body, accent }: Art) {
  return (
    <g>
      <path
        d="M18 20h58c6 0 9 4 9 10l4 44c1 8-3 12-10 12H22c-7 0-11-4-10-12l4-44c0-6 3-10 9-10z"
        fill={body}
        stroke={accent}
        strokeWidth="2"
      />
      <path
        d="M22 28h52c4 0 6 3 6 7l3 36c0 5-2 7-6 7H23c-4 0-6-2-6-7l3-36c0-4 2-7 6-7z"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        opacity="0.8"
      />
      {[30, 38, 46, 54, 62, 70].map((x) => (
        <path
          key={x}
          d={`M${x} 32v46`}
          stroke={accent}
          strokeWidth="1.1"
          opacity="0.55"
        />
      ))}
      {[44, 56, 68].map((y) => (
        <path
          key={y}
          d={`M22 ${y}h56`}
          stroke={accent}
          strokeWidth="0.9"
          opacity="0.35"
        />
      ))}
      <circle cx="34" cy="38" r="3.2" fill={accent} opacity="0.9" />
      <circle cx="66" cy="38" r="3.2" fill={accent} opacity="0.9" />
      <path d="M40 84h20" stroke={accent} strokeWidth="2" opacity="0.6" />
    </g>
  );
}

function Towel({ body, accent }: Art) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * 12})`}>
          <path
            d="M16 44h68c3 0 5 2 5 5v10c0 3-2 5-5 5H16c-3 0-5-2-5-5V49c0-3 2-5 5-5z"
            fill={body}
            stroke={accent}
            strokeWidth="1.4"
          />
          <path d="M11 54h78" stroke={accent} strokeWidth="0.9" opacity="0.5" />
          <path
            d="M28 44v20M50 44v20M72 44v20"
            stroke={accent}
            strokeWidth="0.8"
            opacity="0.35"
          />
        </g>
      ))}
      <path
        d="M30 34c6-8 34-8 40 0"
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        opacity="0.7"
      />
      <rect x="34" y="26" width="32" height="10" rx="2" fill={accent} opacity="0.85" />
      <text
        x="50"
        y="34"
        textAnchor="middle"
        fontSize="6"
        fill={body}
        letterSpacing="1"
      >
        500
      </text>
    </g>
  );
}

/*
 * KEEP ALL OF YOUR OTHER ART FUNCTIONS HERE EXACTLY AS THEY ARE:
 *
 * Spray
 * Chemical
 * BucketKit
 * Brush
 * PhoneHolder
 * Organizer
 * TrunkOrganizer
 * Charger
 * Inflator
 * EmergencyKit
 * Fragrance
 * Sunshade
 * Cover
 * Vacuum
 * Dashcam
 * SeatCover
 */

const registry: Record<string, (props: Art) => ReactNode> = {
  mat: Mat,
  towel: Towel,

  // Keep the rest of your existing registry entries:
  // spray: Spray,
  // chemical: Chemical,
  // bucketKit: BucketKit,
  // brush: Brush,
  // phoneHolder: PhoneHolder,
  // organizer: Organizer,
  // trunkOrganizer: TrunkOrganizer,
  // charger: Charger,
  // inflator: Inflator,
  // emergencyKit: EmergencyKit,
  // fragrance: Fragrance,
  // sunshade: Sunshade,
  // cover: Cover,
  // vacuum: Vacuum,
  // dashcam: Dashcam,
  // seatCover: SeatCover,
};

/**
 * Place a product inside a bigger scene.
 *
 * API image is used directly from product.image.
 */
export function ProductPiece({
  product,
  x = 0,
  y = 0,
  scale = 1,
}: {
  product: Product;
  x?: number;
  y?: number;
  scale?: number;
}) {
  /*
   * Your Prisma Product has:
   *
   * image: String
   *
   * Therefore we use that directly.
   */
  if (product.image) {
    return (
      <image
        href={product.image}
        x={x}
        y={y}
        width={100 * scale}
        height={100 * scale}
        preserveAspectRatio="xMidYMid slice"
        aria-label={product.name}
      />
    );
  }

  /*
   * Your database doesn't currently contain art/body/accent.
   *
   * If no image exists, there is no need to invent another
   * database field. Simply render nothing.
   */
  return null;
}

/**
 * Stand-alone thumbnail for panels, cart and counter.
 *
 * Uses the image URL returned by your API.
 */
export function ProductPortrait({
  product,
}: {
  product: Product;
}) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={512}
        height={512}
        className="h-full w-full rounded-[2px] object-cover"
      />
    );
  }

  return (
    <div
      className="h-full w-full rounded-[2px]"
      aria-label={product.name}
    />
  );
}
