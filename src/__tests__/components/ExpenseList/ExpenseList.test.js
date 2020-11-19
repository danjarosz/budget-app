import React from 'react';
import * as redux from "react-redux";
import moment from "moment";
import { shallow } from "enzyme";
import ExpenseList from "../../../components/ExpenseList/ExpenseList";
import { getVisibleExpenses } from "../../../redux/selectors/expenses";

test("should render ExpenseList", () => {
    const expenses = [];
    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined,
    };

    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue(getVisibleExpenses(expenses, filters));

    const wrapper = shallow(<ExpenseList />);
    const list = wrapper.find('[data-test="ExpenseList"]');
    expect(list.length).toBe(1);
});

test("should render no expenses info", () => {
    const expenses = [];
    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined,
    };

    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue(getVisibleExpenses(expenses, filters));

    const wrapper = shallow(<ExpenseList />);
    const noExpensesInfo = wrapper.find('[data-test="noExpensesInfo"]')
    expect(noExpensesInfo.length).toBe(1);
});

test("should render ExpenseList", () => {
    const expenses = [
        {
            id: "1",
            description: "Gum",
            note: "",
            amount: 195,
            createdAt: 0
        }, {
            id: "2",
            description: "Rent",
            note: "",
            amount: 108500,
            createdAt: moment(0).subtract(4, "days").valueOf()
        },
        {
            id: "3",
            description: "Credit card",
            note: "",
            amount: 45000,
            createdAt: moment(0).add(4, "days").valueOf()
        }
    ];

    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined,
    };

    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue(getVisibleExpenses(expenses, filters));

    const wrapper = shallow(<ExpenseList />);
    const component = wrapper.find('[data-test="ExpenseListItem"]')
    expect(component.length).toBe(expenses.length)
});