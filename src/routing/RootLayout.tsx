import React from 'react';
import { Outlet } from 'react-router-dom'
import Header from '../components/Layout/Header/Header'
import Footer from '../components/Layout/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

const RootLayout = () => {
  const authState = useSelector((state : RootState) => state.authReducer.isAuthenticated);

  return (
    <>
      {/* Header */}
      <Header authState={authState}/>

      {/* Content layout */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default RootLayout;