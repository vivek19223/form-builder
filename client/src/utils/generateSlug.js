import {v4 as uuidv4} from 'uuid';

const generateUniqueId = arr => {
  let id = 0;
  let flag = true;
  while (flag) {
    id = uuidv4 ();
    if (arr.includes (id)) {
      flag = true;
    } else {
      flag = false;
    }
  }
  return id;
};

export default generateUniqueId;
