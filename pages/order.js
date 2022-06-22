import React from 'react'

const Order = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-md title-font text-gray-500 tracking-widest">LONESTORE</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #17685</h1>
            <p className="leading-relaxed mb-4 font-semibold">Your order is placed successfully.</p>
            <div className="grid grid-cols-3 text-center border-t border-gray-200 mt-4 mb-2 justify-between">
              <a className="py-2 mx-2 text-lg px-1">Item Details</a>
              <a className="py-2 mx-2 text-lg px-1">Quantity</a>
              <a className="py-2 mx-2 text-lg px-1">Price</a>
            </div>
            <div className="grid grid-cols-3 text-center border-t border-gray-200 py-2">
              <span className="mx-2 text-gray-500">Be Lone, Be Sexy (XL/Black)</span>
              <span className="mx-2 text-gray-500">1000</span>
              <span className="mx-2 text-gray-900">₹999.00</span>
            </div>
            <div className="grid grid-cols-3 text-center border-t border-gray-200 py-2">
              <span className="mx-2 text-gray-500">Be Lone, Be Sexy (XL/Black)</span>
              <span className="mx-2 text-gray-500">1</span>
              <span className="mx-2 text-gray-900">₹999.00</span>
            </div>
            <div className="grid grid-cols-3 text-center border-t border-b mb-6 border-gray-200 py-2">
              <span className="mx-2 text-gray-500">Be Lone, Be Sexy (XL/Black)</span>
              <span className="mx-2 text-gray-500">1</span>
              <span className="mx-2 text-gray-900">₹999.00</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">Total: ₹2997.00</span>
              <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Track Order</button>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
        </div>
      </div>
    </section>
  )
}

export default Order