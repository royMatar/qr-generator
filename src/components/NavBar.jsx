import { Button, Box, VStack, Wrap, WrapItem, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";

const NavBar = ({ setQrType }) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const [activeButton, setActiveButton] = useState("vcard");

  const handleButtonClick = (type) => {
    setQrType(type);
    setActiveButton(type);
  };

  const buttonStyles = (type) => ({
    borderRadius: 'md',
    width: 'full',
    textAlign: 'center',
    borderWidth: activeButton === type ? "2px" : "1px",
    borderColor: activeButton === type ? "blue.500" : "gray.300",
    _hover: {
      borderWidth: "2px",
      borderColor: "blue.500",
      bg: "blue.50",
    },
    color: activeButton === type ? "blue.500" : "gray.700",
    fontWeight: 'bold',
  });

  return (
    <Box
      width={{ base: "100%", md: "20vw" }}
      minHeight={{ base: "auto", md: "100vh" }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="md"
      borderWidth={{ base: "0px", md: "1px" }}
      borderColor={{ base: "", md: "gray.200" }}
      boxShadow="md" // Default shadow
      p={4}
      bg="white"
    >
      {isSmallScreen ? (
        <Wrap spacing={4} justify="center" w="full">
           <WrapItem>
            <Button {...buttonStyles("vcard")} onClick={() => handleButtonClick("vcard")}>
              vCard
            </Button>
          </WrapItem>
          <WrapItem>
            <Button {...buttonStyles("text")} onClick={() => handleButtonClick("text")}>
              Text/Link
            </Button>
          </WrapItem>
          <WrapItem>
            <Button {...buttonStyles("phone")} onClick={() => handleButtonClick("phone")}>
              Phone Number
            </Button>
          </WrapItem>
          <WrapItem>
            <Button {...buttonStyles("email")} onClick={() => handleButtonClick("email")}>
              Email
            </Button>
          </WrapItem>
          <WrapItem>
            <Button {...buttonStyles("sms")} onClick={() => handleButtonClick("sms")}>
              SMS
            </Button>
          </WrapItem>
         
        </Wrap>
      ) : (
        <VStack spacing={4} w="full">
          <Button {...buttonStyles("vcard")} onClick={() => handleButtonClick("vcard")}>
            vCard
          </Button>
          <Button {...buttonStyles("text")} onClick={() => handleButtonClick("text")}>
            Text/Link
          </Button>
          <Button {...buttonStyles("phone")} onClick={() => handleButtonClick("phone")}>
            Phone Number
          </Button>
          <Button {...buttonStyles("email")} onClick={() => handleButtonClick("email")}>
            Email
          </Button>
          <Button {...buttonStyles("sms")} onClick={() => handleButtonClick("sms")}>
            SMS
          </Button>
          
        </VStack>
      )}
    </Box>
  );
};

export default NavBar;
