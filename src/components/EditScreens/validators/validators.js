export const validateDate = value => {
  let errorMessage;
  if (!/^(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)$/i.test(value)) {
    errorMessage = 'Неправильный формат даты';
  }
  return errorMessage;
};

export const validateLetters = value => {
  let errorMessage;
  if (!/^[а-яА-ЯёЁa-zA-Z-\s]+$/i.test(value)) {
    errorMessage = 'Неправильный тип символов';
  }
  return errorMessage;
};

export const validateFigures = value => {
  let errorMessage;
  if (!/^[0-9]{1,3}$/i.test(value)) {
    errorMessage = 'Неправильный формат поля';
  }
  return errorMessage;
};

export const validateGroups = value => {
  let errorMessage;
  if (!/^(\d+,)*\d+$/i.test(value)) {
    errorMessage = 'Неправильный формат поля';
  }
  return errorMessage;
};