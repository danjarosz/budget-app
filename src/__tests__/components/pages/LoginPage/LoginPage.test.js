import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from "../../../../components/pages/LoginPage/LoginPage";
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => ({
        dispatch: jest.fn()
    })
}));

test("should render login page", () => {
    const wrapper = shallow(<LoginPage />);
    const component = wrapper.find('[data-test="LoginPage"]');
    expect(component.length).toBe(1);
})

test("should render login button", () => {
    const wrapper = shallow(<LoginPage />);
    const component = wrapper.find('[data-test="LoginButton"]');
    expect(component.length).toBe(1);
})