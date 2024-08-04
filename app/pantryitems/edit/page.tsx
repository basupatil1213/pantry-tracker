'use client';
import PantryItemInputForm from "@/components/Form/PantryItemInputForm";
import { useSearchParams } from "next/navigation";
import React from "react";

const EditPantryItem = () => {
    const searchParams = useSearchParams();
    const item = searchParams.get('item');
    console.log(`Item: ${item}`);
    

    const parsedItem = item ? JSON.parse(item) : undefined;

    console.log(`Parsed item: ${JSON.stringify(parsedItem)}`);
    

    return <PantryItemInputForm action="edit" item={parsedItem}/>;
};

export default EditPantryItem;