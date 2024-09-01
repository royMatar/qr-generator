import QRGenerator from "./components/QRGenerator";
import * as React from "react";
import { ChakraProvider, Grid, GridItem, Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
  const [qrType, setQrType] = React.useState("vcard");

  return (
    <ChakraProvider>
      <Box  minH="100vh" >
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 4fr" }}
          alignItems="start"
          justifyContent="center"
        >
          <GridItem
            colSpan={{ base: 1, md: 1 }}
            borderRight={{ base: "none", md: "2px solid gray.700" }}
          >
            <NavBar setQrType={setQrType} />
          </GridItem>
          <GridItem
            colSpan={{ base: 1, md: 1 }}
          >
            <QRGenerator qrType={qrType} />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
