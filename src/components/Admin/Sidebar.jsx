import { Avatar, Box, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const authSelector = useSelector((state) => state.auth)
  console.log(authSelector)
  return (
    <Box
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      position={"fixed"}
      left="0"
      right={"0"}
      w="15%"
      h="100vh"
      backgroundColor={"burlywood"}
      zIndex="9998"
      p="10px 12px"
    >
      <Link to="/">
        <Text
          fontSize={"24px"}
          textAlign="center"
          fontWeight={"bold"}
          color={"brown"}
        >
          Cafetaria<sub style={{ fontSize: "12px" }}>Admin</sub>
        </Text>
      </Link>

      <Box mt="4">
        <Box display={"flex"} justifyContent={"center"}>
          <Avatar name={authSelector.username} />
        </Box>
        <Text mt="2" color={"brown"} textAlign={"center"}>
          {authSelector.username}
        </Text>
      </Box>

      <Box
        mt="4"
        textAlign={"left"}
        fontSize={"18px"}
        fontWeight={"medium"}
        color={"brown"}
      >
        <Link to="/admin/menu-list">
          <Text p="2">Menu List</Text>
        </Link>
        <Link to="/admin/order-list">
          <Text p="2">Order List</Text>
        </Link>
      </Box>
    </Box>
  )
}

export default Sidebar
