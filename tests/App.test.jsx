import App from "../src/App"
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ShoppingPage from "../src/ShoppingPage";

describe("App component", ()=>{
    it("renders front page with an enter button", ()=>{
        render(
            <MemoryRouter>
              <App />
            </MemoryRouter>
          );

        expect(screen.getByRole("button", {name: /Enter/i})).toBeInTheDocument();
    });
    it("button changes to shopping-page", async () =>{
        render(
            <MemoryRouter initialEntries={['/']}>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/shopping-page" element={<ShoppingPage />} />
              </Routes>
            </MemoryRouter>
          );

        expect(screen.getByText(/Welcome to The Mart Cart/i)).toBeInTheDocument();

        const user = userEvent.setup();
        const button = screen.getByRole("button")

        await user.click(button);
        expect(screen.getByTestId("entered-store")).toBeInTheDocument();
        const emptyCartMessage = await screen.findByText(/looks like the cart is empty/i);
        expect(emptyCartMessage).toBeInTheDocument();
        expect(screen.getByTestId("cart-bar")).toBeInTheDocument();
    })
  })