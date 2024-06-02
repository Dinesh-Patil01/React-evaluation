// import { Box, Heading } from "@chakra-ui/react";

// export default function ProductDetails() {
//   return (
//     <Box>
//       <Heading as="h1" size="xl">
//         ProductDetails Page
//       </Heading>
//     </Box>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Box, Button, Spinner, Text, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.example.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const confirmAddToCart = () => {
    toast({
      title: 'Item added to cart',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    setIsDialogOpen(false);
  };

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box maxW="md" mx="auto" mt={10} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Text fontWeight="bold">{product.title}</Text>
      <Text>{product.category}</Text>
      <Text>${product.price}</Text>
      <Text mt={4}>{product.description}</Text>
      <Button colorScheme="teal" mt={4} onClick={handleAddToCart}>
        Add to Cart
      </Button>
      <AlertDialog isOpen={isDialogOpen} onClose={closeDialog}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add to Cart
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to add this item to cart?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={closeDialog}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={confirmAddToCart} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductDetails;
