import React from "react";
import { shallow } from "enzyme"
import ExpenseForm from "../../../components/ExpenseForm/ExpenseForm"

test("should render ExpenseFrom component", () => {
    const wrapper = shallow(<ExpenseForm />);
    const component = wrapper.find('[data-test="ExpenseForm"]');
    expect(component.length).toBe(1)
})

describe("should render basic ExpenseForm component elements", () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<ExpenseForm />);
    })

    test("should render form", () => {
        const component = wrapper.find('[data-test="ExpenseForm"]');
        expect(component.length).toBe(1)
    })
    test("should not render error meassage", () => {
        const component = wrapper.find('[data-test="error-message"]');
        expect(component.length).toBe(0)
    })
    test("should render descripton input", () => {
        const component = wrapper.find('[data-test="description-input"]');
        expect(component.length).toBe(1)
    })

    test("should render amount input", () => {
        const component = wrapper.find('[data-test="amount-input"]');
        expect(component.length).toBe(1)
    })

    test("should render date picker", () => {
        const component = wrapper.find('[data-test="picker"]');
        expect(component.length).toBe(1)
    })

    test("should render note textarea", () => {
        const component = wrapper.find('[data-test="note-textarea"]');
        expect(component.length).toBe(1)
    })

    test("should render submit button", () => {
        const component = wrapper.find('[data-test="submit-button"]');
        expect(component.length).toBe(1)
    })
})

describe("Error message", () => {
    test("should render error for invalid submission", () => {
        const wrapper = shallow(<ExpenseForm />);
        const form = wrapper.find('[data-test="ExpenseForm"]');
        form.simulate("submit", { preventDefault: () => { } });
        expect(wrapper.state('error').length).toBeGreaterThan(0);
        const errorMessageParagraph = wrapper.find('[data-test="error-message"]');
        expect(errorMessageParagraph.length).toBe(1);
    })
})

test("Should change description on input change", () => {
    const value = "this is new description";
    const wrapper = shallow(<ExpenseForm />);
    const descriptionInput = wrapper.find('[data-test="description-input"]');
    expect(descriptionInput.length).toBe(1);
    descriptionInput.simulate('change', {
        target: { value, name: "description" }
    });
    expect(wrapper.state("description")).toBe(value);
})

test("Should set note on textarea change", () => {
    const value = "my note"
    const wrapper = shallow(<ExpenseForm />);
    const noteTextarea = wrapper.find('[data-test="note-textarea"]');
    expect(noteTextarea.length).toBe(1);
    noteTextarea.simulate('change', { target: { value, name: "note" } })
    expect(wrapper.state('note')).toBe(value)
})

describe("Amount input", () => {
    test("should set amount if valid input", () => {
        const value = "23.50"
        const wrapper = shallow(<ExpenseForm />);
        const amountInput = wrapper.find('[data-test="amount-input"]');
        expect(amountInput.length).toBe(1);
        amountInput.simulate('change', { target: { value, name: "amount" } })
        expect(wrapper.state("amount")).toBe(value)
    })

    test("should not set amount if invalid input", () => {
        const value = "23.555"
        const wrapper = shallow(<ExpenseForm />);
        const amountInput = wrapper.find('[data-test="amount-input"]');
        expect(amountInput.length).toBe(1);
        amountInput.simulate('change', { target: { value, name: "amount" } })
        expect(wrapper.state("amount")).toBe("")
    })
})

test("should call onSubmit prop for valid form submittion", () => {
    const expense = {
        id: "1",
        description: "Gum",
        note: "",
        amount: 195,
        createdAt: 0
    }
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expense} onSubmit={onSubmitSpy} />);
    const form = wrapper.find('[data-test="ExpenseForm"]');
    form.simulate("submit", { preventDefault: () => { } });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expense.description,
        amount: expense.amount,
        note: expense.note,
        createdAt: expense.createdAt
    });
})