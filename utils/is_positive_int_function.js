/*-----------------------------------------------------------------------------*/
/* function that checks if a number is positive integer */
const IsPosInt = (num) => {
    num = parseFloat(num);

    if ((isNaN(num)) || (!IsInt(num)) || (num < 0)) {
        return (false);
    }
    else {
        num = parseInt(num);
        return (num);
    }
}

/*-----------------------------------------------------------------------------*/
/* function that checks if a number is integer */
const IsInt = (num) => (num % 1 === 0 ? true : false);

module.exports = IsPosInt;