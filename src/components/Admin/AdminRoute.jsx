import { useToast } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AdminRoute = ({ children }) => {
  const authSelector = useSelector((state) => state.auth)
  const toast = useToast()
  const navigate = useNavigate()

  if (!authSelector.is_admin) {
    navigate("/")
    toast({
      title: "Access Denied",
      description: "You are not an admin",
      status: "error",
    })
  }
  return children
}

export default AdminRoute
