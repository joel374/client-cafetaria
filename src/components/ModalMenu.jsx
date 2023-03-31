import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { axiosInstance } from "../api"
import * as Yup from "yup"

const ModalMenu = ({ isOpen, onClose, onOpen, val }) => {
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      notes: "",
      quantity: "",
      table_number: "",
    },
    onSubmit: async ({ notes, quantity, table_number }) => {
      try {
        const response = await axiosInstance.post("order/createOrder", {
          MenuId: val?.id,
          notes,
          quantity,
          table_number,
        })

        onClose()
        toast({
          message: "Order created",
          status: "success",
          description: response.data.message,
        })
      } catch (error) {
        console.log(error)
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      notes: Yup.string(),
      quantity: Yup.number()
        .required("Quantity must be filled")
        .min(1, "Quantity not less than 1"),
      table_number: Yup.number().required("Table number is required"),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size={"3xl"}
    >
      <ModalOverlay />
      <ModalContent
        h="500px"
        borderRadius="8px"
        overflow={false}
        bottom={"auto"}
        left={"auto"}
        right={"auto"}
        zIndex={"99999"}
        height={"auto"}
      >
        <ModalCloseButton _hover={false} />

        <ModalBody maxH="529px" p={"16px"} fontSize={"14px"}>
          <form onSubmit={formik.handleSubmit}>
            <Box display={"flex"} gap="4">
              <Image w="50%" src={val?.Images[0].image_url} />
              <Box>
                <Box fontSize={"24px"} fontWeight={"semibold"}>
                  {val?.food_name}
                </Box>
                <Box fontSize={"20px"}>
                  Rp. {val?.price.toLocaleString("id-ID")}
                </Box>
                <Box display={"flex"} gap="4">
                  <FormControl isInvalid={formik.errors.quantity}>
                    <Input
                      mt="2"
                      placeholder="Quantity"
                      size={"sm"}
                      defaultValue={1}
                      name="quantity"
                      value={formik.values.quantity}
                      onChange={formChangeHandler}
                      type="number"
                    />
                    <FormErrorMessage>
                      <Text fontSize={"10px"} mt="-2px">
                        {formik.errors.quantity}
                      </Text>
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={formik.errors.table_number}>
                    <Input
                      mt="2"
                      placeholder="Table Number"
                      name="table_number"
                      value={formik.values.table_number}
                      onChange={formChangeHandler}
                      size={"sm"}
                      type="number"
                    />
                    <FormErrorMessage>
                      <Text fontSize={"10px"} mt="-2px">
                        {formik.errors.table_number}
                      </Text>
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <FormControl isInvalid={formik.errors.notes}>
                  <Textarea
                    placeholder="Notes"
                    size={"sm"}
                    value={formik.values.notes}
                    onChange={formChangeHandler}
                    name="notes"
                    resize="none"
                    mt="4"
                  />
                </FormControl>
              </Box>
            </Box>
            <Box mt="16px" textAlign={"center"}>
              <Button
                p={"0px 16px"}
                fontSize={"16px"}
                color="brown"
                fontWeight={"bold"}
                w={"100%"}
                _hover={false}
                _active={false}
                bgColor="burlywood"
                type="submit"
              >
                Order
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalMenu
