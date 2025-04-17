import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Checkout from "../src/Checkout";
import ShoppingPage from "../src/ShoppingPage";
import OrderComplete from "../src/OrderComplete";


const renderWithMemRouter = (items) => {
    
    const url = "/checkout"
    render(
        <MemoryRouter initialEntries={
            [
                {
                    pathname: url, 
                    state: items,
                },
            ]
          } initialIndex={0}>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shopping-page" element={<ShoppingPage />} />
            <Route path="/order-complete" element={<OrderComplete />}/>
          </Routes>
        </MemoryRouter>
      );

    return {
        user: userEvent.setup(),
        // ...render(ui, {wrapper: MemoryRouter})
    }
}   

export default renderWithMemRouter;
