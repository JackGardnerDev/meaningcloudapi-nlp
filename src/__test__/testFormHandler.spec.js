import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing the formHandler functionality", () => {
    test("Checking if handleSubmit function is defined", () => {
        expect(handleSubmit).toBeDefined();
    });

    test("Testing form submission with valid input", () => {
        const event = { preventDefault: jest.fn() };

        document.getElementById = jest.fn().mockReturnValue({ value: "Valid input" });

        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                polarity: "positive",
                subjectivity: "subjective",
                text: "Some text"
            })
        });

        handleSubmit(event);

        expect(fetch).toHaveBeenCalledWith('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: "Valid input" })
        });
    });

});
