import MainNavbar from '@/components/MainNavbar';
import { AppProvider } from '@/context/AppContext';
import React from 'react'

const Template = ({children}) => {
  return (
    <AppProvider>
        <MainNavbar/>
        {children}</AppProvider>
  )
}

export default Template;