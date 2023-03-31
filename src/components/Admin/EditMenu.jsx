import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";

const EditMenu = ({
  header,
  isOpenEditMenu,
  onCloseEditMenu,
  fetch,
  id,
  fieldValue,
  loading,
}) => {
  const [editId, setEditId] = useState(null);
  const toast = useToast();
  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };
  const formik = useFormik({
    initialValues: {
      food_name: "",
      price: "",
      image_url: "",
    },
    onSubmit: async ({ food_name, price, image_url }) => {
      try {
        loading();
        const response = await axiosInstance.patch(`/menu/editMenu/${id}`, {
          food_name,
          price,
          image_url,
        });

        toast({
          title: "Menu Edited",
          status: "success",
          description: response.data.message,
        });

        formik.setFieldValue("food_name", "");
        formik.setFieldValue("price", "");
        formik.setFieldValue("image_url", "");
        onCloseEditMenu();
        fetch();
      } catch (error) {
        console.log(error);

        toast({
          title: "Menu cannot Edited",
          status: "error",
        });
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("food_name", fieldValue?.food_name);
    formik.setFieldValue("price", fieldValue?.price);
    formik.setFieldValue("image_url", fieldValue?.image_url);
    setEditId(fieldValue?.id);
  }, [isOpenEditMenu]);
  return (
    <Modal
      isOpen={isOpenEditMenu}
      onClose={onCloseEditMenu}
      motionPreset="slideInBottom"
      size={"xl"}
    >
      <ModalOverlay />
      <form onSubmit={formik.handleSubmit}>
        <ModalContent mt={"90px"} borderRadius="8px" overflow={false}>
          <ModalHeader
            fontSize={"20px"}
            fontWeight="bold"
            textAlign={"center"}
            borderBottom="1px solid #dfe1e3"
            p="0"
            h="36px"
          >
            <Text m="16px">{header}</Text>
          </ModalHeader>
          <ModalCloseButton _hover={false} mt="10px" />

          <ModalBody p="16px" fontSize={"14px"}>
            <Box mt="12px">
              <FormLabel mb="8px">Menu Name</FormLabel>
              <FormControl isInvalid={formik.errors.food_name}>
                <Input
                  value={formik.values.food_name}
                  name="food_name"
                  type="text"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.food_name}</FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt={"12px"} mb="4px">
              <FormLabel mb={"8px"}>Price</FormLabel>
              <FormControl isInvalid={formik.errors.price}>
                <Input
                  value={formik.values.price}
                  name="price"
                  type="price"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="12px">
              <FormLabel mb={"8px"}>Image URL</FormLabel>
              <FormControl isInvalid={formik.errors.image_url}>
                <Input
                  value={formik.values.image_url}
                  name="image_url"
                  type={"url"}
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.image_url}</FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="16px" textAlign={"center"}>
              <Button
                p="0px 16px"
                fontSize={"16px"}
                color={"brown"}
                fontWeight={"bold"}
                w="80px"
                _hover={false}
                _active={false}
                bgColor={"burlywood"}
                type="submit"
                disabled={
                  !formik.values.food_name ||
                  !formik.values.price ||
                  !formik.values.image_url
                }
              >
                Create
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default EditMenu;
