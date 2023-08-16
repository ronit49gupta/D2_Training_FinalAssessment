import React, { useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { authActions } from '../../redux/authSlice';

const AuthForm : React.FC<{authState : boolean}> = (props) => {
    const [searchParams] = useSearchParams();
    const isLogin =  searchParams.get('mode') === 'login';
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSubmitHandler = (event : React.FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailRef.current!.value.trim();
        const enteredPassword = passwordRef.current!.value.trim();

        if (enteredEmail.length === 0 && enteredPassword.length === 0) {
            alert('Values are empty!');
            return;
        }

        if(!isLogin && enteredEmail.length > 0 && enteredPassword.length > 0) {
            localStorage.setItem('email', enteredEmail);
            localStorage.setItem('password', enteredPassword);
            alert("Account created successfully !!");
            navigate(-1);
        }

        if (isLogin && enteredEmail.length > 0 && enteredPassword.length > 0) {
            if(
                localStorage.getItem('email') === enteredEmail &&
                localStorage.getItem('password') === enteredPassword
            ){
                dispatch(authActions.setAuthentication(!props.authState));
                alert("Successfully logged in!!");
                navigate(-1);
            } else {
                alert("Wrong credentials!");
            }
        }

    }

    const backPageHandler = () => {
        navigate(-1);
    }

  return (
    <Container className='py-3'>
        <Row className='mb-3'>
            <Col>
                <Link onClick={backPageHandler} className='text-center m-0' to={''}>Back to previous page</Link>
            </Col>
        </Row>
        <Row>
            <Col>
                <h3 className='mb-4'>{isLogin ? 'Login' : 'Create a new user'}</h3>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={formSubmitHandler}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            ref={emailRef}
                            type="email"
                            name='email'
                            placeholder="Enter your email" 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            ref={passwordRef} 
                            type="password" 
                            name='password' 
                            placeholder='Enter your password'
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Button variant="success" type='submit'>
                        {isLogin ? "Login" : 'Register'}
                        </Button>
                        <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} className='ms-2'>
                            <Button variant="dark">
                                {isLogin ? "Don't have an account ?" : 'Already have an account'}
                            </Button>
                        </Link>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default AuthForm;