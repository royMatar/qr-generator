import React, { useEffect, useState } from 'react';
import QRCodeSVG from 'qrcode.react';
import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react';

const QRDisplay = ({
  qrRef,
  qrValue,
  size,
  fgColor,
  bgColor,
  errorCorrectionLevel,
  includeMargin,
  logoSrc,
  handleDownloadClick
}) => {
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  
  useEffect(() => {
    // Set a timeout to ensure the QR code is rendered before checking for canvas
    const timer = setTimeout(() => {
      const canvas = qrRef.current?.querySelector("canvas");
      if (canvas) {
        setIsCanvasReady(true);
      }
    }, 100); // Adjust timeout as needed

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [qrValue, size, fgColor, bgColor, errorCorrectionLevel, includeMargin, logoSrc, qrRef]);

  // Determine the button size based on the screen size
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Box textAlign="center" p={4}>
      <Box
        ref={qrRef}
        position="relative"
        display="inline-block"
        p={6}
        borderWidth={2}
        borderRadius="md"
        bg="white"
        boxShadow="lg"
        mb={4}
        borderColor="gray.200"
      >
        <QRCodeSVG
          value={qrValue}
          size={parseInt(size, 10)}
          fgColor={fgColor}
          bgColor={bgColor}
          level={errorCorrectionLevel}
          includeMargin={includeMargin}
          renderAs={logoSrc ? "svg" : "canvas"}
          imageSettings={
            logoSrc
              ? {
                  src: logoSrc,
                  x: null,
                  y: null,
                  height: 50,
                  width: 50,
                  excavate: true,
                }
              : null
          }
        />
      </Box>

      <Flex mt={4} justifyContent="center" gap={4}>
        <Button
          size={buttonSize}
          colorScheme="blue"
          variant="solid"
          onClick={() => handleDownloadClick("png")}
          _hover={{ bg: "blue.600", color: "white" }}
          isDisabled={!isCanvasReady}
        >
          Download as PNG
        </Button>
        <Button
          size={buttonSize}
          colorScheme="blue"
          variant="solid"
          onClick={() => handleDownloadClick("jpeg")}
          _hover={{ bg: "blue.600", color: "white" }}
          isDisabled={!isCanvasReady}
        >
          Download as JPEG
        </Button>
      </Flex>
    </Box>
  );
};

export default QRDisplay;
