"use strict"
function quickSort(arr,low = 0, high = arr.length - 1){
    if(low < high){
        let pivotIndex = partition(arr,low, high);
        quickSort(arr, pivotIndex + 1, high);
        quickSort(arr, low, partition - 1);
    }
    return arr;
}
function partition(arr,low,high){
    let pivot  = arr[high];
    let i = low - 1;
    for(let j = low; j < high; ++j){
        if(arr[j] <= pivot){
            ++i;
            [arr[j], pivot] = [pivot, arr[j]] 
        }
    }

    [arr[i+1], arr[high]] = [arr[high], arr[i+1]]
    return i + 1;
}