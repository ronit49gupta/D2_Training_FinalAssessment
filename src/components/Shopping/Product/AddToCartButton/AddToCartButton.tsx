import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux';
import { cartActions } from '../../../../redux/cartSlice';
import { IProductItem } from '../../../../utils';

const AddToCartButton : React.FC<{product: IProductItem, authState : boolean}> = (props) => {
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
        if(isAuthenticated){
            dispatch(cartActions.addToCart({
                id: props.product.id,
                name: props.product.title,
                price: props.product.price
            }));
        } else {
            navigate('/auth?mode=login')
        }
    }


  return (
    <Button 
        variant="primary" 
        className='w-100' 
        onClick={addToCartHandler}
    >
        Add to Cart
    </Button>
  )
}

export default AddToCartButton;