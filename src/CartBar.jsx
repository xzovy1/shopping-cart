const Cartbar = ({cartItems}) => {
    console.log(cartItems.length)
    return(
        <div data-testid="cart-bar"> 
            {
                (cartItems.length == 0) ? <p>Looks like the cart is empty!</p>  : <ul><li>test</li></ul>
            }
        </div>
    )
}

export default Cartbar;