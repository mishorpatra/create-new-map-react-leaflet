

export const numToString = (n) => {
    if(n == 'ground') return 0
    else if(n == 'first') return 1
    else if(n == 'second') return 2
    else if(n == 'third') return 3
    else if(n == 'fourth') return 4
    else if(n == 'fifth') return 5
    else if(n == 'sixth') return 6
    else if(n == 'seventh') return 7
    else if(n == 'eighth') return 8
    else if(n == 'ninth') return 9
    else if(n == 'tenth') return 10
    else if(n == 'eleventh') return 11
    else if(n == 'twelvth') return 12
    else if(n == 'thirteenth') return 13
    else if(n == 'fourteenth') return 14
    else if(n == 'fifteenth') return 15
    else if(n == 'sixteenth') return 16
    else if(n == 'seventeenth') return 17
    else if(n == 'eighteenth') return 18
    else if(n == 'ninteenth') return 19
    else if(n == 'base1') return -1
}

export const stringToNum = (n) => {
    return n == 0 ? 'ground' : 
    n == 1 ? 'first' :
    n == 2 ? 'second': 
    n == 3 ? 'third' :
    n == 4 ? 'fourth' : 
    n == 5 ? 'fifth' : 
    n == 6 ? 'sixth' : 
    n == 7 ? 'seventh' : 
    n == 8 ? 'eighth' : 
    n == 9 ? 'nineth' :
    n == 10 ? 'tenth' :
    n == 11 ? 'eleventh' :
    n == 12 ? 'twelth' :
    n == 13 ? 'thirteenth' :
    n == 14 ? 'fourteenth' :
    n == 15 ? 'fifteenth' :
    n == 16 ? 'sixteenth' :
    n == 17 ? 'seventeenth' :
    n == 18 ? 'eighteenth' :
    n == 19 ? 'nineteenth' : null
}