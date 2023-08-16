import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from '../../../redux';
import { authActions } from '../../../redux/authSlice';

const cartIcon = <FontAwesomeIcon icon={faCartShopping} />

const Header : React.FC<{authState : boolean}> = (props) => {

  const cartQuantity = useSelector((state: RootState) => state.cartReducer.totalQuantity);
  const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
  const dispatch = useDispatch();
  
  const logoutHandler = () => {
    dispatch(authActions.setAuthentication(!props.authState));
  }

  return (
    <>
    <Navbar sticky='top' bg="primary" data-bs-theme="dark">
        <Container>
          {/* Logo */}
          <Navbar.Brand>
            <Link className='navbar-brand' to={'/'}>My Cart</Link>
          </Navbar.Brand>

          {/* Navbar link items */}
          <Nav className="justify-content-end">
            {isAuthenticated && 
              <>
                <Link to={'/cart'}>
                  <Button variant="outline-light">
                    {cartIcon} 
                    <Badge className='ms-2' bg="secondary"> {cartQuantity}</Badge>
                  </Button>
                </Link>
                <Link to={'/'} className='ms-2'>
                  <Button variant="outline-light" onClick={logoutHandler}>
                    Logout
                  </Button>
                </Link>
              </>
            }

            {!isAuthenticated && <Link to={'/auth?mode=login'} className='ms-2'>
              <Button variant="outline-light">
                Login / Sign up
              </Button>
            </Link>}
          </Nav>
        </Container>
    </Navbar>
    </>
  )
}

export default Header;