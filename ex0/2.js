// 8 kyu Find multiples of a Number

function findMultiples(integer, limit) {
    //your code here
    const lis = []
    for (let i = integer; i <= limit; i += integer) {
        lis.push(i)
    }
    return lis
}