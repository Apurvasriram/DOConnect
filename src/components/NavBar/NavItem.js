import { Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NavItem = ({ children, to }) => {
  return (
    <Link
      _hover={{ textDecoration: "none" }}
      as={NavLink}
      to={to}
      _activeLink={{ color: "blue" }}
    >
      {() => (
        <Flex mx={5} fontWeight="bold">
          {children}
        </Flex>
      )}
    </Link>
  );
};

export default NavItem;
