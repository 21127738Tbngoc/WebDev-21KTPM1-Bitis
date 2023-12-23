import React from 'react';
import "./card.css"
import "../button/buttons.css"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
export const Card = () =>
{
    return (
        <div className="container-fluid">
            <div className="container-xxl">
                <div className="row g-4">
                    {/*{<!-- Product container light -->}*/}
                    <div className="col-xxl-3">
                        <div className=" product-ctn-l">
                            {/*{<!-- Product img -->}*/}
                            <div className="product-img">
                                <img src="/imgs/products/Solace/SOLDEC001.jpg" alt="product-img"/>
                                <span className="label2 tag-md tag-outline">Sale</span>
                            </div>
                            {/*{<!-- Product info -->}*/}
                            <div className="product-info">
                                <h6>Native Iron Chair</h6>
                                <p className="body2 product-cat">Dining Room • Seating</p>
                                <p className="title2 py-1 product-price">$ 4,990</p>
                                <img className="rating-star" src="/imgs/card/rating-4.png" alt="rating"/>
                            </div>
                        </div>
                        {/*{<!-- Product buttons -->}*/}
                        <div className="product-buttons justify-content-between">
                            <a href="#" className="product-btn button2 no-right-border">ADD TO CART</a>
                            <a href="#" className="product-btn button2">VIEW PRODUCT</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)
};

export default Card