import { getApiKey, getApiEndpoint } from "@/localStorageUtils"

function log(msg) {
    console.log(`API ${msg}`);
}

function buildRequestBody(budgetLog, apiKey) {
    return {
        "api_key": apiKey,
        "unix_timestamp": budgetLog.unixTimestamp,
        "amount": budgetLog.amount,
        "currency": budgetLog.currency,
        "labels": budgetLog.labels.join(", "),
    }
}

function getJSONBody(response) {
    log(`received response with status ${response.status}`);
    if (!response.ok) {
        const e = new Error("Received non-2xx response from API");
        e.response = response;
        throw e;
    }
    return response.json();
}

export function sendBudgetLog(budgetLog) {
    const apiEndpoint = getApiEndpoint();
    if (apiEndpoint === null || apiEndpoint == "") {
        log("no endpoint");
        Promise.reject(new Error("No API Endpoint set in client settings"))
    }
    const apiKey = getApiKey();
    if (apiKey === null || apiKey == "") {
        log("no api key");
        Promise.reject(new Error("No API_KEY set in client settings."))
    }

    const body = JSON.stringify(buildRequestBody(budgetLog, apiKey));
    log(`sending ${body} to ${apiEndpoint}`)

    return fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': "text/plain;charset=utf-8",
        },
        redirect: "follow",
        body: body,
    }).then(response => getJSONBody(response)).then(responseData => {
        log(`received response body ${JSON.stringify(responseData)}`);
        if (!("status" in responseData) || responseData["status"] != "ok") {
            throw new Error("status == ok not found in response body");
        }
        return responseData;
    })
}

export function getMonthlyLogs(year, month) {
    const apiEndpoint = getApiEndpoint();
    if (apiEndpoint === null || apiEndpoint == "") {
        log("no endpoint");
        Promise.reject(new Error("No API Endpoint set in client settings"))
    }
    log(`sending request to ${apiEndpoint} with ?year=${year} ?month=${month}`);

    return fetch(`${apiEndpoint}?` + new URLSearchParams({year: year, month: month}))
    .then(response => getJSONBody(response)).then(responseData => {
        log(`received response body ${JSON.stringify(responseData)}`);
        return responseData;
    });
}