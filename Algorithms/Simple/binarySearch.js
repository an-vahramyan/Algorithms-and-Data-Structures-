"use strict"
function binarySearch(arr,target){
    let left = 0;
    let right = arr.length - 1;
    while(left <= right){
        let mid = Math.floor((left + right) / 2)
        if(arr[mid] === target ){return mid}
        else if(arr[mid] < target){left = mid + 1}
        else {right = mid - 1}
    }
    return -1;
}
//recursive
function binaryRecursive(arr, target, left = 0, right = arr.length - 1){
    if(left > right) {return -1}
    let mid = Math.floor((left + right) / 2);
    if(arr[mid] ===  target){return mid}
    else if(arr[mid] < target) {binaryRecursive(arr,target,mid + 1, right)}
    else{binaryRecursive(arr,target, left, mid - 1)}
}