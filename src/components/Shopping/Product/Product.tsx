/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { IProductItem } from '../../../utils';
import ProductItem from './ProductItem/ProductItem';

const Product = () => {
    const [productItem, setProdcutItem] = useState<IProductItem[]>([]);
    const [categoryItem, setCategoryItem] = useState<[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    let url : string;
    
    useEffect(() => {
        setIsLoading(true);

        // Fetching Category
        const fetchCategory = async () => {
            const categoryResponse = await fetch('https://fakestoreapi.com/products/categories');
            
            if(!categoryResponse.ok){
                throw new Error('Data fetching failed.')
            }
    
            const categoryData = await categoryResponse.json();
            setCategoryItem(categoryData);
        }
        try {
            fetchCategory();
        } catch (error : any) {
            console.log(error.message);  
        }
        setIsLoading(false);
        
        // Fetching Product Item
        const fetchProductItem = async () => {
            if(selectedCategory){
                url = `https://fakestoreapi.com/products/category/${selectedCategory}`;  
            } else {
                url  = 'https://fakestoreapi.com/products/';
            }

            const response = await fetch(url);
            if(!response.ok){
                throw new Error('Data fetching failed.')
            }

            const data = await response.json();
            setProdcutItem(data);
        }
        try {
            fetchProductItem();
        } catch (error : any) {
            console.log(error.message);  
        }
        setIsLoading(false);
    }, [selectedCategory]);

    // Setting value for selected category
    const selectCategoryHandler = (e: { target: { value: string; }; }) => {
        setSelectedCategory(e.target.value)
    }

    return (
        <Container className='py-3'>
            <Row>
                <Col>
                    <h3 className='mb-4'>Products</h3>
                </Col>
            </Row>

            {/* Select Category starts */}
            <Row className='mb-3'>
                <Col>
                    <Form.Select as="select"
                        onChange={selectCategoryHandler}
                        aria-label="Select Category"
                    >
                        <option value=''>Select Category</option>
                        <option value=''>All Product</option>
                        {categoryItem && categoryItem.map((item : string, index) => (
                            <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            {/* Select Category end */}
            
            {/* Product Item starts */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {/* Loader */}
                {productItem.length === 0 && 
                    <div className='text-center w-100'>
                        <Spinner animation="border" variant="primary" role="status"></Spinner>
                    </div>
                }

                {/* Fetching product item from array */}
                {productItem && !isLoading && productItem.map((product) => (
                    <Col key={product.id}>
                        <ProductItem product={product}/>
                    </Col>
                ))}
            </Row>
            {/* Product Item end */}
        </Container>
    )
}

export default Product;