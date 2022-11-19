/* Vue 3 */
import { createApp } from 'vue'
import App from './App.vue'
/* Vue PWA Service worker */
import './registerServiceWorker'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faGear, faCirclePlus, faRepeat, faPaperPlane, faSpinner, faTableList, faChartBar, faChartLine, faArrowRight, faArrowLeft } 
from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faGear, faCirclePlus, faRepeat, faPaperPlane, faSpinner, faTableList, faChartBar, faChartLine, faArrowRight, faArrowLeft)

// Vue router definitions
import { createRouter, createWebHashHistory } from 'vue-router'
import BudgetLogsComponent from "./components/BudgetLogsComponent.vue"
import MonthlyComponent from "./components/MonthlyComponent.vue"
import SettingsFormComponent from "./components/SettingsFormComponent.vue"
import NotFoundComponent from "./components/NotFoundComponent.vue"
const routes = [
    { path: "/", component: BudgetLogsComponent, name: "home"},
    { path: "/monthly", component: MonthlyComponent, name: "monthly"},
    { path: "/settings", component: SettingsFormComponent, name: "settings" },
    { path: "/:catchAll(.*)", component: NotFoundComponent, name: "404" },
]
const router = createRouter({
    history: createWebHashHistory(process.env.NODE_ENV === "production" ? "/yaba/" : "/"),
    routes: routes,
})


createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
