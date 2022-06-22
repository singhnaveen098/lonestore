import React from 'react'
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'
import { BsCartX } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';


const Checkout = ({ cart, additem, removeitem, clearcart, total }) => {
  return (
    <div className="container m-auto px-4 py-8">
      <div>
        <div className='text-2xl font-bold underline underline-offset-4 mb-8'>Billing Details :</div>
        <div className="grid">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label htmlFor="name" className="leading-7 text-md font-semibold text-gray-600">Name</label>
                <input required type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label htmlFor="email" className="leading-7 text-md font-semibold text-gray-600">Email</label>
                <input required type="text" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label htmlFor="phone" className="leading-7 text-md font-semibold text-gray-600">Phone</label>
                <input required type="tel" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label htmlFor="city" className="leading-7 text-md font-semibold text-gray-600">City</label>
                <input required type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
          <div className="p-2 w-11/12 sm:w-3/4">
            <div className="mb-4">
              <label htmlFor="address" className="leading-7 text-md font-semibold text-gray-600">Address</label>
              <textarea required id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label htmlFor="pincode" className="leading-7 text-md font-semibold text-gray-600">Pincode</label>
                <input required type="text" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label htmlFor="state" className="leading-7 text-md font-semibold text-gray-600">State</label>
                <input required type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='text-2xl font-bold underline underline-offset-4 mt-4 mb-8'>Review Cart :</div>
        <ol className='list-decimal ml-6 sm:mx-4 font-semibold'>
          {Object.keys(cart).length === 0 && <div className='my-4'>Cart is empty!!!! Shop now</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="flex flex-row my-4">
                <div className='w-1/2 sm:w-2/3 flex'>{cart[k].name}</div>
                <div className='w-1/2 sm:w-1/3 flex justify-center items-center'><IoMdRemoveCircleOutline onClick={() => removeitem(k, 1)} className='text-lg mr-2 cursor-pointer' />{cart[k].qty}<IoMdAddCircleOutline onClick={() => additem(k, 1, cart[k].price, cart[k].size, cart[k].color, cart[k].name)} className='text-lg ml-2 cursor-pointer' /></div>
              </div>
            </li>
          })}
        </ol>
        {Object.keys(cart).length > 0 && <div className='m-4 font-bold text-xl'>Total : ₹{total}.00</div>}
        <div className='flex items-center flex-wrap'>
          <button onClick={clearcart} disabled={Object.keys(cart).length === 0 ? true : false} className="ml-4 mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75">Clear Cart<BsCartX className='m-1 ml-2 text-lg' /></button>
          <button onClick={clearcart} disabled={Object.keys(cart).length === 0 ? true : false} className="ml-4 mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"><MdPayment className='m-1 mr-2 text-lg' />Pay ₹{total}.00</button>
        </div>
      </div>
    </div>
  )
}

export default Checkout