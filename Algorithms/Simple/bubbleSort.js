"use strict"
function bubbleSort(arr){
    let isSwapped;
    for(let i = 0; i < arr.length; ++i){
        isSwapped = false;
        for(let j = 0; j < arr.length - 1 - i; ++j){
            if(arr[j] > arr[j+1]){
                [arr[j],arr[j+1]] = [arr[j+1], arr[j]]
                isswapped = true
            }
        }
        if(!isSwapped) break;
    }
    return arr;
}