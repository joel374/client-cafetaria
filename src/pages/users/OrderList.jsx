import { Box, Grid, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../api"
import OrderCard from "../../components/OrderCard"
import { Helmet } from "react-helmet"

const OrderList = () => {
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTransaction = async () => {
    try {
      setLoading(false)
      const response = await axiosInstance.get("/order/getOrder")

      setOrder(response.data.data)
      setLoading(true)
    } catch (error) {
      console.log(error)
    }
  }

  const renderOrder = () => {
    return (
      loading &&
      order.map((val) => {
        return (
          <OrderCard
            image_url={val?.Menu?.Images[0]?.image_url}
            menu_name={val?.Menu?.food_name}
            price={val?.Menu?.price}
            createdAt={val?.createdAt}
            quantity={val?.quantity}
            total_price={val?.total_price}
          />
        )
      })
    )
  }

  useEffect(() => {
    fetchTransaction()
  }, [])
  return (
    <Box display={"flex"} justifyContent={"center"} w="100%">
      <Helmet>
        <title>Cafetaria | Order</title>
      </Helmet>
      <Box w="70%" h="100vh" p="16px" bgColor={"gray.100"}>
        <Box mt="52px">
          <Box fontSize={"18px"} fontWeight="bold">
            Your Order List
          </Box>
          {!loading ? (
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
          ) : (
            <Grid templateColumns={"repeat(4, 1fr)"} gap="4" mt="4">
              {renderOrder()}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default OrderList
