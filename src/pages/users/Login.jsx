import { Box, Button, Text, useToast } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc"
// import GoogleLogin from "react-google-login";
import { axiosInstance } from "../../api"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/features/authSlice"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { auth } from "../../firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const provider = new GoogleAuthProvider()

// import { gapi } from "gapi-script";

// const clientId =
//   "107570705256-s408n1mll02e6fdjpf632l4iqcbft779.apps.googleusercontent.com";

const Login = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authSelector = useSelector((state) => state.auth)

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const user = result.user

      const response = await axiosInstance.post("/user/login", {
        username: user.displayName,
        email: user.email,
      })

      toast({
        title: "Login Succesful",
        status: "success",
        description: response.data.message,
      })

      localStorage.setItem("auth_token", response.data.token)
      dispatch(
        login({
          id: response.data.data.id,
          email: response.data.data.email,
          username: response.data.data.username,
          profile_picture: response.data.data.profile_picture,
          is_admin: response.data.data.is_admin,
        })
      )
      navigate("/")
    } catch (error) {
      console.error(error)
      toast({
        title: "Login Failed",
        status: "error",
        description: error.response.data.message,
      })
    }
  }

  return (
    <Box
      h="100vh"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        w="300px"
        borderRadius={"10px"}
        boxShadow={"0px 1px 6px rgba(49,53,59,0.12)"}
        p="16px"
      >
        <Text
          textAlign={"center"}
          pb="16px"
          fontSize={"20px"}
          fontWeight={"semibold"}
        >
          Login
        </Text>
        <Text textAlign={"center"} mb="8px" fontSize={"13px"}>
          Continue with
        </Text>
        {/* <GoogleLogin
          clientId={clientId}
          buttonText={null}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={false}
          render={(renderProps) => ( */}
        {/* )}
        /> */}
        <Button
          display={"flex"}
          onClick={loginGoogle}
          w="100%"
          bgColor={"white"}
          border="1px solid #ecf0f5"
          _hover={false}
          _active={false}
        >
          <Box mr="6px" my={"auto"}>
            <FcGoogle fontSize={"25px"} />
          </Box>
          <Text>Google</Text>
        </Button>
      </Box>
    </Box>
  )
}
export default Login
