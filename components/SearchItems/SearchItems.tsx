'use client';
import UseDebounce from "@/hooks/UseDebounce";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { FaSearch } from 'react-icons/fa';

type SearchItemsProps = {
    setItems: (items: PantryItem[]) => void;
};

const SearchItems = ({setItems} : SearchItemsProps) => {
	const [search, setSearch] = React.useState<string>("");
    const debouncedSearch = UseDebounce(search);

    const searchItems = async (searchValue: string) => {
		try {
			const resp = await fetch(
				`http://localhost:3000/api/pantryitems/search?search=${searchValue}`
			);
			if (!resp.ok) {
				throw new Error(`HTTP error! status: ${resp.status}`);
			}
			const data = await resp.json();
            console.log(`Search results for ${searchValue}:`, data.items);
			setItems(data.items || []);
		} catch (error) {
			console.error("Failed to search for items:", error);
			toast.error("Failed to search for items");
			setItems([]);
		}
	};

	useEffect(() => {
		searchItems("");
	}, []);

	useEffect(() => {
		if (debouncedSearch.trim() !== "") {
			console.log(`Searching for ${debouncedSearch}`);
			searchItems(debouncedSearch);
		} else {
			searchItems(debouncedSearch);
		}
	}, [debouncedSearch]);

	return (
		<section className="w-full max-w-2xl mx-auto px-4 md:px-6 py-4">
			<div className="relative">
				<input
					type="search"
					placeholder="Search for items (e.g., Milk)"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full p-4 pl-12 text-lg bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
				/>
				<FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
			</div>
		</section>
	);
};

export default SearchItems;