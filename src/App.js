import logo from './logo.svg';
import React, { useState } from 'react';
import initialProduct from "./products.json";
import './App.css';

// *************************** Jedes einzelne Produkt ***************************

const ProductCard = function({ product, handleClick }) {
  const [openMenu, setOpenMenu] = useState(false)

  const cardOpen = () => {
    setOpenMenu(true)
  }

  const closeMenu = () => {
    setOpenMenu(false)
  }

  return (
    <li key={product.id} className="productCard"
      style={{
        listStyle: "none",
        display: "inline-block",
        margin: "2rem",
        height: "100%",
      }}
    >
      <div style={{ backgroundColor: "lightblue" }}>
        <div
          style={{
            padding: ".5rem",
            fontSize: "1.5rem",
            fontWeight: "700",
          }}
        >
          {product.title}
        </div>
        <div
          style={{
            color: "blue",
            fontSize: "1.2rem",
            fontWeight: "500",
            paddingLeft: "1.5rem",
            paddingBottom: "1rem",
          }}
        >
          {product.price}€
        </div>
        <img
          src={product.images}
          alt={product.description}
          style={{
            display: "block",
            maxWidth: "100%",
            textAlign: "center",
          }}
        />
        {openMenu && (
          <div style={{ whiteSpace: 'pre-line' }}> 
            <span>Beschreibung: {product.description}</span> <span>Preis: {product.price} €</span>
            <span >Auf Lager</span>
            <button onClick={closeMenu} style={{cursor: "pointer"}}>Close</button>
          </div>)}
        <button
          onClick={() =>
            handleClick(product.id, product.title, product.price)
          }
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            fontWeight: "600",
            fontSize: "1.2rem",
            border: "1px solid black",
            cursor: "pointer",
            display: "inline-block"
          }}
          className="addButton"
        >
          Hinzufügen
        </button>
        <button style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          width: "50%",
          marginLeft: ".4rem",
          fontWeight: "600",
          fontSize: "1.1rem",
          border: "1px solid black",
          cursor: "pointer",
          display: "inline-block"
        }}
        onClick={cardOpen}
        className="addButton">
          Mehr Informationen...
        </button>
      </div>
    </li>
  );
};

// *************************** Warenkorb ***************************

const Cart = function({ cart, handleDelete }) {
  return (
    <div key={cart.id} className='cart'>
      Name: {cart.name} Preis: {cart.price}{' '}
      <button onClick={() => handleDelete(cart.id)}  style={{
        cursor: "pointer"
      }}>Löschen</button>
    </div>
  );
};

// *************************** Main App ***************************

function App() {
const [products, setProducts] = React.useState(initialProduct.products)
const [count, setCount] = React.useState(0)
const [cart, setCart] = React.useState([])
const [openCart, setOpenCart] = React.useState(false)


const handleDelete = id => {
  const indexToRemove = cart.findIndex(item => item.id === id);

  if (indexToRemove !== -1) {
    const newArray = [...cart.slice(0, indexToRemove), ...cart.slice(indexToRemove + 1)];
    setCart(newArray);
  }
  setCount(count - 1);
};

function handleClick(id, title, price) {
  setCount(count + 1);
  setCart((prevCart) => [
    ...prevCart, {
      id: id,
      name: title,
      price: price + " €"
    }
  ])
};

const handleCart = function() {
  setOpenCart(true)
};

const closeCart = function() {
  setOpenCart(false)
}



  return (
      <div className='App'>
      <h1 className="hl" style={{
        paddingTop: ".5rem",
        paddingLeft: "2rem",
        color: "white",
        marginBottom: "1.5rem"
        }}>
          Obst-Kurier
      </h1>
      <div style={{
        display: "block",
        fontSize: "1.4rem",
        fontWeight: "600",
        textAlign: "center",
        color: "white"
        }}>
        <div onClick={handleCart} 
        className='itemsBtn'
        style={{
          display: "inline",
          border: "none",
          cursor: "pointer",
          color: "white",
          border: "1px solid white",
          paddingLeft: ".3rem",
          paddingRight: ".3rem",
          marginRight: ".5rem"
          }}>Items
        </div>:<span style={{
          display: "inline-block",
          marginLeft: ".5rem"}}>{count}</span>
      </div>
      {openCart && (<div className='cart' style={{
        width: "500px",
        height: "250px",
        border: "1px solid black",
        fontSize: ".8rem"
      }}>
        <button onClick={closeCart} className="closeBtn" style={{
          float: "right",
          margin: ".6rem",
          border: "1px solid black",
          backgroundColor: "#fff",
          cursor: "pointer",
          padding: ".3rem",
          fontWeight: "700"
          }}>Close</button>
        {cart.map((x) => (
        <Cart cart={x} handleDelete={handleDelete}/>
      ))}
      </div>)}
       
      {products.map((x) => (
        <ProductCard product={x} handleClick={handleClick} />
      ))}
      </div>
  );
}

export default App;