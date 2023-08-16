import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row, Modal, Badge, ListGroup } from 'react-bootstrap';
import CartItem from './CartItem/CartItem';
import { RootState } from '../../../redux';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Cart.css';

const Cart  = () => {
  const cartItems = useSelector((state : RootState) => state.cartReducer.items);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const successIcon = <FontAwesomeIcon icon={faCircleCheck} style={{color: "#0f8a27",}} />

  // Calculating order total price
  const priceArr = (cartItems.map(item => item.price));
  let totalPrice: number  = priceArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
  return (
    <>
      <Container className='py-3'>
        <Row className='mb-3'>
          <Col>
            <Link to={'/'} className='text-center m-0'>Back to Home</Link>
          </Col>
        </Row>
        <Row className='mb-2'>
            <Col className='d-flex justify-content-between align-items-center'>

              {/* Heading */}
              <h3 className='text-center m-0'>Cart Items</h3>

              {/* Order button */}
              {
                cartItems.length > 0 && 
                <Button size="lg" variant='success' onClick={handleShow}>Order</Button>
              }
            </Col>
        </Row>
        <Row xs={1} sm={3} md={4} className="g-4">
          <Col className='w-100'>
            {/* if there is no item in cart */}
            {
              cartItems.length === 0 && <h5 className='mb-0'>No items added in cart.</h5>
            }

            {/* Cart Item */}
            {
              cartItems.length > 0 && cartItems.map((item)=> (
                <CartItem key={item.id} cartItem={
                  {id: item.id,
                  name: item.name,
                  price: item.price,
                  quanity: item.quanity,
                  totalPrice: item.totalPrice}}/>
              ))
            }
          </Col>
        </Row>
      </Container>

      {/* Order Modal Start */}
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Order Successfull {successIcon}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Order Details: </h5>
          <ListGroup as="ol" className='mb-2'>
          {
            cartItems.length > 0 && cartItems.map((item)=> (
              <ListGroup.Item
                key={item.id}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="me-auto">
                  <div className="fw-bold">{item.name}</div>
                  ${item.price} * {item.quanity} Nos
                </div>
                <Badge bg="primary" pill>
                  ${item.totalPrice.toFixed(2)}
                </Badge>
              </ListGroup.Item>
          ))}
          </ListGroup>
          <h5 className='mt-3 d-flex order-total-price'>Total Price : ${totalPrice.toFixed(2)}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Order Modal End */}
    </>
  )
}

export default Cart;