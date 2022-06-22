import React from 'react'
import Link from 'next/link'

const Signup = () => {
  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-[525px] shadow-2xl mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px]">
              <div className="flex flex-col mb-10 md:mb-16 text-center font-bold text-4xl">
                <Link href={'/'}>
                  <a className="inline-block max-w-[240px] mx-auto mb-4">
                    <img src='/logo2.png' alt="logo" />
                  </a>
                </Link>
                Sign Up
              </div>
              <form>
                <div className="mb-6">
                  <input id='name' name='name' type="text" placeholder="Name" className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:b " />
                </div>
                <div className="mb-6">
                  <input id='email' name='email' type="email" placeholder="Email" className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:b " />
                </div>
                <div className="mb-6">
                  <input id='password' name='password' type="password" placeholder="Password" className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary" />
                </div>
                <div className="mb-6">
                  <input id='confirmpassword' name='confirmpassword' type="password" placeholder="Confirm Password" className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary" />
                </div>
                <div className="mb-10">
                  <input type="submit" value="Sign Up" className="w-full rounded-md border border-primary py-3 px-5 bg-blue-500 text-white cursor-pointer hover:bg-opacity-90 transition" />
                </div>
              </form>
              <p className="text-base text-gray-400">
                Already a member?
                <Link href={'/login'}>
                  <a href="javascript:void(0)" className="text-blue-500 hover:underline">
                    Sign In
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup