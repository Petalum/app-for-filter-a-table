import {
  getItemFromLocalStorage, setItemToLocalStorage, changeItemInArrayUsingControlItem, findIndexOfCurrentItemInArray, passCurrentItemsInArr,
  findItemIndexInArrayUsingControlItem, filterArrayOfObjects
} from './func/common';

export const studentsLocalStorage = {
  getCurrentItem(key) {
    const response = getItemFromLocalStorage(key);
    return response;
  },

  setCurrentItem(key, newvalue) {
    let listOfItems = this.getCurrentItem(key);
    if (listOfItems === null) {
      const response = setItemToLocalStorage(key, newvalue);
      return response;
    }
    const newList = [...listOfItems, newvalue];
    const response = setItemToLocalStorage(key, JSON.stringify(newList, null, 2));
    return response;
  },

  setItemWithoutChecking(key, value) {
    const response = setItemToLocalStorage(key, value);
    return response;
  },

  changeCurrentItem(key, newvalue, markValue, mark = 'id') {
    let listOfItems = this.getCurrentItem(key);
    if (typeof listOfItems === 'object') {
      const index = findIndexOfCurrentItemInArray(listOfItems, markValue, mark, 'single');
      if (index.length === 1) {
        listOfItems.splice(index[0], 1, newvalue);
      }
      this.setItemWithoutChecking(key, JSON.stringify(listOfItems, null, 2));
      return listOfItems;
    }
    return null;
  },

  // Используется для замены определенного значения во всем массиве данных. Можно также опираться на контрольную пару (ключ-значение) для дополнительной проверки. 

  changeCurrentInfo(commonKey, markForChangingKey, valueBag, markForControlKey = null, markForControlValue = null) {
    let listOfItems = this.getCurrentItem(commonKey);
    if (typeof listOfItems === 'object') {
      changeItemInArrayUsingControlItem(listOfItems, markForControlKey, markForControlValue, valueBag, markForChangingKey, 'change');
    }
    this.setItemWithoutChecking(commonKey, JSON.stringify(listOfItems, null, 2));
    return listOfItems;
  },


  deleteItem(key, markValue, mark = 'id') {
    let listOfItems = this.getCurrentItem(key);
    if (typeof listOfItems === 'object') {
      const index = findIndexOfCurrentItemInArray(listOfItems, markValue, mark, 'multiple');
      if (index.length) {
        (index.length === 1) ? listOfItems.splice(index[0], 1) : listOfItems = passCurrentItemsInArr(listOfItems, index);
        this.setItemWithoutChecking(key, JSON.stringify(listOfItems, null, 2));
        return listOfItems;
      }
    }
    return null;
  },

  deleteItemFindingInGroupsArray(commonKey, markForChangingKey, valueBag, markForControlKey = null, markForControlValue = null) {
    let listOfItems = this.getCurrentItem(commonKey);
    if (typeof listOfItems === 'object') {
      const index = findItemIndexInArrayUsingControlItem(listOfItems, markForControlKey, markForControlValue, valueBag, markForChangingKey);
      (index.length === 1) ? listOfItems.splice(index[0], 1) : listOfItems = passCurrentItemsInArr(listOfItems, index);
      this.setItemWithoutChecking(commonKey, JSON.stringify(listOfItems, null, 2));
      return listOfItems;
    }
    return null;
  },

  getFilteredItems(fullListKey, filterListKey, mapForFilter) {
    let listOfItems = this.getCurrentItem(fullListKey);
    if (typeof listOfItems === 'object') {
      const filteredListOfItems = filterArrayOfObjects(listOfItems, mapForFilter);
      if (filteredListOfItems.length) {
        this.setItemWithoutChecking(filterListKey, JSON.stringify(filteredListOfItems, null, 2));
        return filteredListOfItems;
      }
    }
    return null;
  }
}