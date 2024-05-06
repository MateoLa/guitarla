
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'
import './App.css'

function App() {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //State
    const [data, setData] = useState([])    // O bien:
    useEffect(() => { setData(db) }, [])   // const [data, setData] = useState(db)

    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)), [cart] })
    // useEffect, para efectos secundarios cada vez que el state cambia.
    // Se usa este hook porque las funciones y el state son asíncronos


    function addToCart(item){
        const itemExists = cart.findIndex(elem => elem.id === item.id)
        if (itemExists >= 0){
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]       // ...para no modificar un state tomo una copia
            updatedCart[itemExists].quantity++  // modifico la copia
            setCart(updatedCart)                // y modifico el state con la función predefinida. 
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id){
        setCart( prevCart => prevCart.filter(guitar => guitar.id !== id) )
    }
    // Cuando modifico el carrito, todos los hooks que lo tengan como dependencia se ejecutarán.
    // cartTotal y isEmpty son evaluados renderizando los cambios correspondientes.

    function increaseQuantity(id){
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id){
        const updatedCart = cart.map( item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart(){
        setCart([])
    }

    return (
        <>
        <Header
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
        />
  
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>
            <div className="row mt-5">
                {data.map( (guitar) => (
                    <Guitar 
                        key = {guitar.id}   // Los componentes deben tener una key única
                        guitar = {guitar}
                        addToCart = {addToCart} />
                ))}
            </div>
        </main>

        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
        </>
    )
}

export default App


// return acepta sólo Expresiones !!!! 
// (no acepta sentencias commo loop o while)
// .map es una expresión xq debuelve un valor. (igual .filter)
