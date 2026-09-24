import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { ProductPiece } from "@/components/studio/ProductArt";
import { ProductInspector } from "@/components/studio/ProductInspector";
import { StudioFrame } from "@/components/studio/StudioFrame";
import { brand, byId, type Product } from "@/lib/studio";

const title = "Axle & Grain — Automotive Accessories & Car Care Studio";
const description =
  "Visit Axle & Grain, a premium Manchester shop for carefully chosen car-care products, interior protection, electronics and road-trip accessories.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

const windowProducts = [
  { product: byId("wash-bucket-kit"), x: 118, y: 332, scale: 0.72 },
  { product: byId("ceramic-sealant"), x: 230, y: 326, scale: 0.7 },
  { product: byId("wireless-mount"), x: 660, y: 330, scale: 0.7 },
  { product: byId("trunk-organizer"), x: 770, y: 332, scale: 0.72 },
].filter((item): item is { product: Product; x: number; y: number; scale: number } =>
  Boolean(item.product),
);

function Storefront() {
  const [selected, setSelected] = useState<Product | null>(null);
  const navigate = useNavigate();

  return (
    <StudioFrame room="outside the shop">
      <motion.div
        className="scene-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <svg viewBox="0 0 1000 620" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="streetSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--sky-dusk)" />
              <stop offset="100%" stopColor="var(--secondary)" />
            </linearGradient>
            <linearGradient id="shopGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--walnut-deep)" stopOpacity="0.92" />
              <stop offset="55%" stopColor="var(--walnut)" stopOpacity="0.72" />
              <stop offset="100%" stopColor="var(--sky-dusk)" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="pavement" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--floor)" />
              <stop offset="100%" stopColor="var(--floor-shade)" />
            </linearGradient>
            <filter id="windowShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="var(--walnut-deep)" floodOpacity="0.35" />
            </filter>
            <clipPath id="leftWindow"><rect x="70" y="242" width="335" height="225" rx="2" /></clipPath>
            <clipPath id="rightWindow"><rect x="595" y="242" width="335" height="225" rx="2" /></clipPath>
          </defs>

          {/* street and neighbouring masonry establish an exterior view */}
          <rect width="1000" height="620" fill="url(#streetSky)" />
          <rect y="108" width="1000" height="388" fill="var(--plaster)" />
          <g stroke="var(--border)" strokeWidth="1" opacity="0.45">
            {[132, 178, 224, 270, 316, 362, 408, 454].map((y) => <path key={y} d={`M0 ${y}h1000`} />)}
            {[28, 158, 288, 418, 548, 678, 808, 938].map((x, i) => (
              <path key={x} d={`M${x + (i % 2 ? 64 : 0)} 108v388`} />
            ))}
          </g>
          <rect y="496" width="1000" height="124" fill="url(#pavement)" />
          <path d="M0 520h1000M0 584h1000" stroke="var(--floor-shade)" strokeWidth="2" opacity="0.6" />
          {[70, 255, 450, 640, 825].map((x) => (
            <path key={x} d={`M${x} 496l-28 124`} stroke="var(--floor-shade)" opacity="0.55" />
          ))}

          {/* shop surround and fascia */}
          <rect x="43" y="120" width="914" height="388" rx="2" fill="var(--walnut-deep)" filter="url(#windowShadow)" />
          <rect x="55" y="132" width="890" height="92" fill="var(--walnut)" />
          <path d="M55 224h890" stroke="var(--brass)" strokeWidth="4" />
          <text x="500" y="178" textAnchor="middle" fill="var(--brass)" fontSize="35" fontFamily="var(--font-display)" letterSpacing="7">
            {brand.name}
          </text>
          <text x="500" y="204" textAnchor="middle" fill="var(--plaster)" opacity="0.76" fontSize="9" fontFamily="var(--font-sans)" letterSpacing="4">
            AUTOMOTIVE ACCESSORIES · CAR CARE · FITTING
          </text>

          {/* lit retail windows */}
          <rect x="70" y="242" width="335" height="225" rx="2" fill="url(#shopGlass)" />
          <rect x="595" y="242" width="335" height="225" rx="2" fill="url(#shopGlass)" />
          <g opacity="0.4" stroke="var(--brass)" strokeWidth="2">
            <path d="M80 245h315M605 245h315" />
            <path d="M82 401h311M607 401h311" />
          </g>
          <g fill="var(--plaster)" opacity="0.92">
            <path d="M92 413h286l-12 54H104z" />
            <path d="M617 413h286l-12 54H629z" />
          </g>
          <g fill="var(--brass)" opacity="0.75">
            <ellipse cx="238" cy="276" rx="92" ry="34" />
            <ellipse cx="762" cy="276" rx="92" ry="34" />
          </g>

          {windowProducts.map(({ product, x, y, scale }, index) => (
            <motion.g
              key={product.id}
              role="button"
              tabIndex={0}
              aria-label={`View ${product.name}`}
              className="cursor-pointer"
              onClick={() => setSelected(product)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") setSelected(product);
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.08 }}
              whileHover={{ y: -5 }}
            >
              <rect x={x - 8} y={y - 8} width="88" height="93" fill="transparent" />
              <g transform={`translate(${x} ${y})`}>
                <ProductPiece product={product} scale={scale} />
              </g>
            </motion.g>
          ))}

          {/* glazing bars, reflections and real shop details */}
          <g fill="var(--walnut)">
            <rect x="66" y="238" width="8" height="237" />
            <rect x="401" y="238" width="8" height="237" />
            <rect x="591" y="238" width="8" height="237" />
            <rect x="926" y="238" width="8" height="237" />
          </g>
          <g fill="var(--plaster)" opacity="0.16">
            <path d="M88 244h66L82 465H74z" clipPath="url(#leftWindow)" />
            <path d="M180 244h28l-70 221h-28z" clipPath="url(#leftWindow)" />
            <path d="M612 244h66l-72 221h-8z" clipPath="url(#rightWindow)" />
            <path d="M704 244h28l-70 221h-28z" clipPath="url(#rightWindow)" />
          </g>

          {/* central entrance */}
          <motion.g
            role="button"
            tabIndex={0}
            aria-label="Please come in and browse the shop"
            className="cursor-pointer"
            onClick={() => navigate({ to: "/shop" })}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") navigate({ to: "/shop" });
            }}
            whileHover={{ scale: 1.008 }}
            style={{ transformOrigin: "500px 360px" }}
          >
            <rect x="429" y="239" width="142" height="269" rx="2" fill="var(--walnut)" />
            <rect x="440" y="250" width="120" height="203" rx="1" fill="url(#shopGlass)" stroke="var(--brass)" strokeWidth="2" />
            <path d="M448 259h104L478 445h-30z" fill="var(--plaster)" opacity="0.12" />
            <rect x="458" y="326" width="84" height="42" rx="2" fill="var(--plaster)" />
            <text x="500" y="343" textAnchor="middle" fill="var(--walnut)" fontSize="8" fontFamily="var(--font-sans)" letterSpacing="2">
              PLEASE COME IN
            </text>
            <text x="500" y="358" textAnchor="middle" fill="var(--clay)" fontSize="6.5" fontFamily="var(--font-sans)" letterSpacing="1.3">
              OPEN · BROWSE INSIDE
            </text>
            <circle cx="546" cy="387" r="5" fill="var(--brass)" />
            <rect x="444" y="464" width="112" height="30" fill="var(--walnut-deep)" />
            <text x="500" y="483" textAnchor="middle" fill="var(--brass)" fontSize="7" fontFamily="var(--font-sans)" letterSpacing="2">
              EST. MANCHESTER
            </text>
          </motion.g>

          <g fontFamily="var(--font-sans)" fontSize="7" letterSpacing="1.6" fill="var(--brass)">
            <text x="237" y="454" textAnchor="middle">DETAILING · PROTECTION</text>
            <text x="762" y="454" textAnchor="middle">TECH · STORAGE · TRAVEL</text>
          </g>
          <rect x="32" y="486" width="936" height="14" fill="var(--walnut)" />
          <rect x="418" y="500" width="164" height="12" rx="1" fill="var(--cloth-ink)" opacity="0.7" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="absolute right-4 bottom-14 z-20 flex max-w-[calc(100vw-2rem)] items-center gap-2 sm:right-6"
      >
        <Link
          to="/services"
          className="plaque rounded-sm border border-brass/60 bg-walnut-deep/90 px-3 py-2 text-plaster backdrop-blur hover:bg-walnut"
        >
          View services
        </Link>
        <Link
          to="/shop"
          className="plaque rounded-sm bg-brass px-3 py-2 text-walnut-deep shadow-lg hover:bg-accent"
        >
          Enter shop
        </Link>
      </motion.div>

      <p className="plaque pointer-events-none absolute bottom-3 right-4 z-20 hidden text-brass/80 sm:block">
        Window display · select an item to inspect
      </p>

      <ProductInspector product={selected} onClose={() => setSelected(null)} />
    </StudioFrame>
  );
}