"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
interface FloatingItem {
  id: number;
  type: "patty" | "cheese" | "lettuce";
  x: number;
  y: number;
  rotation: number;
  scale: number;
  duration: number;
  delay: number;
  animation: "float" | "float2" | "float3";
}

// Helper function to check if two items overlap
const doItemsOverlap = (item1: FloatingItem, item2: FloatingItem) => {
  // Consider the size of the items (24x24) plus some padding
  const itemSize = 30; // 24px + 6px padding
  const distance = Math.sqrt(
    Math.pow(item1.x - item2.x, 2) + Math.pow(item1.y - item2.y, 2),
  );
  return distance < itemSize;
};

export const FloatingFood = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const generateItems = () => {
      const newItems: FloatingItem[] = [];
      const maxAttempts = 100; // Prevent infinite loop
      let attempts = 0;

      while (newItems.length < 20 && attempts < maxAttempts) {
        const newItem: FloatingItem = {
          id: newItems.length,
          type: ["patty", "cheese", "lettuce"][
            Math.floor(Math.random() * 3)
          ] as "patty" | "cheese" | "lettuce",
          x: Math.random() * 100,
          y: Math.random() * 100,
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
          duration: 15 + Math.random() * 10,
          delay: Math.random() * 5,
          animation: ["float", "float2", "float3"][
            Math.floor(Math.random() * 3)
          ] as "float" | "float2" | "float3",
        };

        // Check if the new item overlaps with any existing items
        const overlaps = newItems.some((item) => doItemsOverlap(item, newItem));

        if (!overlaps) {
          newItems.push(newItem);
        }

        attempts++;
      }

      return newItems;
    };

    setItems(generateItems());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute animate-${item.animation}`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: 0.2,
            filter: "blur(0.5px)",
          }}
        >
          {item.type === "patty" && (
            <Image
              src="/patty.png"
              alt="Patty"
              className="w-20 h-20 drop-shadow-xl"
              width={24}
              height={24}
            />
          )}
          {item.type === "cheese" && (
            <Image
              src="/cheese.svg"
              alt="Cheese"
              className="w-20 h-20 drop-shadow-xl"
              width={24}
              height={24}
            />
          )}
          {item.type === "lettuce" && (
            <Image
              src="/lettuce.svg"
              alt="Lettuce"
              className="w-20 h-20 drop-shadow-xl"
              width={24}
              height={24}
            />
          )}
        </div>
      ))}
    </div>
  );
};
