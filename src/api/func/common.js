export const getItemFromLocalStorage = (key) => {
  const jsonList = localStorage.getItem(key);
  if (jsonList !== null) {
    const list = JSON.parse(jsonList);
    return list;
  }
  return jsonList;
}

export const setItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
  const result = getItemFromLocalStorage(key);
  return result;
}

export const changeItemInArrayUsingControlItem = (listOfItems, markForControlKey, markForControlValue, valueBag, markForChangingKey, aim) => {
  let index = [];
  if (listOfItems.length) {
    for (let i = 0; i < listOfItems.length; i++) {
      if (markForControlKey !== null) {
        if (listOfItems[i][markForControlKey] !== markForControlValue) continue;
      }
      for (let [prev, fresh] of valueBag.entries()) {
        if (listOfItems[i][markForChangingKey] === prev) {
          aim === 'findIndex' ? index.push(i) : listOfItems[i][markForChangingKey] = fresh;
        }
      }
    }
  }
  if (aim === 'findIndex') return index;
  return listOfItems;
}

export const findItemIndexInArrayUsingControlItem = (listOfItems, markForControlKey, markForControlValue, valueBag, markForChangingKey) => {
  let index = [];
  if (listOfItems.length) {
    for (let i = 0; i < listOfItems.length; i++) {
      if (markForControlKey !== null) {
        if (listOfItems[i][markForControlKey] !== markForControlValue) continue;
      }
      for (let j = 0; j < valueBag.length; j++) {
        if (listOfItems[i][markForChangingKey] === valueBag[j]) {
          index = [...index, i];
        }
      }
    }
  }
  return index;
}

export const findIndexOfCurrentItemInArray = (listOfItems, markValue, mark, aim) => {
  let indexArray = [];
  if (listOfItems.length) {
    for (let i = 0; i < listOfItems.length; i++) {
      for (let [k, v] of Object.entries(listOfItems[i])) {
        if (k === mark && v === markValue) {
          indexArray = [...indexArray, i];
          if (aim === 'single') break;
          else {
            if (mark === 'id') break;
          }
        }
      }
    }
  }
  return indexArray;
}

export const passCurrentItemsInArr = (fullArr, arrWithPassItems) => {
  let filteredArr = [];
  for (let i = 0; i < fullArr.length; i++) {
    for (let j = 0; j < arrWithPassItems.length; j++) {
      if (i === arrWithPassItems[j]) break;
      if (j === (arrWithPassItems.length - 1)) {
        filteredArr = [...filteredArr, fullArr[i]]
      }
    }
  }
  return filteredArr;
}

export const filterArrayOfObjects = (arr, mark) => {
  let filteredArr = [];
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      let count = 0;
      for (let [key, value] of Object.entries(arr[i])) {
        for (let [filterKey, filterValue] of mark.entries()) {
          if (filterKey !== key) continue;
          else {
            for (let j = 0; j < filterValue.length; j++) {
              if (filterValue[j].toLowerCase() !== value.toLowerCase()) {
                continue;
              }
              else {
                count++
              }
              if (count === mark.size) {
                filteredArr = [...filteredArr, arr[i]];
              }
            }
          }
        }
      }
    }
  }
  return filteredArr;
}