// accept changed modules for hot reloading
if (module.hot) {
    module.hot.accept();
}

// register service worker for offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

// initialize fontawesome
import * as fa from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
fa.library.add(faEye, faEyeSlash);
fa.dom.watch();

// initialize bootstrap
import 'bootstrap';

// load sass styles with changed bootstrap styles
import "./index.scss";