export let arr: Array<any> = [];
export function createCopies(obj: any, copies: any, arrLength: any) {
  let addedSeries = getNumber(arr, obj.exname);
  let diff = Math.abs(copies - addedSeries);
  if (addedSeries > copies) {
    for (let j = 0; j < diff; j++) {
      let params = getParams(arr, 'exname');
      let index = params.lastIndexOf(obj.exname);
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
  } else {
    if (addedSeries > 0 && addedSeries < copies) {
      let ids = getParams(arr, 'id');
      for (let i = 0; i <= arrLength + diff; i++) {
        if (isEmpty(ids, i)) {
          let newObj = JSON.parse(JSON.stringify(obj));
          newObj.id = i;
          arr.push(newObj);
          if (arrLength + diff === arr.length) {
            break;
          }
        }
      }
    }
    if (addedSeries === 0) {
      for (let i = arrLength; i < copies + arrLength; i++) {
        let newObj = JSON.parse(JSON.stringify(obj));
        newObj.id = i;
        arr.push(newObj);
      }
    }
  }
  return arr;
}

function getNumber(seriesArray: any, ex: any) {
  let seriesQuantity = 0;
  seriesArray.filter((obj: any) => {
    if (obj.exname === ex) {
      seriesQuantity++;
    }
    return null;
  });
  return seriesQuantity;
}

function isEmpty(idsArray: any, i: any) {
  if (idsArray.indexOf(i) < 0) {
    return true;
  } else return false;
}

function getParams(seriesArray: any, param: any) {
  let params = [];
  let x;
  for (x of seriesArray) {
    params.push(x[param]);
  }
  return params;
}
