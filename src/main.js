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
import { faGear, faCirclePlus, faRepeat, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faGear, faCirclePlus, faRepeat, faPaperPlane, faSpinner)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
