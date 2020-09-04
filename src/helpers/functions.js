export function xy(x, y) {
    return { x, y };
}

export function roundTo(n, size) {
    if(n > 0)
        return Math.ceil(n/size) * size;
    else if( n < 0)
        return Math.floor(n/size) * size;
    else
        return size;
}