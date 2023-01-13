import { HashRouter, Routes, Route } from 'react-router-dom'

// pages & components

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import ProductContainer from './components/ProductContainer';
import { useState, useEffect } from 'react';
import ProductDetail from './components/ProductDetails';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart, FaHome, FaTshirt } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Checkout from './components/Checkout';

function App() {

  const [DataProducts, setDataProducts] = useState([]);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://serverbackend-lcx9.onrender.com/api/products')
      const json = await response.json()

      if (response.ok) {
        setProducts(json)
        setDataProducts(json)
      } else {
        console.log("ensa")
      }
    }

    fetchProducts()
  }, [])

  const ChangeProductsList = (Name) => {


    var ChangedProductsList = [];
    for (var i = 0; i < DataProducts.length; i++) {
      if (DataProducts[i].Descr.toLowerCase().includes(Name.toLowerCase())) {
        ChangedProductsList.push(DataProducts[i])
      }
    }
    setProducts(ChangedProductsList);
  }


  return (



    <div className="App">
      <Navbar collapseOnSelect expand="md" style={{ backgroundColor: "#b9d6fe" }}>
        <Container>
          <Navbar.Toggle style={{ color: "#484c4d" }} aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav >
              <Nav.Link id='twentypadding' href="/"><FaHome className='CartIcon' size={25} /></Nav.Link>
              <Nav.Link id='twentypadding' href="/products"><FaTshirt className='CartIcon' size={25} /></Nav.Link>
              <Nav.Link id='twentypadding' href="/cart"><FaShoppingCart className='CartIcon' size={25} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header>
        <div className="container" >

          <h1><b>Bu<br />Mkere</b></h1>

        </div>
      </header>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                <div className="home">
                 {/*  <ProductContainer Products={Products} Search={ChangeProductsList} />
              */}   </div>
              }
            />
            <Route
              path="/products/:productId"
              element={
                <div className="home" >
                  <ProductDetail Products={Products} />
                </div>
              }
            />
            <Route
              path="/cart"
              element={
                <div className="home">
                  <Checkout Products={Products} Search={ChangeProductsList} />
                </div>
              }
            />

            <Route
              path="/products"
              element={
                <div className="home">
                  <ProductContainer Products={Products} Search={ChangeProductsList} />
                </div>
              }
            />

          </Routes>
        </div>
      </BrowserRouter>
      <header>
        <div className="container" >
          <h1 id='footertitle'><b>By Antonio Makary</b></h1>
        </div>
      </header>
    </div>
  );
}

export default App;
