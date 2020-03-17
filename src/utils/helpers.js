/**
 * Group an array by years
 * @param {Array} a
 * @param {string} key
 */
export function groupByYear(a, key) {
    return a.reduce(function(r, o) {
        var m = null;
        if (o[key] !== undefined) {
            m = o[key].split("-")[0];
        } else {
            m = o[key];
        }
        r[m] ? r[m].data.push(o) : (r[m] = { data: [o] });
        return r;
    }, {});
}

/**
 * Delete key / value in object if the value of the key is empty
 * @param {Array} a
 * @param {string} key
 */
export function clean(a, key) {
    a.map((b) => {
        if (b[key] === "") {
            return delete b[key];
        } else {
            return false;
        }
    });
    return a;
}

/**
 * Get month name and display day and year
 * @param {string} date
 * @returns {string}
 */
export function formatDate(date) {
    date = new Date(date);
    let month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Calcul the date diff betweens 2 dates in days
 * @param {Date} a
 * @param {Date} b
 * @returns {Number}
 */
export function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/**
 * Change the name of the options
 * name => label
 * id => value
 * @param {Array} a
 */
export function formatOption(a) {
    a.map((b) => {
        if ("name" !== "label") {
            Object.defineProperty(b, "label", Object.getOwnPropertyDescriptor(b, "name"));
            delete b["name"];
        }
        if ("id" !== "value") {
            Object.defineProperty(b, "value", Object.getOwnPropertyDescriptor(b, "id"));
            delete b["id"];
        }
        return false;
    });
}

/**
 * Format the currency given by the API.
 * Returned in dollars
 * @param {Number} currency
 * @returns {string}
 */
export function formatCurrency(currency) {
    let formattedValue = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(currency);
    if (formattedValue === "$0.00") {
        formattedValue = "-";
    }
    return formattedValue;
}

/**
 * Format the runtime of a movie
 * Given in minutes, transformed in hours
 * @param {Number} runtime
 * @returns {string}
 */
export function formatRuntime(runtime) {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return `${hours}h${minutes} min`;
}
