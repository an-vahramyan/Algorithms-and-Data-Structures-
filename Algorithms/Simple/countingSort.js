"use strict";
function CountingSort(arr) {
  if (arr.length === 0) {
    return arr;
  }
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;

  const count = new Array(range).fill(0);
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  for(let i = 0 ; i < arr.length; i++){
    arr[i] = output[i];
  }
  return arr
}
