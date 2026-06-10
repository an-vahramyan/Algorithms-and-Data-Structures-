"use strict"
function quickSort(arr, low, high){
    if(low < high){
        let pivotindex  = partition(arr,low,high);
        quickSort(arr, pivotindex + 1, high);
        quickSort(arr, low, pivotIndex - 1);
    }
    return arr;
}
function partition(arr, low = 0, high = arr.length - 1){
    let random = Math.floor(Math.random() * (high - low + 1) + low)
    let pivot = arr[random];
    let i = low - 1; 
    
    for(let  j = low; j < high; ++j){
        if(arr[j] <= pivot){
            ++i;
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    [arr[high], arr[i + 1]] = [arr[i + 1], arr[high]]
    return i + 1
}