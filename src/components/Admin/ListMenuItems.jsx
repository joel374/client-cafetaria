import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { BsPencil, BsTrash } from "react-icons/bs"
import { Link } from "react-router-dom"

const ListMenuItems = ({
  deleteHandler,
  id,
  image_url,
  price,
  menu_name,
  editForm,
}) => {
  const [icon, setIcon] = useState(false)
  const iconHandler = () => {
    icon ? setIcon(false) : setIcon(true)
  }
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
        <Box w="33%">
          <Text maxH={"66px"} overflow="hidden" textOverflow={"ellipsis"}>
            {menu_name}
          </Text>
        </Box>
        <Box w="33%">
          <Box w="180px" mb="8px">
            Rp{price?.toLocaleString("id-ID")}
          </Box>
        </Box>

        <Box w="33%">
          <Menu>
            <MenuButton
              as={Button}
              onClick={iconHandler}
              _hover={false}
              _active={false}
              rightIcon={icon ? <ChevronUpIcon /> : <ChevronDownIcon />}
              fontSize="12px"
              h="30px"
              bgColor={"transparent"}
              border="1px solid var(--color-border,#E5E7E9)"
            >
              Action
            </MenuButton>
            <MenuList fontSize={"12px"}>
              <MenuItem p="6px 12px" h="36px" onClick={editForm}>
                <Box mr="8px">
                  <BsPencil fontSize={"18px"} />
                </Box>
                Edit
              </MenuItem>
              <MenuItem p="6px 12px" h="36px" onClick={deleteHandler}>
                <Box mr="8px">
                  <BsTrash fontSize={"18px"} />
                </Box>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  )
}

export default ListMenuItems
