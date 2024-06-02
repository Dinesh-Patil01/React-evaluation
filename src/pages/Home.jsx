import { useState, useEffect } from "react"
import axios from "axios"
import {Link} from 'react-router-dom'
import LoadingIndicator from "../components/LoadingIndicator"
import ErrorIndicator from "../components/ErrorIndicator"
import {
   Button,
   Container,
   SimpleGrid,
   Box,
   Flex,
   Heading,
   Select,
   HStack,
 } from "@chakra-ui/react";

export default function Home(){
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sortOrderValue, setSortOrderValue] = useState("");
    const [filterValue, setFilterValue] = useState("");  
    
     
     async function fetchDataUpdate(){
        setLoading(true)
        try{
            const res = await axios({
                method: 'get',
                url : 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products'
            })
            setData(res?.data.data)
            setLoading(false)
            
        }
        catch(error){
           setError(true)
           setLoading(false)
        }
     }

     useEffect(()=>{
        fetchDataUpdate()
     },[])
       console.log(data);

     if(loading){
        return(<LoadingIndicator />)
     }
     if(error){
        return(< ErrorIndicator />)
     }

    return(
    <>
    <Box>
      <Heading align="center">HOME PAGE</Heading>
    </Box>
    <Container maxW="container.xl">
        <Flex justify="end">
        <HStack spacing={4} my={4}>
            <Select
               placeholder="Sort by Price"
               value={sortOrderValue}
               onChange={(e) => {
                  setSortOrderValue(e.target.value);
               }}
            >
               <option value="asc">Low to High</option>
               <option value="desc">High to Low</option>
            </Select>
            <Select
               placeholder="Filter by Category"
               value={filterValue}
               onChange={(e) => setFilterValue(e.target.value)}
            >
               <option value="men">Men</option>
               <option value="women">Women</option>
               <option value="kids">Kids</option>
               <option value="home decor">Home Decor</option>
            </Select>
         </HStack>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
         {data.map(product=>(
               <div key={product.id} style={{border:'2px solid', height:"130px"}}>
                  <h2>Title : {product.title}</h2>
                  <h3>Category : {product.category}</h3> 
                  <h3>Price:{product.price}</h3>
                  <Link to='/Product-Details'>
                     <Button variant="outline" colorScheme="red"> More Details...</Button>
                     </Link>
               </div>
            ))} 
         </SimpleGrid>
      </Container>
           
    </>
    )
}