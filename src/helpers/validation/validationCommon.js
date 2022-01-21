export function checkRequired(value) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();

    if (value === "") {
        return false;
    }
    return true;
}

export function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

export function checkEmail(value) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}

export function checkNumber(value) {
    if (!value) {
        return false;
    } else if (value <= 0) {
        return false;
    }
    return !isNaN(value);
}

export function checkTime(value) {
    const startTime = "07:59:00";
    const endTime = "22:00:00";
    if (value < startTime) return false;
    if (value > endTime) return false;
    return true;
}