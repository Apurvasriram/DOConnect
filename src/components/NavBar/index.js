import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { GiStethoscope } from "react-icons/gi";

import NavItem from "./NavItem";
import LogOutBtn from "../AuthModifierBtn";
import { useAuthContext } from "../../providers/AuthProvider";

const NavBar = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <Flex
        zIndex="navBar"
        backgroundColor={"white"}
        position="sticky"
        top={0}
        as="nav"
        w="full"
        justifyContent="space-between"
        p={5}
        borderBottom={"navBar"}
      >
        <Flex alignItems="center" mx={5}>
          <Link to="/">
            <Flex alignItems="center">
              <Icon boxSize={8} as={GiStethoscope} />
              <Box mx={2}>
                <Heading variant="h2">DOConnect</Heading>
              </Box>
            </Flex>
          </Link>
          <Flex alignItems="center" mx={2}>
            {isLoggedIn && <NavItem to="/feed">Feed</NavItem>}
            {/* <NavItem to="/events">Events</NavItem> */}
            {isLoggedIn && (
              <NavItem to="/patient-records">Patient Records</NavItem>
            )}
          </Flex>
        </Flex>
        <Flex alignItems="center">
          {isLoggedIn && (
            <NavItem to="/profile">
              <Icon boxSize={8} as={RxAvatar} />
            </NavItem>
          )}
          <Box>
            <LogOutBtn />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
