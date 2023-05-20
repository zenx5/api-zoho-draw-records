export const validateDateToken = (lastUpdate) => {
    const date1 = new Date();
    const date2 = new Date(lastUpdate);

    const milseconds = date1 - date2;
    const seconds = milseconds / 1000;
    const minutes = seconds / 60;

    if( minutes > 8 ) return false
    return true
}