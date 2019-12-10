export function getSeason (month) {
    let result;
    if (month === 11 || month <= 1) {
        result = 'winter';
    }
    if (month >= 2 && month <= 4) {
        result = 'spring';
    }
    if (month >= 5 && month <= 7) {
        result = 'summer';
    }
    if (month >= 8 && month <= 10) {
        result = 'autumn';
    }
    return result;
}
