import logo from './logo.svg';
import React, { useState } from 'react';
import initialProduct from "./products.json";
import './App.css';

const ProductCard = function({ product, handleClick }) {
  return (
    <li key={product.id}
      style={{
        listStyle: "none",
        border: "2px solid black",
        display: "inline-block",
        margin: "2rem",
      }}
    >
      <div style={{ backgroundColor: "lightblue" }}>
        <div
          style={{
            margin: "1rem",
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
            width: "100%",
            textAlign: "center",
          }}
        />
        <button
          onClick={() =>
            handleClick(product.id, product.title, product.price)
          }
          style={{
            padding: ".5rem",
            fontWeight: "600",
            fontSize: "1.2rem",
            width: "100%",
            border: "1px solid black",
            background: "lightYellow",
            cursor: "pointer",
          }}
        >
          Hinzufügen
        </button>
      </div>
    </li>
  );
};


const Cart = function({ cart, handleDelete }) {
  console.log(cart)
  return (
    <div key={cart.id}>
      Name: {cart.name} Preis: {cart.price}{' '}
      <button onClick={() => handleDelete(cart.id)}>Löschen</button>
    </div>
  );
};

function App() {
const [products, setProducts] = React.useState(initialProduct.products)
const [count, setCount] = React.useState(0)
const [cart, setCart] = React.useState([])

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
  // const [showCart, setCart] = React.useState(false)
};



  return (
      <>
      <h1 className="hl" style={{
        paddingTop: ".5rem",
        paddingLeft: "2rem"
        }}>
          Obst-Kurier
      </h1>
      <div style={{
        display: "block",
        fontSize: "1.4rem",
        fontWeight: "600",
        textAlign: "center"
        }}>
        <button onClick={handleCart} style={{
          border: "none",
          background: "grey",
          fontSize: "1rem",
          padding: "5px 20px",
          cursor: "pointer"
          }}>Items
        </button>:{count}
      </div>
      <div className='cart' style={{
        width: "500px",
        height: "250px",
        border: "1px solid black",
        fontSize: ".8rem"
      }}>{cart.map((x) => (
        <Cart cart={x} handleDelete={handleDelete}/>
      ))}
      </div> 
      {products.map((x) => (
        <ProductCard product={x} handleClick={handleClick}/>
      ))}
  	 
      </>
  );
}

export default App;
