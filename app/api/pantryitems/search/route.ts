import PantryItem from "@/models/PantryItem";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

const searchPantryItems = async (req: Request) => {
    try {

        await dbConnect();

        const url = new URL(req.url);
        const query = url.searchParams.get("search");

        if(query === ""){
            const allItems = await PantryItem.find();
            return new NextResponse(JSON.stringify(
                {
                    message: "All pantry items",
                    items: allItems
                }
            ),
                {
                    status: 200
                }
            );
        }

        if (!query) {
            return new NextResponse(JSON.stringify(
                {
                    message: "Invalid query"
                }
            ),
                {
                    status: 400
                }
            );
        }

        console.log(`Searching for pantry items with query ${JSON.stringify(query)}`);

        const items = await PantryItem.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } }
            ]
        });

        return new NextResponse(JSON.stringify(
            {
                message: "Pantry items found",
                items
            }
        ),
            {
                status: 200
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
}

export { searchPantryItems as GET };