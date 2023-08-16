import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { RootState } from '../../../../redux';
import { IProductItem } from '../../../../utils';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import './ProductDetail.css';

const ProductDetail = () => {
  
  const params = useParams();
  const [productData, setProductData] = useState<IProductItem>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authState = useSelector((state : RootState) => state.authReducer.isAuthenticated);
  const productObject : IProductItem = {
    id: 0,
    title: '',
    price: 0, 
    description: '',
    category: '',
    image: '',
    rating: {
        rate: 0,
        count: 0,
    }
  };

  useEffect(() => {
      setIsLoading(true);
      
      // Fetching Product Data
      const fetchProductData = async () => {
          const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
          if(!response.ok){
              throw new Error('Data fetching failed.')
          }
          const data = await response.json();
          setProductData(data);
      }
      try {
        fetchProductData();
      } catch (error : any) {
          console.log(error.message);  
      }
      setIsLoading(false);
  }, [params.id]);
    
  return (
    <>
      <Container className='py-3'>
        <Row className='mb-4'>
          <Col>
            <Link to={'/'} className='text-center m-0'>Back to Home</Link>
          </Col>
        </Row>

        {/* Loader */}
        {isLoading && 
          <div className='text-center w-100'>
            <Spinner animation="border" variant="primary" role="status"></Spinner>
          </div>
        }

        {/* Product data */}
        {!isLoading && <Row className='d-flex align-item-center mb-2'>
          <Col xs={12} sm={5} md={6} lg={6} className='text-center'>
            <img className='productImage' src={productData?.image} alt={productData?.title} />
          </Col>
          <Col xs={12} sm={7} md={6} lg={6}>
            <h3>{productData?.title}</h3>
            <h4>Price : ${productData?.price}</h4>
            <h5>Category : {productData?.category}</h5>
            <h5>Rate : {productData?.rating.rate}</h5>
            <h5>Count : {productData?.rating.count}</h5>
            <p>{productData?.description}</p>
            {productObject && <AddToCartButton authState={authState} product={productData? productData : productObject} />}
          </Col>
        </Row>}
      </Container>
    </>
  )
}

export default ProductDetail;