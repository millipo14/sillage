import { Children, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { Root } from './routes/Root'
import { MainPage } from './Components/MainPage/MainPage'
import { useSelector } from 'react-redux'
import { AuthPage } from './routes/AuthPage'
import { LoginPage } from './Components/LoginPage/LoginPage'
import { Subscription } from './Components/Subscription/Subscription'
import { Catalog } from './Components/Catalog/Catalog'
import PerfumePage from './Components/PerfumePage/PerfumePage'
import { Cart } from './Components/Cart/Cart'
import { BrandPage } from './Components/BrandPage/BrandPage'
import { Brand } from './Components/BrandPage/Brand/Brand'


const ProtectedRoute = ({ children }) => {
  const { token } = useSelector(state => state.auth)
  if (!token) {
    return <Navigate to='/login' replace />
  }
  return children
}

const router = createBrowserRouter(
  createRoutesFromElements(

    <>
      <Route element={<AuthPage />}>
        <Route path='/login' element={<LoginPage />} />
      </Route>

      <Route path='/' element={
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      }>
        <Route index element={<MainPage />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/perfume/:id' element={<PerfumePage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/brands' element={<BrandPage />} />
        <Route path='/brands/:id' element={<Brand />} />
      </Route>
    </>



  )
)
function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
