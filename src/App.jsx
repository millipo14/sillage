import { Children, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider } from 'react-router-dom'
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
import Loader from './Components/UI/Loader/Loader'
import AdminAnalytics from './Components/AdminPage/AdminAnalytics/AdminAnalytics'
import AdminUsers from './Components/AdminPage/AdminUsers/AdminUsers'
import AdminSubscriptions from './Components/AdminPage/AdminSubscriptions/AdminSubscriptions'
import RegisterPage from './Components/RegisterPage/RegisterPage'
import Authorization from './Components/Authorization/Authorization'


const ProtectedRoute = () => {
  const { token, user } = useSelector(state => state.auth)

  if (token && !user) {
    return <Loader />
  }
  if (!token) {
    return <Navigate to="/auth" replace />
  }
  return <Outlet />
}

//компонент-обертка
const AdminRoute = () => {
  const { user } = useSelector(state => state.auth);
  if (user?.role !== 'admin') {
    return <Navigate to='/' replace />;
  }
  return <Outlet />
};

const HomeRedirect = () => {
  const { user } = useSelector(state => state.auth)
  if (user?.role === 'admin') {
    return <Navigate to={'/admin'} replace />
  }
  return <MainPage />
}


const router = createBrowserRouter(
  createRoutesFromElements(

    <>
      <Route element={<AuthPage />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

      <Route path='/' element={<Root />}>
        <Route index element={<HomeRedirect />} />
        <Route path='auth' element={<Authorization />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/perfume/:id' element={<PerfumePage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/brands' element={<BrandPage />} />
        <Route path='/brands/:id' element={<Brand />} />
        <Route path='/reviews' element={<Reviews />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminAnalytics />} />
            <Route path="analysis" element={<AdminAnalytics />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path='subscriptions_users' element={<AdminSubscriptions />} />
          </Route>
        </Route>
      </Route>

      <Route path='/admin'
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          </ProtectedRoute>
        }>

        <Route index element={<AdminAnalytics />} />
        <Route path='analysis' element={<AdminAnalytics />} />
        <Route path='users' element={<AdminUsers />} />
        <Route path='subscriptions_users' element={<AdminSubscriptions />} />
      </Route>


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
