import React, { useState, useEffect } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function RegisterScreen() {
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    //if user is already logged in , then send them back to their previous page)thru redirect)
    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword) {
            setMessage("Passwords do not match")
        }else {
            dispatch(register(name,email,password))
        }
    }
  return (
    <FormContainer>
          <h1>Sign In</h1>
          {message && <Message variant='danger'>{message}</Message> }
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="name"
                        placeholder='enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label> Email Adress</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder='enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder='enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' style={{ marginTop: '15px' }}> Register </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                        </Link>
                </Col>
            </Row>
      
    </FormContainer>
  )
}

export default RegisterScreen
