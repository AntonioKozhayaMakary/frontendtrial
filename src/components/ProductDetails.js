import React from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import Magnifier from "react-magnifier";
import { useState, useEffect} from 'react';

var ProductDetail   = ({ Products },props) => {   
    
   
    var { productId } = useParams()
    var ThisProduct = Products.find(Product => Product._id === productId)

    var [CartsRecent, setCartRecent] = useState([]);

	const Add = (Product) => {
        
		if (CartsRecent.length == 0) {
			console.log('adding from 0')
		}
        
		if (CartsRecent.includes(Product) == false && CartsRecent.length == 0) {
			Product.Quantity = 1;
			setCartRecent([Product])
           
            //localStorage.setItem(Product.Title, JSON.stringify(Product));
           // console.log(localStorage.getItem(Product.Title));
           var x = true;
            for (let i = 0; i < localStorage.length; i++) {
                console.log("1")
                console.log(localStorage.key(i));
                console.log("2");
                console.log(Product.Title);

                if(localStorage.key(i)===Product.Title){
                   x = false;
                   break;
                }
              }
              if ( x == true){
                localStorage.setItem(Product.Title, JSON.stringify(Product));
              } 
			return true;
		}
		if (CartsRecent.includes(Product) == false) {
			setCartRecent(prevValue => [...prevValue, Product])
           
            //localStorage.setItem(Product.Title, JSON.stringify(Product));
            // console.log(localStorage.getItem(Product.Title));
            var x = true;
             for (let i = 0; i < localStorage.length; i++) {
                console.log("1")
                console.log(localStorage.key(i));
                console.log("2");
                console.log(Product.Title)
                 if(localStorage.key(i)===Product.Title){
                    x = false;
                    break;
                 }
               }
               if ( x == true){
                 localStorage.setItem(Product.Title, JSON.stringify(Product));
               } 
			return true;
		}
       
	}
    useEffect(() => {
        /*  var x = JSON.stringify(localStorage); */
        // console.log({...localStorage});
        /*  console.log(Object.values(localStorage)); */
        

       /*  for (let arch of archive) {
            console.log(arch);
        }
         */

       /*  const { productId } = useParams()
        const ThisProduct = Products.find(Product => Product._id === productId)

 */
console.log(ThisProduct)
console.log("cant read")
    },)

    return (

        
        <div className="container mt-5 p-5 mb-5 rounded cart">
           {ThisProduct && <div className="row">


                <div className="col-md-6" id="nopadding" style={{ backgroundColor: 'beige' }} >
                    <Magnifier src={ThisProduct.ImgSrc} alt={ThisProduct.Title} height={'100%'} width={'100%'}/>
                </div>
                
                <div className="col-md-6 " id="twentypadding" style={{ textAlign:'center'  }}>
                    <div className='row text-center'>
                        <h2>{ThisProduct.Title}</h2>
                    </div>
                    <br/>
                    <div className='row text-center'>
                        <h5>Description : {ThisProduct.Descr}</h5>
                    </div>
                    <br/>
                    <div className='row text-center'>
                        <h5>Price : {ThisProduct.Price} L.L</h5>
                    </div>
                    <br/>
                    {/* <div className='row text-center'>
                        <h5>Sizes</h5>
                    </div>
                    <br/> */}
                    <div className='row'>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">

                                <button type="button" id="btn" className="btn btn-sm btn-outline-secondary" onClick={()=>{Add(ThisProduct);}} >Add Now</button>

                            </div>
                        </div>
                    </div>
                </div>



            </div> }
        </div>

                  )
}

export default ProductDetail