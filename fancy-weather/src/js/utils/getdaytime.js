export function getDayTime (hours) {
    let result;
    if (hours === 0 || hours <= 6) {
        result = 'night';
    }
    if (hours >= 7 && hours <= 11) {
        result = 'morning';
    }
    if (hours >= 12 && hours <= 17) {
        result = 'day';
    }
    if (hours >= 18 && hours <= 23) {
        result = 'evening';
    }
    return result;
}