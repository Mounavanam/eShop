import {Container} from 'react-bootstrap'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'

function App() {
  return (

    
      <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
          <Route path="/" element = {<HomeScreen />} exact/>
          <Route path="/login" element = {<LoginScreen />} exact/>
          <Route path="/register" element = {<RegisterScreen />} exact/>
          <Route path="/profile" element = {<ProfileScreen />} exact/>
          <Route path="/shipping" element = {<ShippingScreen />} exact/>
          <Route path="/payment" element = {<PaymentScreen />} exact/>
          <Route path="/product/:id" element = {<ProductScreen />} exact/>
          <Route path="/cart/:id?" element = {<CartScreen />} exact/>

          </Routes>
        </Container>
      </main>
      <Footer />
      </Router>
    
  );
}

export default App;
