import {
  Box,
  Button,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { axiosInstance } from "../../api";
import AddNewMenu from "../../components/Admin/AddNewMenu";
import EditMenu from "../../components/Admin/EditMenu";
import ListMenuItems from "../../components/Admin/ListMenuItems";
import Search from "../../components/Search";
const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
        <ListMenuItems
          id={val.id}
          image_url={val.Images[0]?.image_url}
          menu_name={val.food_name}
          price={val.price}
          deleteHandler={() => deleteMenu(val.id)}
          editForm={() => setEditForm(val)}
        />
      );
    });
  };

  const deleteMenu = async (id) => {
    try {
      setLoading(false);
      const response = await axiosInstance.delete(`/menu/deleteMenu/${id}`);
      toast({
        title: "Menu deleted",
        status: "success",
        description: response.data.message,
      });
      fetchMenu();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to delete",
        status: "error",
        description: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <Box ml="15%" bgColor={"gray.100"} h="100vh">
      <Box p="16px">
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Box fontSize={"4xl"} fontWeight="semibold" color={"burlywood"}>
            Menu List
          </Box>
          <Button
            rightIcon={<HiOutlinePlus />}
            bgColor="burlywood"
            color={"brown"}
            _hover={false}
            _active={false}
            onClick={onOpen}
          >
            Add New Menu
          </Button>
        </Box>

        {/* Content */}
        <Box borderRadius={"8px"} bgColor="white">
          <Box pt="16px" minH={"584px"}>
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
                  <Box w="33%">Menu Name</Box>
                  <Box w="33%">Price</Box>
                  <Box w="33%"></Box>
                </Box>
              </Box>
              {loading ? (
                renderMenu()
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
          </Box>
        </Box>
      </Box>

      <AddNewMenu
        isOpenAddNewMenu={isOpen}
        onCloseAddNewMenu={onClose}
        header="Add New Menu"
        fetch={() => fetchMenu()}
        loading={() => setLoading(false)}
      />

      <EditMenu
        isOpenEditMenu={editForm}
        onCloseEditMenu={() => setEditForm(null)}
        header="Edit Menu"
        fetch={() => fetchMenu()}
        loading={() => setLoading(false)}
        id={editForm?.id}
        fieldValue={editForm}
      />
    </Box>
  );
};

export default MenuList;
