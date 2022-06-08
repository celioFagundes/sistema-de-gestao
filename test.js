function getMoneySpent(keyboards, drives, b) {
    let mostExpensive = 0
    for(let keyb = 0; keyb < keyboards.length; keyb++){
        for(let drive = 0; drive < drives.length; drive++){
            console.log('mostEx', mostExpensive)
            console.log('key',keyboards[keyb])
            console.log('drives',drives[drive])
            if(keyboards[keyb] + drives[drive] > mostExpensive && keyboards[keyb] + drives[drive]<= b){
                mostExpensive = keyboards[keyb] + drives[drive]
            }
    }
    }
    return mostExpensive === 0 ? -1 : mostExpensive
}
console.log(getMoneySpent([3,1],[5,2,8],10))