import React from 'react'

type Props = {}

function tailwindTesting({}: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
        <div className="h-20 w-full bg-gray-800"></div>
        <div className="h-20 col-span-2 bg-blue-800"></div>
        {/* <div className="h-20 w-full bg-red-800"></div> */}

        <div className="h-20 w-80 bg-gray-800"></div>
        {/* <div className="h-20 w-full bg-blue-800"></div>
        <div className="h-20 w-full bg-red-800"></div> */}

        <div className="h-20 w-full bg-gray-800"></div>
        <div className="h-20 w-full bg-blue-800"></div>
        <div className="h-20 w-full bg-red-800"></div>
    </div>
    // This is the flexbox layout
    // <div className="flex flex-col sm:flex-row">
    //     <div className="h-96 sm:flex-1 bg-gray-800"></div>
    //     <div className="h-96 sm:flex-1 bg-blue-800"></div>
    //     <div className="h-96 sm:flex-1 bg-red-800"></div>
    // </div>
  )
}

export default tailwindTesting