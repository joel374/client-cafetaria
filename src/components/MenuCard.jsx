import { Box, Button, Image } from "@chakra-ui/react";

const MenuCard = ({ image_url, menu_name, price, onClick }) => {
  return (
    <Box
      borderRadius={"8px"}
      w="100%"
      boxShadow={"0px 1px 6px rgba(49,53,59,0.12)"}
      bgColor={"white"}
    >
      <Image
        borderTopRadius={"8px"}
        src={image_url}
        objectFit={"cover"}
        objectPosition={"center"}
      />
      <Box p="10px 8px">
        <Box fontSize={"14px"} fontWeight={"semibold"}>
          {menu_name}
        </Box>
        <Box fontSize={"18px"} fontWeight={"bold"}>
          Rp. {price.toLocaleString("id-ID")}
        </Box>

        <Button
          w="100%"
          mt="8px"
          bgColor={"burlywood"}
          _hover={false}
          _active={false}
          color={"brown"}
          fontWeight={"medium"}
          onClick={onClick}
        >
          Order
        </Button>
      </Box>
    </Box>
  );
};
export default MenuCard;
