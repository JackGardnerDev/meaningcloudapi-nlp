import { checkForName } from "../src/client/js/nameChecker";

describe("Testing the nameChecker functionality", () => {
    test("Checking if checkForName function is defined", () => {
        expect(checkForName).toBeDefined();
    });

    test("Testing with a valid name", () => {
        const inputText = "Picard";
        const expectedOutput = "Welcome, Captain!";
        expect(checkForName(inputText)).toEqual(expectedOutput);
    });

    test("Testing with an invalid name", () => {
        const inputText = "Spock";
        expect(checkForName(inputText)).toBeUndefined();
    });
});
