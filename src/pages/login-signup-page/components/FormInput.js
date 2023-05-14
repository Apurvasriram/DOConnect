import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  Flex,
} from "@chakra-ui/react";

const FormInput = ({
  name,
  error,
  touched,
  value,
  handleBlur,
  handleChange,
  handleReset,
  type,
  label,
  placeholder,
}) => {
  const getCapitalizedName = (input) => {
    const str = input.charAt(0).toUpperCase() + input.slice(1);
    return str;
  };

  const capitalizedName = getCapitalizedName(name);

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={name}>
        <Text fontWeight={"semibold"} variant="heading5">
          {label ?? capitalizedName}
        </Text>
      </FormLabel>
      <Input
        onReset={handleReset}
        id={name}
        type={type}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        border={"input"}
        backgroundColor={"white"}
        placeholder={placeholder ?? `Enter your ${capitalizedName}`}
      />
      <FormErrorMessage>
        <Flex>
          <WarningTwoIcon mr={1} /> {error}
        </Flex>
      </FormErrorMessage>
    </FormControl>
  );
};
export default FormInput;
