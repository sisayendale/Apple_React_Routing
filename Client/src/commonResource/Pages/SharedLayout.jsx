import React from 'react'
import Nav from '../Header-navigation/Nav'
import Footer from '../Footer-wrapper/Footer'
import { Outlet } from 'react-router-dom'


export default function SharedLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}
