import React, { useState, useRef } from "react";
import {
  Box,
  Input,
  VStack,
  Center,
  Stack,
  useBreakpointValue,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import VCardInput from "./VCardInput";
import QRSettings from "./QRSettings";
import QRDisplay from "./QRDisplay";

const QRGenerator = ({ qrType }) => {
  const [inputValue, setInputValue] = useState("");
  const [vCardDetails, setVCardDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    title: "",
    address: "",
    website: "",
  });
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");
  const [includeMargin, setIncludeMargin] = useState(false);
  const [logoSrc, setLogoSrc] = useState(null);
  const qrRef = useRef();
  const toast = useToast();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleVCardChange = (field) => (event) => {
    setVCardDetails({
      ...vCardDetails,
      [field]: event.target.value,
    });
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadClick = (format) => {
    if (format !== "png" && format !== "jpeg") {
      toast({
        title: "Error",
        description: "Unsupported format.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Unsupported format:", format);
      return;
    }

    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) {
      toast({
        title: "Error",
        description: "QR Code canvas not found.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("QR Code canvas not found.");
      return;
    }

    try {
      const dataURL = canvas.toDataURL(`image/${format}`);
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `qrcode.${format}`;
      document.body.appendChild(link); // Append link to the body
      link.click();
      document.body.removeChild(link); // Remove link from the body
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download QR Code.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Failed to download QR Code:", error);
    }
  };

  const generateQrValue = () => {
    switch (qrType) {
      case "text":
        return inputValue;
      case "phone":
        return `tel:${inputValue}`;
      case "email":
        return `mailto:${inputValue}`;
      case "sms":
        return `sms:${inputValue}`;
      case "vcard":
        return `BEGIN:VCARD
VERSION:4.0
FN:${vCardDetails.firstName} ${vCardDetails.lastName}
TITLE:${vCardDetails.title}
TEL:${vCardDetails.phone}
EMAIL:${vCardDetails.email}
ADR:${vCardDetails.address}
URL:${vCardDetails.website}
END:VCARD`;
      default:
        return inputValue;
    }
  };

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  return (
    <Center
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={6}
      py={4}
    >
      <Stack
        direction={
          qrType === "vcard" ? (isLargeScreen ? "row" : "column") : "column"
        }
        spacing={5}
        width="100%"
        maxW="1200px"
      >
        <Box
          flex="1"
          p={4}
          borderWidth={1}
          borderRadius="md"
          boxShadow="sm"
          bg="gray.50"
        >
          {qrType === "vcard" ? (
            <VCardInput
              vCardDetails={vCardDetails}
              handleVCardChange={handleVCardChange}
            />
          ) : (
            <FormControl>
              <FormLabel fontWeight="bold">
                Enter {qrType.charAt(0).toUpperCase() + qrType.slice(1)}:
              </FormLabel>
              <Input
                type={qrType === "email" ? "email" : "text"}
                placeholder={`Enter ${
                  qrType.charAt(0).toUpperCase() + qrType.slice(1)
                }`}
                value={inputValue}
                onChange={handleInputChange}
                size="lg"
                mb={isLargeScreen ? 0 : 4}
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
            </FormControl>
          )}
        </Box>

        <VStack flex="1" spacing={5} align="stretch">
          <Box
            bg="white"
            borderRadius="md"
            boxShadow="md"
            border="1px solid"
            borderColor="gray.200"
            textAlign="center"
          >
            <QRDisplay
              qrRef={qrRef}
              qrValue={generateQrValue()}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              errorCorrectionLevel={errorCorrectionLevel}
              includeMargin={includeMargin}
              logoSrc={logoSrc}
              handleDownloadClick={handleDownloadClick}
            />
          </Box>

          <Box
            bg="white"
            borderRadius="md"
            boxShadow="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <QRSettings
              size={size}
              setSize={setSize}
              fgColor={fgColor}
              setFgColor={setFgColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
              errorCorrectionLevel={errorCorrectionLevel}
              setErrorCorrectionLevel={setErrorCorrectionLevel}
              includeMargin={includeMargin}
              setIncludeMargin={setIncludeMargin}
              handleLogoChange={handleLogoChange}
            />
          </Box>
        </VStack>
      </Stack>
    </Center>
  );
};

export default QRGenerator;
