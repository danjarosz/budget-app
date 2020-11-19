import React from "react";
import { shallow } from "enzyme";
import ExpenseDashboardPage from "../../../../components/pages/ExpenseDashboardPage/ExpenseDashboardPage";

test("should render ExpenseDashboardPage component", () => {
    const wrapper = shallow(<ExpenseDashboardPage />)
    const component = wrapper.find('[data-test="ExpenseDashboardPage"]')
    expect(component.length).toBe(1)
})