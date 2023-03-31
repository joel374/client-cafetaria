import { Box, Spinner, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../api"
import ListOrderItems from "../../components/Admin/ListOrderItems"
import { Helmet } from "react-helmet"

const AdminOrder = () => {
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const fetchOrder = async () => {
    try {
      const response = await axiosInstance.get("/order/getAllOrder")

      setOrder(response.data.data)
      setLoading(true)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const renderOrder = () => {
    return Array.from(loading && order).map((val) => {
      return (
        <ListOrderItems
          image_url={val?.Menu?.Images[0].image_url}
          menu_name={val.Menu?.food_name}
          price={val.Menu?.price}
          quantity={val.quantity}
          total_price={val.total_price}
          table_number={val.table_number}
          username={val.User.username}
          status={val.status}
          accept={() => acceptHandler(val.id)}
          reject={() => rejectHandler(val.id)}
        />
      )
    })
  }

  const acceptHandler = async (id) => {
    try {
      setLoading(false)
      const response = await axiosInstance.patch(`/order/acceptOrder/${id}`)

      toast({
        title: "Order accepted",
        status: "success",
        description: response.data.message,
      })
      fetchOrder()
    } catch (error) {
      console.log(error)
      toast({
        title: "Order failed to accept",
        status: "error",
        description: error.response.data.message,
      })
    }
  }

  const rejectHandler = async (id) => {
    try {
      setLoading(false)
      const response = await axiosInstance.patch(`/order/rejectOrder/${id}`)

      toast({
        title: "Order rejected",
        status: "success",
        description: response.data.message,
      })
      fetchOrder()
    } catch (error) {
      console.log(error)
      toast({
        title: "Order failed to reject",
        status: "error",
        description: error.response.data.message,
      })
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [])
  return (
    <Box ml="15%" bgColor={"gray.100"} h="100vh">
      <Helmet>
        <title>Cafetaria Admin | Order List </title>
      </Helmet>
      <Box p="16px">
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Box fontSize={"4xl"} fontWeight="semibold" color={"burlywood"}>
            Order List
          </Box>
        </Box>

        {/* Content */}
        <Box borderRadius={"8px"} bgColor="white">
          <Box minH={"584px"}>
            <Box>
              <Box
                borderBottom={"1px solid var(--N75,#E5E7E9)"}
                borderTop={"1px solid var(--N75,#E5E7E9)"}
                p="7px 16px"
              >
                <Box
                  display={"flex"}
                  alignItems="center"
                  fontWeight={"semibold"}
                  fontSize="12px"
                  gap="4"
                >
                  <Box w="56px">Menu Image</Box>
                  <Box w="14.3%">Menu Name</Box>
                  <Box w="10%">Price</Box>
                  <Box w="7%">Quantity</Box>
                  <Box w="14.3%">Total Price</Box>
                  <Box w="14.3%">Table Number</Box>
                  <Box w="14.3%">Username</Box>
                  <Box w="14.3%">Status</Box>
                  <Box w="15.5%">Confirm</Box>
                </Box>
              </Box>
              {loading ? (
                renderOrder()
              ) : (
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  h="584px"
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
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AdminOrder
