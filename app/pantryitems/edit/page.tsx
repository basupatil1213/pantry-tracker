'use client';
import PantryItemInputForm from "@/components/Form/PantryItemInputForm";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const EditPantryItemContent = () => {
    const searchParams = useSearchParams();
    const item = searchParams.get('item');
    console.log(`Item: ${item}`);

    const parsedItem = item ? JSON.parse(item) : undefined;

    console.log(`Parsed item: ${JSON.stringify(parsedItem)}`);

    return <PantryItemInputForm action="edit" item={parsedItem}/>;
};

const EditPantryItem = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPantryItemContent />
        </Suspense>
    );
};

export default EditPantryItem;