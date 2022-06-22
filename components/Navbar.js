import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BsCart4, BsBagCheck, BsCartX } from 'react-icons/bs';
import { CgCloseR } from 'react-icons/cg';
import { MdAccountCircle } from 'react-icons/md';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'

const Navbar = ({ cart, additem, removeitem, clearcart, total }) => {

  const [showcart, setshowcart] = useState(false)
  const changecart = () => {
    if (showcart) {
      setshowcart(false)
    }
    else {
      setshowcart(true)
    }
  }

  return (
    <div className='sticky top-0 bg-white z-50'>
      <header className="text-gray-600 body-font">
        <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center shadow-md">
          <Link href={'/'}>
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <Image src="/logo2.png" alt="" width={160} height={32} />
            </a>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center font-bold">
            <Link href={'/shirt'}><a className="mr-5 hover:text-gray-900">Shirts</a></Link>
            <Link href={'/trousers'}><a className="mr-5 hover:text-gray-900">Trousers</a></Link>
            <Link href={'/jackets'}><a className="mr-5 hover:text-gray-900">Jackets</a></Link>
            <Link href={'/shoes'}><a className="mr-5 hover:text-gray-900">Shoes</a></Link>
          </nav>
          <div className='flex flex-row items-center mt-4 md:mt-0'>
            <button onClick={changecart} className="relative inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"><div className={`${Object.keys(cart).length === 0 ? "hidden" : "block"}`}>
              <span className='animate-ping absolute -top-1 -right-1 inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
              <span className="absolute -top-1 -right-1 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </div>Cart<BsCart4 className='mx-1' /></button>
            <Link href={'/login'}><MdAccountCircle className='text-3xl ml-4 cursor-pointer' /></Link>
          </div>
        </div>
      </header>
      <div className={`cartbar h-[100vh] overflow-y-scroll absolute top-0 right-0 pl-2 py-2 sm:py-10 sm:px-4 w-4/6 sm:w-1/2 md:w-3/8 lg:w-2/6 bg-yellow-300 transition-all ${showcart ? "translate-x-0" : "translate-x-full"} ease-in-out delay-600`}>
        <h1 className='font-bold text-md sm:text-lg'>Your Cart : </h1>
        <CgCloseR onClick={changecart} className='absolute top-2 right-2 text-md sm:text-2xl cursor-pointer' />
        <ol className='list-decimal ml-6 sm:mx-4 font-semibold'>
          {Object.keys(cart).length === 0 && <div className='text-center my-4'>Cart is empty!!!! Shop now</div>}
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
        <div className='flex justify-around flex-wrap'>
          <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0 ? true : false} className="mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75">Checkout<BsBagCheck className='m-1 ml-2' /></button></Link>
          <button disabled={Object.keys(cart).length === 0 ? true : false} onClick={clearcart} className="mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75">Clear Cart<BsCartX className='m-1 ml-2 text-lg' /></button>
        </div>
      </div>
    </div>
  )
}

export default Navbar