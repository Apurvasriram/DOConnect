import { Box } from "@chakra-ui/react";

const GlobalBg = () => (
  <Box
    pointerEvents={"none"}
    position="fixed"
    top={0}
    bottom={0}
    left={0}
    right={0}
    backgroundImage="url('GlobalBg.png')"
    backgroundSize={"contain"}
  />
);

export default GlobalBg;
