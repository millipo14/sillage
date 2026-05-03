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
import { AdminPage } from './Components/AdminPage/AdminPage'
import { QuizPage } from './Components/QuizPage/QuizPage'
import { Recommendations } from './Components/Recommendations/Recommendations'
import Profile from './Components/Profile/Profile'
import Reviews from './Components/Reviews/Reviews'
import SelectionSample from './Components/SelectionSample/SelectionSample'


const ProtectedRoute = ({ children }) => {
  const { token } = useSelector(state => state.auth)
  if (!token) {
    return <Navigate to='/login' replace />
  }
  return children
}

//комопнент-обертка
const AdminRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);
  if (user?.role !== 'admin') {
    return <Navigate to='/' replace />;
  }
  return children;
};
const router = createBrowserRouter(
  createRoutesFromElements(

    <>
      <Route element={<AuthPage />}>
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path='/register' element={<RegisterPage />} /> */}
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
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/selectsample' element={<SelectionSample />} />
        <Route path='/recommendations' element={<Recommendations />} />
      </Route>

      <Route path='/admin'
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          </ProtectedRoute>
        } />

      <Route path='*' element={<Navigate to='/login' replace />} />
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
