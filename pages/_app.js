import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [cart, setcart] = useState({})
  const [total, settotal] = useState(0)

  const savecart = (mycart)=>{
    localStorage.setItem("cart", JSON.stringify(mycart))
    let tot = 0
    let keys = Object.keys(mycart)
    for(let i=0; i<keys.length; i++){
      tot = mycart[keys[i]].price * mycart[keys[i]].qty
    }
    settotal(tot)
    localStorage.setItem("total", JSON.stringify(tot))
  }

  useEffect(() => {
    try {
      if(localStorage.getItem("cart")){
        setcart(JSON.parse(localStorage.getItem("cart")))
      }
      if(localStorage.getItem("total")){
        settotal(JSON.parse(localStorage.getItem("total")))
      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
    }
  }, [])
  

  const additem = (itemcode, qty, price, size, color, name)=>{
    let mycart = cart
    let subt = 0
    if(itemcode in cart){
      mycart[itemcode].qty = cart[itemcode].qty + qty
    }
    else{
      mycart[itemcode] = {qty : 1, price, name, size, color}
    }
    setcart(mycart)
    savecart(mycart)
  }

  const removeitem = (itemcode, qty)=>{
    let mycart = cart
    if(itemcode in cart){
      mycart[itemcode].qty = cart[itemcode].qty - qty
    }
    if(mycart[itemcode].qty<=0){
      delete mycart[itemcode]
    }
    setcart(mycart)
    savecart(mycart)
  }

  const clearcart = ()=>{
    setcart({})
    savecart({})
  }

  return <>
    <Navbar cart={cart} additem={additem} removeitem={removeitem} clearcart={clearcart} total={total} />
    <Component cart={cart} additem={additem} removeitem={removeitem} clearcart={clearcart} total={total} {...pageProps} />
    <Footer />
  </>
}

export default MyApp
