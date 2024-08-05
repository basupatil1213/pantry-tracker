"use client";
import React, { use, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PantryItemProps = {
  action : "new" | "edit",
  item? : {
    name: string,
    quantity: number,
    unit: string,
    expiry: string,
    category: string,
    userId? : string,
  }
}

const PantryItemInputForm = ({action, item} : PantryItemProps) => {
  const categories = [
    "Fruit",
    "Vegetable",
    "Meat",
    "Dairy",
    "Grain",
    "Spice",
    "Other",
  ];

  const units = [
    "g",
    "kg",
    "ml",
    "l",
    "unit",
    "tbsp",
    "tsp",
    "cup",
    "oz",
    "lb",
    "pt",
    "qt",
    "gal",
    "fl oz",
    "pint",
    "quart",
    "gallon",
    "milliliter",
    "liter",
  ];

  const [itemsForm, setItemForm] = useState(item || {
    name: "",
    quantity: 0,
    unit: "",
    expiry: "",
    category: "",
  });

  console.log(`Item form: ${JSON.stringify(itemsForm)}`);

  console.log(`item from props: ${JSON.stringify(item)}`);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    
    const endpoint = action === "new" 
      ? "http://localhost:3000/api/pantryitems/new"
      : "http://localhost:3000/api/pantryitems/edit";

    const response = await fetch(endpoint, {
      method: action === "new" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...itemsForm, userId: sessionStorage.getItem('userId')}),
    });

    setLoading(false);

    if (response.ok) {
      toast.success(action === "new" ? "Item added successfully" : "Item updated successfully");
      if (action === "new") {
        setItemForm({
          name: "",
          quantity: 0,
          unit: "",
          expiry: "",
          category: "",
        });
      }
    } else {
      toast.error(action === "new" ? "Error adding item" : "Error updating item");
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   
    const { name, value } = event.target;
    setItemForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-auto p-6 bg-gray-800 rounded-lg shadow-md border-2 border-gray-700">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Item Name:</label>
          <input type="text" value={itemsForm.name} name="name" id="name" onChange={handleChange} className="mt-1 p-1 block w-full rounded-lg border-2 border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">Quantity:</label>
            <input type="number" value={itemsForm.quantity} name="quantity" id="quantity" onChange={handleChange} className="mt-1 p-1 block w-full rounded-lg border-2 border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
          </div>
          <div className="flex-1">
            <label htmlFor="unit" className="block text-sm font-medium text-gray-300">Unit:</label>
            <select name="unit" value={itemsForm.unit} id="unit" onChange={handleChange} className="mt-1 p-1 block w-full rounded-lg border-2 border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
              {units.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="expiry" className="block text-sm font-medium text-gray-300">Expiry:</label>
          <input type="date" value={itemsForm.expiry} name="expiry" id="expiry" onChange={handleChange} className="mt-1 p-1 block w-full rounded-lg border-2 border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category:</label>
          <select name="category" value={itemsForm.category} id="category" onChange={handleChange} className="mt-1 p-1 block w-full rounded-lg border-2 border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {loading ? (action === "new" ? 'Adding...' : 'Updating...') : (action === "new" ? 'Add Item' : 'Update Item')}
        </button>
      </div>
      <ToastContainer theme="dark" />
    </form>
  );
};

export default PantryItemInputForm;