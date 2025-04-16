import React from 'react'
import UserNavbar from './navbar'
import Navbar from './navbar'

const Layout = ({children}) => {
  return (

    <div>
        <Navbar/>
        {children}
        </div>
  )
}

export default Layout