"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: Props) {
  const [activeImage, setActiveImage] = useState<string>(images[0] || "");

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* IMAGEN PRINCIPAL (Double-Bezel) */}
      <div className="p-2 rounded-[2.5rem] bg-black/[0.02] border border-black/10">
        <div className="relative aspect-[4/5] w-full rounded-[calc(2.5rem-0.5rem)] overflow-hidden bg-[#F2EDE6] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
          <Image
            src={activeImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-opacity duration-500 ease-in-out"
          />
        </div>
      </div>

      {/* MINIATURAS */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => {
            const isSelected = activeImage === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                  isSelected
                    ? "border-[#0A0A0A] scale-105 shadow-sm"
                    : "border-black/10 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} vista ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
