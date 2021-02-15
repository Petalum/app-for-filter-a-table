import { getItemFromLocalStorage, setItemToLocalStorage } from './func/common';

export const groupsLocalStorage = {
  getCurrentItem(key) {
    const response = getItemFromLocalStorage(key);
    return response;
  },

  setCurrentItem(key, newvalue, mark) {
    let listOfItems = this.getCurrentItem(key);
    if (listOfItems === null) {
      const response = setItemToLocalStorage(key, newvalue);
      return response;
    }
    const error = [];
    if (typeof listOfItems === 'object' && listOfItems.length) {
      for (let i = 0; i < listOfItems.length; i++) {
        for (let [k, v] of Object.entries(listOfItems[i])) {
          if (k === mark && v.toLowerCase() === newvalue[mark].toLowerCase()) {
            error.push("Такое название уже есть в базе");
            break;
          }
        }
      }
      if (error.length) {
        return 'error';
      }
    }
    const newList = [...listOfItems, newvalue];
    const response = setItemToLocalStorage(key, JSON.stringify(newList, null, 2));
    return response;
  },
  setItemWithoutChecking(key, value) {
    const response = setItemToLocalStorage(key, value);
    return response;
  },


  changeCurrentFaculty(key, newvalue, mark, idValue, modifyAim, idKey = 'id') {
    let listOfItems = this.getCurrentItem(key);
    if (typeof listOfItems === 'object' && listOfItems.length) {
      const index = [];
      const error = [];
      const item = [];
      for (let i = 0; i < listOfItems.length; i++) {
        for (let [k, v] of Object.entries(listOfItems[i])) {
          if (k === idKey && v === idValue) {
            index.push(i);
            item.push(listOfItems[i]);
          }
          if (modifyAim !== 'group' && (k === mark && v.toLowerCase() === newvalue[mark].toLowerCase())) {
            error.push("Такое название уже есть в базе");
            break;
          }
        }
      }
      if (error.length) {
        return 'error';
      }
      if (item.length) {
        const changedItem = modifyAim === 'group' ? item.map(p => { p[mark] = [...newvalue[mark]]; return p }) : item.map(p => { p[mark] = newvalue[mark]; return p });
        listOfItems.splice(index[0], 1, changedItem[0]);
        this.setItemWithoutChecking(key, JSON.stringify(listOfItems, null, 2));
        return listOfItems;
      }
    }
    return null;
  },

  deleteItem(key, markValue, mark = 'id') {
    let listOfItems = this.getCurrentItem(key);
    if (typeof listOfItems === 'object' && listOfItems.length) {
      const index = [];
      for (let i = 0; i < listOfItems.length; i++) {
        for (let [k, v] of Object.entries(listOfItems[i])) {
          if (k === mark && v === markValue) {
            index.push(i);
            break;
          }
        }
      }
      listOfItems.splice(index[0], 1);
      this.setItemWithoutChecking(key, JSON.stringify(listOfItems, null, 2));
      return listOfItems;
    }
    return null;
  },
}