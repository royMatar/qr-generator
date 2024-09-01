import React from 'react';
import { VStack, Input, FormControl, FormLabel } from "@chakra-ui/react";

const VCardInput = ({ vCardDetails, handleVCardChange }) => {
  return (
    <VStack spacing={4} align="stretch" marginBottom="20px">
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
