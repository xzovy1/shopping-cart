import App from "../src/App"
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Inventory from "../src/Inventory";

describe("App component", ()=>{
    it("renders store front page with an enter button", ()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
              <Routes>
                <Route path="/" element={<App />} />
              </Routes>
            </MemoryRouter>
          );
        
        screen.findByText(/Enter/i)
    });
    it("button changes to store inventory page", async () =>{
        render(
            <MemoryRouter initialEntries={['/']}>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/inventory" element={<Inventory />} />
              </Routes>
            </MemoryRouter>
          );

        expect(screen.getByText(/Welcome to The Mart Cart/i)).toBeInTheDocument();

        const user = userEvent.setup();
        const button = screen.getByRole("button")

        await user.click(button);
        expect(screen.getByText(/Welcome in!/i)).toBeInTheDocument();
    })
})

