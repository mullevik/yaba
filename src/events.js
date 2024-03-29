import mitt from 'mitt'

const emitter = mitt()

const EVENTS = {
    NEW_BUDGET_LOG_STORED: "NEW_BUDGET_LOG_STORED",

}

export function emitBudgetLogsChanged() {
    emitter.emit(EVENTS.NEW_BUDGET_LOG_STORED);
}

export function onBudgetLogsChanged(fn) {
    emitter.on(EVENTS.NEW_BUDGET_LOG_STORED, fn);
}

// export default {
//   $on: (...args) => emitter.on(...args),
//   $once: (...args) => emitter.once(...args),
//   $off: (...args) => emitter.off(...args),
//   $emit: (...args) => emitter.emit(...args)
// }