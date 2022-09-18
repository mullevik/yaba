import { emitBudgetLogsChanged } from "@/events"
import _ from 'lodash';

const LS_KEYS = {
    API_KEY: "API_KEY",
    API_ENDPOINT: "ENDPOINT",
    BUDGET_LOGS: "BUDGET_LOGS",
    PAST_LABELS: "PAST_LABELS",
};
const MAX_SUCCESSFUL_LOGS = 20;
const MAX_PAST_LABEL_LOGS = 40;

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
    const serializedPendingLogs = localStorage.getItem(LS_KEYS.BUDGET_LOGS);
    if (serializedPendingLogs === null || serializedPendingLogs == "") {
        return [];
    }
    return JSON.parse(serializedPendingLogs);
}

function getPastLabels() {
    const serializedPastLabels = localStorage.getItem(LS_KEYS.PAST_LABELS);
    if (serializedPastLabels == null || serializedPastLabels == "") {
        return [];
    }
    return JSON.parse(serializedPastLabels);
}

function storePastLabels(labels) {
    localStorage.setItem(LS_KEYS.PAST_LABELS, JSON.stringify([...labels, ...getPastLabels()].slice(0, MAX_PAST_LABEL_LOGS)));
}

export function getLabelScoreMap() {
    const labelScoreMap = {};
    for (const [index, label] of getPastLabels().entries()) {
        if (label in labelScoreMap) {
            labelScoreMap[label] += 1. / (index + 1);
        } else {
            labelScoreMap[label] = 1. / (index + 1);
        }
    }
    return labelScoreMap;
}

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
    localStorage.setItem(LS_KEYS.BUDGET_LOGS, JSON.stringify(logs));
    storePastLabels(budgetLog.labels);
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
    localStorage.setItem(LS_KEYS.BUDGET_LOGS, JSON.stringify(logs));
    emitBudgetLogsChanged();
    return logs;
}
