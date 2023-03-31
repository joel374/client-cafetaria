import { Box, Image } from "@chakra-ui/react";
import moment from "moment";

const OrderCard = ({
  image_url,
  menu_name,
  price,
  createdAt,
  quantity,
  total_price,
}) => {
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

        <Box>
          <Box fontSize={"16px"} fontWeight={"bold"}>
            Rp. {price.toLocaleString("id-ID")} x {quantity}
          </Box>
          <Box>Total </Box>
          Rp. {total_price?.toLocaleString("id-ID")}
          <Box fontSize={"12px"}>{moment(createdAt).format("LLL")}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderCard;
