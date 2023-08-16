import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../components/Layout/Header/Header'
import Footer from '../components/Layout/Footer/Footer'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'

const ErrorPage = () => {
    const authState = useSelector((state : RootState) => state.authReducer.isAuthenticated);

    return (
      <>
        <Header authState={authState}/>
        <main>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h3 className='text-danger mt-4 mb-2'>Something went wrong!</h3>
                        <Link to={'/'} className='text-center m-0'>Back to Home</Link>
                    </Col>
                </Row>
            </Container>
        </main>
        <Footer />
    </>
  )
}

export default ErrorPage;