"use client";
import DisplayItems from "@/components/Display/DisplayItems";
import SearchItems from "@/components/SearchItems/SearchItems";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PantryItemsPage = () => {
  const [items, setItems] = useState<any[]>([]);

  const handleDeleteItem = (itemId: string) => {
    setItems(items.filter(item => item._id !== itemId));
  };

  // const session = await getServerSession(authOptions);
  // const user = session?.user;

  // if (!user) {
  //   redirect('/sign-in');
  // }

  useEffect(() => {
  // const router = useRouter();
  //   const checkAuth = async () => {
  //     const isAuthenticated = useSession().status === "authenticated";
  //     if (!isAuthenticated) {
  //         router.push('/sign-in');
  //     }
  // };
  // checkAuth();
  }, []);

  return (
    <section className="w-full px-4 md:px-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Pantry Items</h1>
      <SearchItems setItems={setItems} />
      <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mt-8 mb-4">Items</h2>
      <DisplayItems items={items} onDeleteItem={handleDeleteItem} />
    </section>
  );
};

export default PantryItemsPage;