import React, { useState,useEffect, Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import useWindowDimensions from './Window';
import { Link  } from 'react-router-dom';
import Magnifier from "react-magnifier";

const ProductSingle = ({ Product , Pressed }) => {
 
    const { height, width } = useWindowDimensions();
    var [x, setX] = useState("col");
    var [y , setY] = useState();

    useEffect(() => {
		if(width >= 0 && width <= 380){
            setX("col-12");
        }else if (width >= 381 && width <= 800){
            setX("col-6");
        }else{
            setX("col-4");
        }
	}, [width])

    useEffect(() => {
		if(height >= 900 ){
            setY(300);
        }else{
            setY(200);
        }
	}, [height ])
	

    return (
        <div className={"col-lg-3 " +x} id="margin10">
            <div className="card shadow-sm">
                <Magnifier src={Product.ImgSrc} className="img-responsive" width="100%" height={y} alt={Product.Title}  />
                <div className="card-body">
                    <p className="card-text"><b>{Product.Title}</b></p>
                   {/* <p className="card-text">{Product.Descr.slice(0, 100)}</p> */}
                    <p className="card-text"><b>{Product.Price} L.L</b></p>
                    <Link style={{textDecoration: "none"}} to={`${Product._id}`}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                      
                            <button type="button" id="btn" className="btn btn-sm btn-outline-secondary" onClick={Pressed} >View</button>
                       
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export {ProductSingle}
