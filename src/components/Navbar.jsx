import {
  Avatar,
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const authSelector = useSelector((state) => state.auth);
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
              <PopoverContent>
                <PopoverBody>
                  <Box>
                    <Link to="/order-list">Order</Link>
                  </Box>
                  {authSelector.is_admin === true ? (
                    <Link to="/admin/order">Admin</Link>
                  ) : null}
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
  );
};
export default Navbar;
