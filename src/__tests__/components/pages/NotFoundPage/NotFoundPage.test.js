import React from "react";
import { shallow } from "enzyme";
import NotFoundPage from "../../../../components/pages/NotFoundPage/NotFoundPage";

test("should render NotFoundPage component", () => {
    const wrapper = shallow(<NotFoundPage />)
    const component = wrapper.find('[data-test="NotFoundPage"]')
    expect(component.length).toBe(1)
})