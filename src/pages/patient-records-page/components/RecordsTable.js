import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from "@chakra-ui/react";
  
  import ConditionDetails from "./ConditionDetails";
  
  const RecordsTable = ({ records }) => {
    return (
      <TableContainer padding={5}>
        <Table variant="simple" colorScheme="whatsapp">
          <TableCaption>Patient Records, with detailed overview</TableCaption>
          <Thead>
            <Tr>
              <Th>File Name</Th>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Sex</Th>
              <Th>Phone Number</Th>
              <Th>Condition Details</Th>
              
            </Tr>
          </Thead>
          <Tbody>
            {records.map((patientDetails, index) => {
              return (
                <Tr key={index}>
                  <Td>{patientDetails.pdf}</Td>
                  <Td>{patientDetails.name}</Td>
                  <Td>{patientDetails.age}</Td>
                  <Td>{patientDetails.sex}</Td>
                  <Td>{patientDetails.number}</Td>
                  <Td>
                    <ConditionDetails diseases={patientDetails.diseases} />
                  </Td>
                  
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };
  
  export default RecordsTable;