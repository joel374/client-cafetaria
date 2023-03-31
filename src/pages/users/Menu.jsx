import { Box, Grid, Image, Spinner } from "@chakra-ui/react";
import { axiosInstance } from "../../api";
import { useEffect, useState } from "react";
import MenuCard from "../../components/MenuCard";
import ModalMenu from "../../components/ModalMenu";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const fetchMenu = async () => {
    try {
      const response = await axiosInstance.get("/menu");
      setMenu(response.data.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const renderMenu = () => {
    return Array.from(loading && menu).map((val) => {
      return (
        <MenuCard
          image_url={val?.Images[0]?.image_url}
          menu_name={val.food_name}
          price={val.price}
          onClick={() => setOrder(val)}
        />
      );
    });
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <Box display={"flex"} justifyContent={"center"} w="100%">
      <Box w="70%" h="100vh" p="16px" bgColor={"gray.100"}>
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
  );
};

export default Menu;
