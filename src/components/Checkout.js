import 'bootstrap/dist/css/bootstrap.css';

import { useState, useEffect, useRef, Component } from 'react';
import { ProductSingle } from './Product';
import Cart from './Cart';
import { Link } from 'react-router-dom'
import '../index.css'
import { FaCartArrowDown } from 'react-icons/fa';
import { Pressable } from 'react-native';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'



const Checkout = ({ Products, Search }) => {

    function notify() {
        toast.success("Order Confirmed !", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
    }



    const [CartsRecent, setCartRecent] = useState(() => {
        var CartsRecent = [];

        let valuesArray = Object.values(localStorage);


        for (var x = 0; x < valuesArray.length; x++) {
            CartsRecent.push(JSON.parse(valuesArray[x]));
        }

        return CartsRecent;

    });

    const [TotalPrice, setTotalPrice] = useState(0)
    const [Name, setName] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [Email, setEmail] = useState('')
    const [Address, setAddress] = useState('')


    /* const [personAsObjectAgain, setPersonAsObjectAgain] = useState(() => {
        // getting stored value
        var stringifiedPerson = localStorage.getItem('product');
        var personAsObjectAgain = JSON.parse(stringifiedPerson);
        return personAsObjectAgain || "";
    }); */



    const GetSum = (x) => {
        var sum = 0;
        for (var i = 0; i < x.length; i++) {
            sum += x[i].Price * x[i].Quantity
        }
        setTotalPrice(sum);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const order = { Name, Email, Address, PhoneNumber, TotalPrice, CartsRecent, }


        const response = await fetch('https://serverbackend-lcx9.onrender.com/api/orders', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            console.log('failed to add order:', json)
        }
        if (response.ok) {
            console.log('new order added:', json)
            for (var i = 0; i < CartsRecent.length; i++) {
                CartsRecent[i].Quantity = 1;
            }
            setAddress('')
            setCartRecent([])
            setEmail('')
            setName('')
            setPhoneNumber('')
            setTotalPrice(0)
            notify();
            localStorage.clear();

        }

    }


    /* 	const Add = (Product) => {
            if (CartsRecent.length == 0) {
                console.log('adding from 0')
            }
            if (CartsRecent.includes(Product) == false && CartsRecent.length == 0) {
                Product.Quantity = 1;
                setCartRecent([Product])
                return true;
            }
            if (CartsRecent.includes(Product) == false) {
                setCartRecent(prevValue => [...prevValue, Product])
                return true;
            }
    
        } */
    /* 
        const CartPart = "CartPart" */

    useEffect(() => {
        GetSum(CartsRecent);
        //console.log(CartsRecent);
    }, [CartsRecent.length || CartsRecent])


    useEffect(() => {
        /*  var x = JSON.stringify(localStorage); */
        // console.log({...localStorage});
        /*  console.log(Object.values(localStorage)); */
        var archive = [];

        let valuesArray = Object.values(localStorage);


        for (var x = 0; x < valuesArray.length; x++) {
            archive.push(JSON.parse(valuesArray[x]));
        }

       /*  for (let arch of archive) {
            console.log(arch);
        }
        console.log("hza") */

    },)



    return (

        <div>


            <div>

                <div className='covercart'>
                    {CartsRecent && <div id="CartPart" className="container mt-5 p-3 rounded cart ">

                        <div className="d-flex flex-row align-items-center"><b>Shopping cart</b></div>
                        <hr />
                        <h6 className="mb-0"></h6>
                        <div className='container'>

                            {CartsRecent.map((CartRecent, index) => (
                                <Cart Cart={CartRecent} key={index}
                                    Refresh={() => {
                                        GetSum(CartsRecent); Cart.TotalPrice = Cart.Quantity * Cart.Price;
                                        var x = Object.values(CartRecent.Title).join('');
                                        console.log(x);
                                        var z = JSON.parse(localStorage.getItem(x));
                                        console.log(JSON.parse(localStorage.getItem(x)));
                                        z.Quantity = CartRecent.Quantity;
                                        z.TotalPrice = CartRecent.TotalPrice;
                                        localStorage.setItem(x,JSON.stringify(z))
                                        //console.log(localStorage);
                                    }}
                                    Pressed={() => {
                                        setCartRecent(current =>
                                            current.filter(element => {
                                                return element.ImgSrc !== CartRecent.ImgSrc;
                                            }),
                                        );
                                        localStorage.removeItem(CartRecent.Title);

                                    }} />
                            ))}
                            <div className="d-flex flex-row align-items-center"><b>Total Price Of Cart Is {TotalPrice} L.L</b></div>
                        </div>
                    </div>

                    }
                </div>

            </div>


            <div className='covercheckout'>


                <div className="container mt-5 p-3 rounded cart">

                    <div className="d-flex flex-row align-items-center"><b>Checkout </b></div>
                    <hr />
                    <h6 className="mb-0"></h6>
                    <div className='container'>
                        <form className="create" onSubmit={handleSubmit}>


                            <label>Name</label>
                            <input
                                required
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={Name}
                            />

                            <label>Email</label>
                            <input
                                required
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={Email}
                            />

                            <label>Phone Number</label>
                            <input
                                required
                                type="text"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={PhoneNumber}
                            />

                            <label>Address</label>
                            <input
                                required
                                type="text"
                                onChange={(e) => setAddress(e.target.value)}
                                value={Address}

                            />

                            <button id="submit" className="btn btn-sm btn-outline-secondary">Checkout</button>

                            <ToastContainer />
                        </form>

                    </div>
                </div>
            </div>


        </div>


    );
}



export default Checkout

