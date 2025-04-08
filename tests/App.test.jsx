import App from '../src/App'
import Inventory from '../src/Inventory';
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

describe("App component", ()=>{
    it("renders store front page with an enter button", ()=>{
        render(<App />);
        expect(screen.getByRole("heading").textContent).toMatch(/Welcome to The Mart Cart!/i);
        expect(screen.queryByRole("button").textContent).toMatch(/Enter/i);
        // screen.debug();
    });
    it("button changes to store inventory page", async () =>{
        const user = userEvent.setup();
        render(<App />);
        const button = screen.getByRole("button", {name: "Enter"})
        
        await user.click(button);

        expect(<Inventory />)
    })
})

