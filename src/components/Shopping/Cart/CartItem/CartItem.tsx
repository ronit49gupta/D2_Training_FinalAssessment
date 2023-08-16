import { Card, Button } from 'react-bootstrap'
import { ICartItem } from '../../../../utils'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../../redux/cartSlice';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const addIcon = <FontAwesomeIcon icon={faPlus} />
const removeIcon = <FontAwesomeIcon icon={faMinus} />

const CartItem : React.FC<{cartItem: ICartItem}> = (props) => {
  const dispatch = useDispatch();

  const onRemoveHandler = () => {
    dispatch(cartActions.removeFromCart({
      id: props.cartItem.id,
    }))
  }

  const onAddHandler = () => {
    dispatch(cartActions.addToCart({
      id: props.cartItem.id,
      name: props.cartItem.name,
      price: props.cartItem.price
    }))
  }

  return (
    <Card className='mb-3'>
      <Card.Header>
          <Card.Title>
            {props.cartItem.name}
          </Card.Title>
        </Card.Header>
      <Card.Body>
        <Card.Text className='mt-1 mb-1'>
          <b>Price :</b> ${props.cartItem.price}
        </Card.Text>
        <Card.Text className='mt-1 mb-1'>
          <b>Quantity :</b> {props.cartItem.quanity}
        </Card.Text>
        <Card.Text className='mt-1 mb-3'>
          <b>Total Price :</b> ${props.cartItem.totalPrice.toFixed(2)}
        </Card.Text>

        {/* Add and remove item buttons */}
        <Button variant="danger" onClick={onRemoveHandler}>{removeIcon}</Button>
        <Button className='ms-2' variant="success" onClick={onAddHandler}>{addIcon}</Button>
      </Card.Body>
    </Card>
  )
}

export default CartItem