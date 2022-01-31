import {Log, select} from "../utils";
import './overlay.css'
export default function overlay(target, closeOnEscape = true) {
    if (!target) {
        Log('error', 'Target or Element is missing')
        return
    }
    let overlayContainer = null;
    let overlay = null;
    const hideOverlay = () => {
        overlayContainer.style.display = 'none'
        overlayContainer.classList.remove('gw-overlay-in')
        overlay.classList.remove('gw-overlay-visible')
    }
    try {
        overlayContainer = select(target)
        overlay = select('div[data-gw-overlay]')
        const closeButton = select(target + ' [data-gw-close]')
        overlay && overlay.classList.add('gw-overlay-visible')
        overlayContainer.style.display = 'block'
        overlayContainer.classList.add('gw-overlay-in')
        closeButton && closeButton.addEventListener('click', () => {
            hideOverlay()
        })
        overlay && overlay.addEventListener('click', () => {
            hideOverlay()
        })
        if (closeOnEscape) {
            document.addEventListener('keydown', function (event) {
                if (event.key === "Escape") {
                    hideOverlay()
                }
            });
        }
    } catch (e) {
        const {message} = e
        Log('error', message)
    }
}
