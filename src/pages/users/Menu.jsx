import { Box, Grid, Image, Spinner, useToast } from "@chakra-ui/react"
import { axiosInstance } from "../../api"
import { useEffect, useState } from "react"
import MenuCard from "../../components/MenuCard"
import ModalMenu from "../../components/ModalMenu"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ProtectedRoute from "../../components/ProtectedRoute"

const Menu = () => {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const toast = useToast()

  const ifNotLoggedIn = () => {
    navigate("/login")
    toast({
      title: "Please Login",
      status: "error",
    })
  }

  const fetchMenu = async () => {
    try {
      const response = await axiosInstance.get("/menu")
      setMenu(response.data.data)
      setLoading(true)
    } catch (error) {
      console.log(error)
    }
  }

  const renderMenu = () => {
    return Array.from(loading && menu).map((val) => {
      return (
        <MenuCard
          image_url={val?.Images[0]?.image_url}
          menu_name={val.food_name}
          price={val.price}
          onClick={() =>
            setOrder(authSelector.id ? val : () => ifNotLoggedIn())
          }
        />
      )
    })
  }

  useEffect(() => {
    fetchMenu()
  }, [])
  return (
    <Box display={"flex"} justifyContent={"center"} w="100%">
      <Helmet>
        <title>Cafetaria | Menu</title>
      </Helmet>
      <Box w="70%" h={loading ? "100%" : "100vh"} p="16px" bgColor={"gray.100"}>
        {loading ? (
          <Grid templateColumns={"repeat(3, 1fr)"} gap={"2"} mt="52px">
            {renderMenu()}
          </Grid>
        ) : (
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            h="100vh"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="burlywood"
              color="brown"
              size="xl"
            />
          </Box>
        )}
      </Box>

      <ModalMenu isOpen={order} onClose={() => setOrder(null)} val={order} />
    </Box>
  )
}

export default Menu
