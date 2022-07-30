

export function createBudgeLog(amount, currency, labels) {
    return {
        unixTimestamp: Math.floor(new Date().getTime() / 1000),
        amount: amount,
        currency: currency,
        labels: labels
    }
}