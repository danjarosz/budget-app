import React from "react";
import { shallow } from "enzyme";
import Header from "../../../../components/layout/Header/Header";
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => ({
        dispatch: jest.fn()
    })
}));

test("should render Header component", () => {
    const wrapper = shallow(<Header />)
    const component = wrapper.find('[data-test="Header"]')
    expect(component.length).toBe(1)
})

describe("Heading", () => {
    let wrapper = null;
    let component = null;
    beforeEach(() => {
        wrapper = shallow(<Header />)
        component = wrapper.find('[data-test="heading"]')
    })

    test("should render h1", () => {
        expect(component.length).toBe(1)
    })

    test("h1 should have correct text", () => {
        const expectedText = "Expensify";
        expect(component.text()).toBe(expectedText)
    })
})

describe("NavLink to dashboard", () => {
    let wrapper = null;
    let component = null;

    beforeEach(() => {
        wrapper = shallow(<Header />)
        component = wrapper.find('[data-test="link-dashboard"]')
    })

    test("should render NavLinkt to dashboard", () => {
        expect(component.length).toBe(1)
    })

    test("should have correct to param", () => {
        const expectedTo = "/dashboard"
        expect(component.prop("to")).toBe(expectedTo)
    })
})

describe("Logout button", () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<Header />);
    })

    test("should render logout button", () => {
        const logoutButton = wrapper.find('[data-test="logout-button"]');
        expect(logoutButton.length).toBe(1);
    });
})