import { redirect } from 'next/navigation';
import PantryItemInputForm from '@/components/Form/PantryItemInputForm'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/sign-in');
  }
  return (
    <div className="flex justify-center items-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Pantry Item</h1>
        <PantryItemInputForm action='new'/>
      </div>
    </div>
  )
}

export default page