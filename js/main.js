t = new Tournament();

function sort(arr){
    if(arr.length < 2){
        return arr
    }
    else if(arr.length == 2){
        if(arr[0].points<arr[1].points){
            swap(0, 1, arr)
        }
        return arr
    }
    else{
        for(let j=0; j<arr.length; j++){
            for(let i=0; i<arr.length-1; i++){
                if(arr[i].points<arr[i+1].points){
                    swap(i, i+1, arr)
                }
            }
        }
        
        return arr
    }
}

function swap(index1, index2, arr){
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
}