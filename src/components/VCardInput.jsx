import React from 'react';
import { VStack, Input, FormControl, FormLabel,Text } from "@chakra-ui/react";

const VCardInput = ({ vCardDetails, handleVCardChange }) => {
  return (
    <VStack spacing={4} align="stretch" marginBottom="20px">
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Create Your vCard
      </Text>
      <Text fontSize="md" mb={4}>
        A vCard (Virtual Card) is a digital business card that can be shared and scanned easily using QR codes. Please fill out the form below with your contact information. This will generate a vCard QR code that others can scan to save your details directly into their contacts.
      </Text>
      {Object.keys(vCardDetails).map((field) => (
        <FormControl key={field}>
          <FormLabel htmlFor={field} fontWeight="bold">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </FormLabel>
          <Input
            id={field}
            type={field === "email" ? "email" : "text"}
            placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
            value={vCardDetails[field]}
            onChange={handleVCardChange(field)}
            size="lg"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
            padding={4}
          />
        </FormControl>
      ))}
    </VStack>
  );
};

export default VCardInput;
