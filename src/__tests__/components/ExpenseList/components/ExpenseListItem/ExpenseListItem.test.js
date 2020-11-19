import React from 'react';
import { shallow } from "enzyme";
import ExpenseListItem from "../../../../../components/ExpenseList/components/ExpenseListItem/ExpenseListItem"

const expense = {
    id: "1",
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: 0
}

test("should render ExpenseListItem", () => {
    const wrapper = shallow(<ExpenseListItem {...expense} />);
    const component = wrapper.find('[data-test="ExpenseListItem"]');
    expect(component.length).toBe(1);
})