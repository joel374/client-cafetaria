import { useToast } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const authSelector = useSelector((state) => state.auth)
  const toast = useToast()
  const navigate = useNavigate()

  if (!authSelector.id) {
    navigate("/login")
    toast({
      title: "Login",
      description: "Please login before continuing",
      status: "error",
    })
  }
  return children
}

export default ProtectedRoute
