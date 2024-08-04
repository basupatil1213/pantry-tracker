import PantryItemInputForm from '@/components/Form/PantryItemInputForm'
import React from 'react'

const page = () => {
  return (
    <div className="h-full flex justify-center items-center mt-40">
        <PantryItemInputForm action='new'/>
    </div>
  )
}

export default page