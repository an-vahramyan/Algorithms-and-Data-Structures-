"use strict"
function quickSort(arr, low = 0, high = arr.length - 1){
    if(low < high){
        let pivotIndex = partition(arr, low, high);
        quickSort(arr, pivotIndex + 1, high)
        quickSort(arr, low, pivotIndex  - 1)
    }
    return arr;
}
function partition(arr, low, high){
    let pivot = arr[low];
    let i = low + 1

    for(let j = low = 1; j < high; ++j){
        if(arr[j] <= piovt){
            [arr[i], arr[j]] = [arr[j], arr[i]]
            ++i;
        }
    }
    [arr[low], arr[i - 1]] = [arr[i - 1], arr[low]]
    return i - 1;
}