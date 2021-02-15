export const getKeys = (arr) => {
  let arrOfKeys = [];
  for (let i = 0; i < arr.length; i++) {
    if (i > 0) break;
    for (let key of Object.keys(arr[i])) {
      arrOfKeys = [...arrOfKeys, key];
    }
    return arrOfKeys;
  }
}

export const getCellsNames = (itemsArr, columns) => {
  let result = [];
  if (itemsArr.length && columns.length) {
    for (let i = 0; i < itemsArr.length; i++) {
      for (let [columnKey, columnValue] of Object.entries(columns[0])) {
        if (itemsArr[i] === columnKey) {
          result = [...result, { dataField: columnKey, text: columnValue }]
        }
      }
    }
  }
  return result;
}

export const passCurrentIndexesInArray = (fullArr, index) => {
  let filteredArr = [];
  for (let i = 0; i < fullArr.length; i++) {
    for (let j = 0; j < index.length; j++) {
      if (i === index[j]) break;
      if (j === (index.length - 1)) {
        filteredArr = [...filteredArr, fullArr[i]];
      }
    }
  }
  return filteredArr;
}

export const passCurrentItemsInArray = (fullArr, arrWithPassItems) => {
  let filteredArr = [];
  for (let i = 0; i < fullArr.length; i++) {
    for (let j = 0; j < arrWithPassItems.length; j++) {
      if (fullArr[i] === arrWithPassItems[j]) break;
      if (j === (arrWithPassItems.length - 1)) {
        filteredArr = [...filteredArr, fullArr[i]];
      }
    }
  }
  return filteredArr;
}

export const comparePreviousAndFreshValues = (previous, fresh) => {
  let changedValues = new Map();
  for (let i = 0; i < previous.length; i++) {
    if (previous[i] !== fresh[i]) {
      if (i > fresh.length) break;
      changedValues.set(previous[i], fresh[i]);
    }

  }
  return changedValues;
}

export const clearArrayFromIdenticalValues = (arr) => {
  let set = new Set();
  arr.map(p => set.add(p));
  arr = Array.from(set);
  return arr;
}

export const chooseItemsFromArrayOfObjects = (arr, mark) => {
  let marksArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let [key, value] of Object.entries(arr[i])) {
      if (key === mark) {
        if (typeof value === 'object') {
          marksArr.push(...value);
        }
        else {
          marksArr.push(value);
        }
      }
    }
  }
  return marksArr;

}

export const compareObjects = (prevObject, controlObject) => {
  let arr = [];
  for (let [key, value] of Object.entries(prevObject)) {
    for (let [k, v] of Object.entries(controlObject)) {
      if (key === k && value !== v) {
        arr = [...arr, v];
      }
    }
  }
  return arr;
}