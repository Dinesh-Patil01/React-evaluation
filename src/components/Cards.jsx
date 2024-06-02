import {
    Box,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    StackDivider,
    Text,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  
  export default function Cards({ id, title, category, price }) {
    const navigate = useNavigate();
  
    //title, status, priority
    return (
      <Card>
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
  
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Category
              </Heading>
              <Text pt="2" fontSize="sm">
                {category}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Price
              </Heading>
              <Text pt="2" fontSize="sm">
                {price}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => {
              navigate(`/productDetails/${id}`);
            }}
          >
            More Details...
          </Button>
        </CardFooter>
      </Card>
    );
  }