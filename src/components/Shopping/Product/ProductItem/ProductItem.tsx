
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux';
import { IProductItem } from '../../../../utils';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import './ProductItem.css';

const ProductItem : React.FC<{product: IProductItem}> = (props) => {
    const authState = useSelector((state : RootState) => state.authReducer.isAuthenticated);

    return (
        <Card className='h-100'>
            <Card.Img variant="top" src={props.product.image}  />
            <Card.Body>
                <Card.Title><Link to={`/products/${props.product.id.toString()}`}>{props.product.title}</Link></Card.Title>
                <Card.Subtitle className='mt-1 mb-2'>
                    <b>Price :</b> ${props.product.price}
                </Card.Subtitle>
                <Card.Subtitle className='mt-1 mb-2'>
                    <b>Category :</b> {props.product.category.toUpperCase()}
                </Card.Subtitle>
                <Card.Subtitle className='mt-1 mb-2'>
                    <b>Rating :</b> {props.product.rating.rate}
                </Card.Subtitle>
                {/* <Card.Text>{props.product.rating.count}</Card.Text> */}
                <Card.Text>{props.product.description}</Card.Text>
                
            </Card.Body>

            <Card.Footer className="text-center">
                {/* Add to cart button */}
                <AddToCartButton product={props.product} authState={authState}/>
            </Card.Footer>
        </Card>
    )
}

export default ProductItem;