import PantryItem from "@/models/PantryItem";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

const createPantryItem = async (req: Request) => {
    try {

        await dbConnect();

        const body = await req.json();

        if (!body) {
            return new NextResponse(JSON.stringify(
                {
                    message: "Invalid request body"
                }
            ),
                {
                    status: 400
                }
            );
        }

        console.log(`Creating new pantry item with ${JSON.stringify(body)}`);
        
        const pantryItem = new PantryItem(body);

        const newItem = await pantryItem.save();

        if (!newItem) {
            return new NextResponse(JSON.stringify(
                {
                    message: "Failed to create new pantry item"
                }
            ),
                {
                    status: 500
                }
            );
        }

        return new NextResponse(JSON.stringify(
            {
                message: "Pantry item created successfully",
                item: newItem
            }
        ),
            {
                status: 201
            }
        );

    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify(
            {
                message: "Internal server error"
            }
        ),
            {
                status: 500
            }
        );
    }
};

export { createPantryItem as POST };