export function numeroRandom (min, max){
    const numRandom = Math.floor(Math.random()*(max-min))+min;
    return numRandom
}
