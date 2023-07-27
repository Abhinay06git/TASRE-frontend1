import { Container } from 'react-bootstrap'
import React from 'react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'









function App() {
  return (
    <Router>
 
   <Header />
   <main className="py-3">
    <Container>
    
      <Routes>
      
       <Route path='/' element={<HomeScreen />} />
       <Route path='/product/:id' element={<ProductScreen />} />
       <Route path='/cart/:id?' element={<CartScreen />} />

       </Routes>
    </Container>
   </main>
   
  
    <Footer />
  
   </Router>
 
  
  );
}

export default App;
