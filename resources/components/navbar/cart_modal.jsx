import React from 'react'

const Cartmodal = () =>
{
    function closeCartModal() {
        const cartModal = document.querySelector('.navbar-cart')
        cartModal.classList.remove('open-cart-modal');
        console.log(cartModal.classList.value)
        console.log(cartModal.classList.value.search("open-cart-modal"))
    }

    return (
        <div className="position-absolute navbar-cart">
            <div className="cart-list-section">
                <div className="d-flex flex-row-reverse">
                    <h5 className="w-auto cart-close-btn">
                        <img src="/imgs/navbar/close-icon.svg" onClick={closeCartModal}/>
                    </h5>
                </div>
                <h3 className="navbar-cart-title">Shopping Cart</h3>
                <ul className="cart-item-list-section">
                    <li className="d-flex justify-content-between mb-1 cart-item ">
                        <img src="/imgs/product/Livingroom/toro-square-weave-table-lamp.jpg" className="cart-item-img my-2"/>
                        <div className="cart-item-info my-auto">
                            <p className="title2">Singapore Dark Rattan Arm Chair</p>
                            <div className="d-inline">
                                <p className="support d-inline">Size M</p>
                                <p className="d-inline">|</p>
                                <p className="support d-inline">Black</p>
                                <p className="d-inline">|</p>
                                <p className="support d-inline">SKU 001</p>
                            </div>
                            <div className="mt-2">
                                <p className="d-inline">$ 1,500</p>
                                <div className="d-inline cart-item-quantity mx-3">
                                    <img src="/imgs/navbar/minus.svg"/>
                                    <p className="p3 d-inline">2</p>
                                    <img src="/imgs/navbar/plus.svg"/>
                                </div>
                                <p className="d-inline">$ 3,000</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <a href="#">
                                <button className="outline-i-btn i-btn-sm">
                                    <img src="/imgs/navbar/trashcan.svg"/>
                                </button>
                            </a>
                        </div>
                    </li>
                    <li className="d-flex justify-content-between mb-1 cart-item ">
                        <img src="/imgs/product/Livingroom/axis-ii-2-piece-sectional-sofa.jpg" className="cart-item-img my-2"/>
                        <div className="cart-item-info my-auto">
                            <p className="title2">Singapore Dark Rattan Arm Chair</p>
                            <div className="d-inline">
                                <p className="support d-inline">Size M</p>
                                <p className="d-inline">|</p>
                                <p className="support d-inline">Black</p>
                                <p className="d-inline">|</p>
                                <p className="support d-inline">SKU 001</p>
                            </div>
                            <div className="mt-2">
                                <p className="d-inline">$ 1,500</p>
                                <div className="d-inline cart-item-quantity mx-3">
                                    <img src="/imgs/navbar/minus.svg"/>
                                    <p className="p3 d-inline">2</p>
                                    <img src="/imgs/navbar/plus.svg"/>
                                </div>
                                <p className="d-inline">$ 3,000</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <a href="#">
                                <button className="outline-i-btn i-btn-sm">
                                    <img src="/imgs/navbar/trashcan.svg"/>
                                </button>
                            </a>
                        </div>
                    </li>
                    <li className="d-flex justify-content-between mb-1 cart-item ">
                        <img src="/imgs/product/Livingroom/tate-walnut-80-media-console.jpg" className="cart-item-img my-2"/>
                        <div className="cart-item-info my-auto">
                            <p className="title2">Singapore Dark Rattan Arm Chair</p>
                            <div className="d-inline">
                                <p className="support d-inline">Size M</p>
                                <p className="d-inline">|</p>
                                <p className="support d-inline">Black</p>
                                <p className="d-inline">|</p>
                                <p className="support d-inline">SKU 001</p>
                            </div>
                            <div className="mt-2">
                                <p className="d-inline">$ 1,500</p>
                                <div className="d-inline cart-item-quantity mx-3">
                                    <img src="/imgs/navbar/minus.svg"/>
                                    <p className="p3 d-inline">2</p>
                                    <img src="/imgs/navbar/plus.svg"/>
                                </div>
                                <p className="d-inline">$ 3,000</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <a href="#">
                                <button className="outline-i-btn i-btn-sm">
                                    <img src="/imgs/navbar/trashcan.svg"/>
                                </button>
                            </a>
                        </div>
                    </li>
                </ul>
                <div className="d-flex justify-content-between align-content-center cart-total-section">
                    <p className="cart-total">TOTAL</p>
                    <h4>$ 4,895</h4>
                </div>
                <div className="d-flex">
                    <button className="prim-btn btn-md w-50 me-2">VIEW CART</button>
                    <button className="sec-btn btn-md w-50">CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default Cartmodal