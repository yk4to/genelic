import * as fs from 'fs';

export const isExist = (path: string) => {
  let isExist = false;
  try {
    fs.statSync(path);
    isExist = true;
  } catch(err) {
    isExist = false;
  }
  return isExist;
}