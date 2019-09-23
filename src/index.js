module.exports = function zeros(expression) {
    const expr = expression;
    let fives = 0;
    let twos = 0;
    let current_number = '';
    for (let i = 0; i < expr.length; i++) {
        const current = expr[i];
        switch (true) {
            case /\d/.test(current):
                current_number += current;
                break;
            case current === '!':
                const isDouble = expr[i + 1] === '!';
                const mults = getMults(parseInt(current_number), isDouble);
                fives += mults.fives;
                twos += mults.twos;
                current_number = '';
                if (isDouble) {
                    i += 1;
                }
        }
    }
    return Math.min(fives, twos);
};


function getMults(number, isDouble = false) {
    const result = {
        fives: 0,
        twos: 0
    };

    if (!isDouble) {
        result.fives += getFactorsCount(5, number);
        result.twos += getFactorsCount(2, number);
        return result;
    }

    const isEven = number % 2 === 0;
    if (isEven) {
        result.twos += number / 2;
        const additional = getMults(number / 2);
        result.twos += additional.twos;
        result.fives += additional.fives;
    } else {
        result.fives += (getFactorsCount(5, number) - getFactorsCount(5, (number - 1) / 2));
    }
    return result;
}

function getFactorsCount(factor, from) {
    let pow = 1;
    let result = 0;
    while (from / Math.pow(factor, pow) >= 1) {
        result += Math.floor(from / Math.pow(factor, pow));
        pow += 1;
    }
    return result;
}
