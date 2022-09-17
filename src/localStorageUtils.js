import { emitBudgetLogsChanged } from "@/events"
import _ from 'lodash';

const LS_KEYS = {
    API_KEY: "API_KEY",
    API_ENDPOINT: "ENDPOINT",
    PENDING_BUDGET_LOGS: "PENDING_BUDGET_LOGS"
};

function log(msg) {
    console.log(`LOCAL_STORAGE_UTILS ${msg}`);
}

export function getApiKey() {
    return localStorage.getItem(LS_KEYS.API_KEY);
}

export function hasApiKey() {
    return getApiKey() !== null;
}

export function setApiKey(newApiKey) {
    log(`Setting API KEY: ${newApiKey}`)
    localStorage.setItem(LS_KEYS.API_KEY, newApiKey);
}

export function getApiEndpoint() {
    return localStorage.getItem(LS_KEYS.API_ENDPOINT);
}

export function hasApiEndpoint() {
    return getApiEndpoint() !== null;
}

export function setApiEndpoint(newEndpoint) {
    log(`Setting API Endpoint: ${newEndpoint}`)
    return localStorage.setItem(LS_KEYS.API_ENDPOINT, newEndpoint);
}

export function getBudgetLogs() {
    const serializedPendingLogs = localStorage.getItem(LS_KEYS.PENDING_BUDGET_LOGS);
    if (serializedPendingLogs === null || serializedPendingLogs == "") {
        return [];
    }
    return JSON.parse(serializedPendingLogs);
}

const MAX_SUCCESSFUL_LOGS = 20;

export function storeBudgetLog(budgetLog) {
    const logs = getBudgetLogs();
    logs.unshift(budgetLog);
    const successfulLogs = logs.filter(x => !x.pending);
    if (!budgetLog.pending && successfulLogs.length >= MAX_SUCCESSFUL_LOGS) {
        let lastIndex = 0;
        for (const [index, log] of logs.entries) {
            if (!log.pending) {
                lastIndex = index;
            }
        }
        logs.splice(lastIndex, 1);
    }
    localStorage.setItem(LS_KEYS.PENDING_BUDGET_LOGS, JSON.stringify(logs));
    emitBudgetLogsChanged();
}

export function removePendingBudgetLog(budgetLog) {
    const logs = getBudgetLogs();
    const index = logs.findIndex(otherBudgetLog => {
        return _.isEqual(otherBudgetLog, budgetLog);
    });
    if (index < 0) {
        log(`BudgetLog ${budgetLog} not found in pending budget logs and thus can not be removed.`);
        return logs;
    }
    logs.splice(index, 1);
    localStorage.setItem(LS_KEYS.PENDING_BUDGET_LOGS, JSON.stringify(logs));
    emitBudgetLogsChanged();
    return logs;
}
