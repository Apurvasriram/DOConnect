import { AddIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
} from "@chakra-ui/react";
import { Fragment } from "react";

const ConditionDetails = ({
  diseases = {
    cholera: 100,
    malaria: 200,
  },
}) => {
  return (
    <Menu>
      <MenuButton variant="ghost" as={Button} rightIcon={<AddIcon />} />
      <MenuList>
        {Object.entries(diseases).map((diseaseArray, index) => {
          return (
            <Fragment key={index}>
              <MenuDivider />
              <MenuItem>{`${diseaseArray[0]} : ${diseaseArray[1]}`}</MenuItem>
            </Fragment>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ConditionDetails;