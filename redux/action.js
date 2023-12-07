//tên addOrUpdateItem muốn đổi add j cx đc
export const addOrUpdateItem = (item) => ({
    type: 'ADD_OR_UPDATE_ITEM',
    payload: item,
  });
  //tên removeItem muốn đổi remove j cx đc
  export const removeItem = (itemId) => ({
    type: 'REMOVE_ITEM',
    payload: itemId,
  });
  