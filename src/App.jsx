import { Route, Routes, useLocation } from "react-router-dom"
import Login from "./pages/users/Login"
import Menu from "./pages/users/Menu"
import Navbar from "./components/Navbar"
import AdminOrder from "./pages/admin/AdminOrder"
import AdminRoute from "./components/Admin/AdminRoute"
import { useEffect, useState } from "react"
import { axiosInstance } from "./api"
import { useDispatch } from "react-redux"
import { login } from "./redux/features/authSlice"
import { attach } from "./redux/features/resetSlice"
import OrderList from "./pages/users/OrderList"
import Sidebar from "./components/Admin/Sidebar"
import MenuList from "./pages/admin/MenuList"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const location = useLocation()
  const [authCheck, setAuthCheck] = useState(false)
  const dispatch = useDispatch()
  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }
      const response = await axiosInstance.get("/user/refresh-token")

      dispatch(login(response.data.data))

      localStorage.setItem("auth_token", response.data.token)
      setAuthCheck(true)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    } finally {
      setAuthCheck(true)
    }
  }

  const userResetData = async () => {
    try {
      const reset_token = localStorage.getItem("reset_token")

      if (!reset_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/user/refresh-token")

      dispatch(attach(response.data.data))

      localStorage.setItem("reset_token", response.data.token)
      setAuthCheck(true)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    } finally {
      setAuthCheck(true)
    }
  }

  useEffect(() => {
    keepUserLoggedIn()
    userResetData()
  }, [])
  return (
    <>
      {location.pathname === "/admin" ||
      location.pathname === "/admin/menu-list" ||
      location.pathname === "/admin/order-list" ? (
        <AdminRoute>
          <Sidebar />
        </AdminRoute>
      ) : null}
      {location.pathname === "/order-list" || location.pathname === "/" ? (
        <Navbar />
      ) : null}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Menu />} />
        <Route
          path="/order-list"
          element={
            <ProtectedRoute>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order-list"
          element={
            <AdminRoute>
              <AdminOrder />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/menu-list"
          element={
            <AdminRoute>
              <MenuList />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
