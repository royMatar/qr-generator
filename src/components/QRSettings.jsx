import React from 'react';
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  HStack,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useBreakpointValue,
} from '@chakra-ui/react';

const QRSettings = ({
  size,
  setSize,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  errorCorrectionLevel,
  setErrorCorrectionLevel,
  includeMargin,
  setIncludeMargin,
  handleLogoChange,
}) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Center display="flex" justifyContent="center" alignItems="center" padding={4}>
      <VStack spacing={5} width="100%" maxW="600px" textAlign="center">
        <HStack
          spacing={isSmallScreen ? 2 : 5}
          flexWrap="wrap"
          justifyContent="space-between"
          width="100%"
        >
          <FormControl id="size" width={isSmallScreen ? "48%" : "47%"}>
            <FormLabel>Size: {size}</FormLabel>
            <Slider
              aria-label="size-slider"
              defaultValue={256}
              value={size}
              onChange={(value) => setSize(value)}
              min={236}
              max={360}
              step={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>

          <FormControl id="includeMargin" width={isSmallScreen ? "48%" : "47%"}>
            <FormLabel>Include Margin:<br></br><span><Switch
              isChecked={includeMargin}
              onChange={() => setIncludeMargin(!includeMargin)}
            /></span></FormLabel>
            
          </FormControl>

          <FormControl id="fgColor" width={isSmallScreen ? "48%" : "47%"}>
            <FormLabel>QR Code Color:</FormLabel>
            <Input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
            />
          </FormControl>

          <FormControl id="bgColor" width={isSmallScreen ? "48%" : "47%"}>
            <FormLabel>Background Color:</FormLabel>
            <Input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </FormControl>

          <FormControl id="errorCorrectionLevel" width={isSmallScreen ? "48%" : "47%"}>
            <FormLabel>Error Correction Level:</FormLabel>
            <Select
              value={errorCorrectionLevel}
              onChange={(e) => setErrorCorrectionLevel(e.target.value)}
            >
              <option value="L">L - Low (7%)</option>
              <option value="M">M - Medium (15%)</option>
              <option value="Q">Q - Quartile (25%)</option>
              <option value="H">H - High (30%)</option>
            </Select>
          </FormControl>

          {/* <FormControl id="logo" width={isSmallScreen ? "48%" : "47%"}>
            <FormLabel>Insert Logo:</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
          </FormControl> */}
        </HStack>
      </VStack>
    </Center>
  );
};

export default QRSettings;
