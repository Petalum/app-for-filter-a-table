import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import studentsReducer from '../src/redux/students-reducer';
import { getCellsNames } from '../src/components/common/func/functions';
import CellsTest from '../tests/CellsTest';

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const item = [
  {
    name: 'Maria',
    surname: 'Vasileva'
  },
  {
    name: 'Jane',
    surname: 'Brown'
  }
]

describe("students-reducer", () => {
  test("it shows a name of a student", () => {
    const ADD_STUDENT = 'ADD_STUDENT';
    const action = {
      type: ADD_STUDENT,
      item
    }
    let state = {
      students: [],
    };
    let result = studentsReducer(state, action);
    expect(result.students[1].name).toBe("Jane");
  })
});

describe("getCellsNames", () => {
  test("it shows text for table cells", () => {
    const names = ['name', 'surname', 'birthday'];
    const cells = getCellsNames(names, item);
    act(() => {
      render(<CellsTest cellsNames={cells} />, container);
    });
    const listOfNames = container.querySelector('.listOfNames');
    expect(listOfNames.firstChild.textContent).toBe('Maria');
  })
});







