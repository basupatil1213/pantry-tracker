"use client";
import DisplayItems from "@/components/Display/DisplayItems";
import SearchItems from "@/components/SearchItems/SearchItems";
import React, { useState } from "react";

const PantryItemsPage = () => {
  const [items, setItems] = useState<any[]>([]);

  return (
    <section className="w-full px-4 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Pantry Items</h1>
      <SearchItems setItems={setItems} />
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mt-8 mb-4">Items</h2>
      <DisplayItems items={items} />
    </section>
  );
};

export default PantryItemsPage;