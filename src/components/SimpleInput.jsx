import React from "react";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

const SimpleInput = ({ qrType, inputValue, handleInputChange }) => {
  const getDescription = (type) => {
    switch (type) {
      case "text":
        return "Enter any text or URL here. This will be encoded into the QR code, and users can scan it to view the information.";
      case "phone":
        return "Enter a phone number. When someone scans this QR code, it will prompt them to dial the number directly.";
      case "email":
        return "Enter an email address. Scanning the QR code will open the user's default email client with a new email addressed to this email.";
      case "sms":
        return "Enter a phone number to send a text message. Scanning this QR code will open a new text message to the provided number.";
      default:
        return "Enter the relevant information. This will be encoded into the QR code.";
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case "phone":
        return "Phone Number";
      case "email":
        return "Email Address";
      case "sms":
        return "SMS Number";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const getPlaceholder = (type) => {
    switch (type) {
      case "phone":
        return "Enter phone number";
      case "email":
        return "Enter email address";
      case "sms":
        return "Enter SMS number";
      default:
        return `Enter ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    }
  };

  return (
    <>
      <Text mb={2} color="gray.600">
        {getDescription(qrType)}
      </Text>
      <FormControl>
        <FormLabel fontWeight="bold">
          {getLabel(qrType)}:
        </FormLabel>
        <Input
          type={qrType === "email" ? "email" : "text"}
          placeholder={getPlaceholder(qrType)}
          value={inputValue}
          onChange={handleInputChange}
          size="lg"
          mb={4}
          borderColor="gray.200"
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px blue.500",
          }}
        />
      </FormControl>
    </>
  );
};

export default SimpleInput;
