import {
  Avatar,
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../redux/features/authSlice"

const Navbar = () => {
  const authSelector = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const toast = useToast()

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token")
    dispatch(logout())

    toast({
      title: "User Logout",
      status: "info",
    })
  }
  return (
    <Box
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      position={"fixed"}
      left="0"
      right={"0"}
      top="0"
      backgroundColor={"burlywood"}
      zIndex="9998"
      p="10px 12px"
      display={"flex"}
      justifyContent={"center"}
    >
      <Box w="80%" display={"flex"} justifyContent={"space-between"}>
        <Link to="/">
          <Text fontSize={"20px"} fontWeight={"bold"} color={"brown"}>
            Cafetaria
          </Text>
        </Link>

        {authSelector.username ? (
          <Box display={"flex"} gap="2">
            <Popover trigger="hover">
              <PopoverTrigger>
                <Box display={"flex"} gap="2">
                  <Text fontSize={"20px"} fontWeight={"bold"} color={"brown"}>
                    {authSelector.username.split(" ")[0] || "Anto"}
                  </Text>
                  <Avatar name={authSelector.username} size={"sm"} />
                </Box>
              </PopoverTrigger>
              <PopoverContent w="100px">
                <PopoverBody p="8px" fontSize={"14px"} fontWeight={"semibold"}>
                  <Box
                    _hover={{ bgColor: "burlywood", color: "brown" }}
                    p="4px 6px"
                    borderRadius={"4px"}
                  >
                    <Link to="/order-list">Order</Link>
                  </Box>
                  <Box
                    _hover={{ bgColor: "burlywood", color: "brown" }}
                    p="4px 6px"
                    borderRadius={"4px"}
                    onClick={() => logoutBtnHandler()}
                  >
                    Logout
                  </Box>
                  <Box
                    _hover={{ bgColor: "burlywood", color: "brown" }}
                    p="4px 6px"
                    borderRadius={"4px"}
                  >
                    {authSelector.is_admin === true ? (
                      <Link to="/admin/order-list">Admin</Link>
                    ) : null}
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        ) : (
          <Link to="/login">
            <Button
              bgColor={"brown"}
              color="burlywood"
              size={"sm"}
              _active={false}
              _hover={false}
            >
              Login
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  )
}
export default Navbar
