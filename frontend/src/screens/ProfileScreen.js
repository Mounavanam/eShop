import React, { useState, useEffect } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'


function ProfileScreen() {

    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const userDetails= useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin= useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile= useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    //if user is already logged in , then send them back to their previous page)thru redirect)
    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        } else {
            if(!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch,navigate, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword) {
            setMessage("Passwords do not match")
        }else {
            dispatch(updateUserProfile({
                'id':user._id,
                'name': name,
                'email': email,
                'password':password
            }))
            setMessage('')
        }
    }
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
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
                        type="password"
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' style={{ marginTop: '15px' }}> Update </Button>
            </Form>

        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
      
    </Row>
  )
}

export default ProfileScreen
