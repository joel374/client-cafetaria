import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";

const ListOrderItems = ({
  id,
  image_url,
  price,
  menu_name,
  quantity,
  total_price,
  table_number,
  username,
  accept,
  reject,
  status,
}) => {
  return (
    <Box borderBottom={"1px solid var(--N75,#E5E7E9)"} p="7px 16px">
      <Box
        display={"flex"}
        alignItems="center"
        fontWeight={"bold"}
        fontSize="14px"
        gap="4"
      >
        <Box>
          <Image src={image_url} w="56px" h="56px" />
        </Box>
        <Box w="14.3%">
          <Text maxH={"66px"} overflow="hidden" textOverflow={"ellipsis"}>
            {menu_name}
          </Text>
        </Box>
        <Box w="10%">Rp{price?.toLocaleString("id-ID")}</Box>
        <Box w="7%">x {quantity}</Box>
        <Box w="14.3%">Rp.{total_price?.toLocaleString("id-ID")}</Box>
        <Box w="14.3%">{table_number}</Box>
        <Box w="14.3%">{username}</Box>
        <Box w="14.3%">{status}</Box>

        <Box w="14.3%">
          {status === "Order Rejected" || status === "Order Accepted" ? null : (
            <Box gap="2" display={"flex"}>
              <Button size={"sm"} onClick={accept}>
                Accept
              </Button>
              <Button size={"sm"} onClick={reject}>
                Reject
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ListOrderItems;
