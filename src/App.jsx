
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'
import './App.css'

function App() {
    //State
    const [data, setData] = useState([])    // O bien:
    useEffect( () => { setData(db) }, [])   // const [data, setData] = useState(db)

    const [cart, setCart] = useState([])

    function addToCart(item){
        const itemExists = cart.findIndex(elem => elem.id === item.id)

        if (itemExists >= 0) {
            const updatedCart = [...cart]       // ...para no modificar un state tomo una copia
            updatedCart[itemExists].quantity++  // modifico la copia
            setCart(updatedCart)                // y modifico el state con la función predefinida. 
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    return (
        <>
        <Header
            cart={cart}
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
