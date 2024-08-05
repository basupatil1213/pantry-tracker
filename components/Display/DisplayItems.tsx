import React, { useState } from 'react'
import Image from 'next/image'
import Pagination from '../Pagination/Pagination'
import Link from 'next/link'

type DisplayItemsProps = {
    items: PantryItem[]
    onDeleteItem: (itemId: string) => void
}

const ITEMS_PER_PAGE_OPTIONS = [4, 8, 12, 16];

const DisplayItems = ({ items, onDeleteItem }: DisplayItemsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDelete = (itemId: string) => {
    onDeleteItem(itemId);
  };

  return (
    <div className='mx-auto px-8 pb-16 relative bg-gray-900 text-gray-200'>
      {items.length > 0 ? (
        <>
          <div className="flex justify-end mb-4">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-700 rounded p-2 bg-gray-800 text-gray-200"
            >
              {ITEMS_PER_PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option} items per page
                </option>
              ))}
            </select>
          </div>
          <ul className='grid gap-4 grid-cols-1 md:grid-cols-3'>
            {currentItems.map((item) => (
              <li key={item._id} className='bg-gray-800 shadow-md border-2 border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300'>
                <div className='relative w-full h-40 mb-4'>
                  <Image
                    src={item.imageUrl || '/assets/images/pantry-item-placeholder.png'}
                    alt={item.name}
                    fill
                    className='object-cover rounded'
                  />
                </div>
                <h3 className='text-lg font-semibold mb-2 text-gray-200'>{item.name}</h3>
                <p className='text-sm text-gray-400'>Quantity: {item.quantity} {item.unit}</p>
                <p className='text-sm text-gray-400'>Category: {item.category}</p>
                <p className='text-sm text-gray-400'>Expiry: {item.expiry.toString()}</p>
                <div className='mt-4 flex justify-between'>
                  <Link href={`/pantryitems/edit?item=${JSON.stringify(item)}`} className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300'>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id as string)}
                    className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300'
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="sticky bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-10">
            <div className="container mx-auto px-8 py-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      ) : (
        <div className='text-center py-8'>
          <h1 className='text-2xl font-bold text-gray-200'>No items found</h1>
        </div>
      )}
    </div>
  )
}

export default DisplayItems