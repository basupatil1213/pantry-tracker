'use client';
import PantryItemInputForm from "@/components/Form/PantryItemInputForm";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const EditPantryItemContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [parsedItem, setParsedItem] = useState(undefined);

    useEffect(() => {
        const item = searchParams.get('item');
        if (item) {
            console.log(`Item: ${item}`);
        } else {
            console.error('No item data found in URL parameters');
            // Optionally, handle the case when no item data is present
            // For example, redirect to an error page or the items list
            // router.push('/pantryitems');
        }
        
        if (item) {
            try {
                const parsed = JSON.parse(item);
                setParsedItem(parsed);
                console.log(`Parsed item: ${JSON.stringify(parsed)}`);
            } catch (error) {
                console.error("Error parsing item:", error);
            }
        }

        // // Check authentication status (replace with your actual auth check)
        // const checkAuth = async () => {
        //     const isAuthenticated = useSession().status === "authenticated";
        //     if (!isAuthenticated) {
        //         router.push('/sign-in');
        //     }
        // };
        // checkAuth();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white p-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Pantry Item</h1>
                <PantryItemInputForm action="edit" item={parsedItem}/>
            </div>
        </div>
    );
};

const EditPantryItem = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">Loading...</div>}>
            <EditPantryItemContent />
        </Suspense>
    );
};

export default EditPantryItem;