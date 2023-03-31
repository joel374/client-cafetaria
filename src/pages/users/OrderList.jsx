import { Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";
import OrderCard from "../../components/OrderCard";

const OrderList = () => {
  const [order, setOrder] = useState([]);
  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance.post("/order/getOrder");
      console.log(response.data.data);
      setOrder(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOrder = () => {
    return order.map((val) => {
      return (
        <OrderCard
          image_url={val?.Menu.Images[0].image_url}
          menu_name={val.Menu.food_name}
          price={val.Menu.price}
          createdAt={val.createdAt}
          quantity={val.quantity}
          total_price={val.total_price}
        />
      );
    });
  };

  useEffect(() => {
    fetchTransaction();
  }, []);
  return (
    <Box display={"flex"} justifyContent={"center"} w="100%">
      <Box w="70%" h="100vh" p="16px" bgColor={"gray.100"}>
        <Box mt="52px">
          <Box fontSize={"18px"} fontWeight="bold">
            Your Order List
          </Box>
          <Grid templateColumns={"repeat(4, 1fr)"} gap="4" mt="4">
            {renderOrder()}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderList;
