

const Cartbar = ({quantity}) => {
    return(
        <div data-testid="cart-bar"> 
            {
                (quantity == 0) ? <p>Uh oh! Looks like the cart is empty</p>  : <ul></ul>
            }
        </div>
    )
}

export default Cartbar;