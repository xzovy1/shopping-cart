

const Cartbar = ({quantity}) => {
    return(
        <div data-testid="cart-bar"> 
            {
                (quantity == 0) ? <p>Looks like the cart is empty</p>  : <ul></ul>
            }
        </div>
    )
}

export default Cartbar;