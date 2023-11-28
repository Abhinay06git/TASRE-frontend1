import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { login } from '../actions/userActions'
import { useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function LoginScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    
    

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])
    

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted')
        
    }
  return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>

            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?<Link 
                        to={redirect? `/register?redirect=${redirect}` : '/register'}>
                            Register
                            </Link>
                
                </Col>

            </Row>
        </FormContainer>
  )
}

export default LoginScreen