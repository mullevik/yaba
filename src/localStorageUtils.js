import { emitPendingBudgetLogsChanged } from "@/events"
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

export function getPendingBudgetLogs() {
    const serializedPendingLogs = localStorage.getItem(LS_KEYS.PENDING_BUDGET_LOGS);
    if (serializedPendingLogs === null || serializedPendingLogs == "") {
        return [];
    }
    return JSON.parse(serializedPendingLogs);
}

export function storePendingBudgetLog(budgetLog) {
    const logs = getPendingBudgetLogs();
    logs.push(budgetLog);
    localStorage.setItem(LS_KEYS.PENDING_BUDGET_LOGS, JSON.stringify(logs));
    emitPendingBudgetLogsChanged();
}

export function removePendingBudgetLog(budgetLog) {
    const logs = getPendingBudgetLogs();
    const index = logs.findIndex(otherBudgetLog => {
        return _.isEqual(otherBudgetLog, budgetLog);
    });
    if (index < 0) {
        log(`BudgetLog ${budgetLog} not found in pending budget logs and thus can not be removed.`);
        return logs;
    }
    logs.splice(index, 1);
    localStorage.setItem(LS_KEYS.PENDING_BUDGET_LOGS, JSON.stringify(logs));
    emitPendingBudgetLogsChanged();
    return logs;
}
