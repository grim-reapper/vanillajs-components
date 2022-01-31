import {isEmpty, Log, select} from "../utils";
import './toast.css'
export default function toast(type, message, title = '', autoClose = true, closeAfter = 5, sound = '') {
    if (!type) {
        Log('error', 'Toast type is missing')
        return
    }
    const titleElem = !isEmpty(title) ? `<div class="gw-toast-title">${title}</div>` : ''
    let toast_icon = null
    switch(type){
        //GENERAL:
        case 'info':       toast_icon = '<svg viewBox="0 0 448 512"><path fill="#f8f9fa" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-176 86c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/></svg>';break;
        case 'warning':    toast_icon = '<svg viewBox="0 0 576 512"><path fill="#343a40" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>';break;
        case 'success':    toast_icon = '<svg viewBox="0 0 512 512"><path fill="#f8f9fa" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>';break;
        case 'error':      toast_icon = '<svg viewBox="0 0 512 512"><path fill="#f8f9fa" d="M497.9 150.5c9 9 14.1 21.2 14.1 33.9v143.1c0 12.7-5.1 24.9-14.1 33.9L361.5 497.9c-9 9-21.2 14.1-33.9 14.1H184.5c-12.7 0-24.9-5.1-33.9-14.1L14.1 361.5c-9-9-14.1-21.2-14.1-33.9V184.5c0-12.7 5.1-24.9 14.1-33.9L150.5 14.1c9-9 21.2-14.1 33.9-14.1h143.1c12.7 0 24.9 5.1 33.9 14.1l136.5 136.4zM377.6 338c4.7-4.7 4.7-12.3 0-17l-65-65 65.1-65.1c4.7-4.7 4.7-12.3 0-17L338 134.4c-4.7-4.7-12.3-4.7-17 0l-65 65-65.1-65.1c-4.7-4.7-12.3-4.7-17 0L134.4 174c-4.7 4.7-4.7 12.3 0 17l65.1 65.1-65.1 65.1c-4.7 4.7-4.7 12.3 0 17l39.6 39.6c4.7 4.7 12.3 4.7 17 0l65.1-65.1 65.1 65.1c4.7 4.7 12.3 4.7 17 0l39.4-39.8z"/></svg>';break;
        //DEFAULT
        default:           toast_icon = '<svg viewBox="0 0 448 512"><path fill="#f8f9fa" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-176 86c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/></svg>';
    }
    const toastTemplate = `
        <div class="gw-toast-container">
        <div class="gw-toast" data-autohide="true" data-type="${type}" role="alert" aria-live="assertive"
       aria-atomic="true">
        <div class="gw-toast-content">
          <div class="gw-toast-icon">
            ${toast_icon}
          </div>
          <div class="gw-toast-body">
            ${titleElem}
            <div>${message}</div>
          </div>
        </div>
        <button class="gw-toast-close" type="button" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      </div>
    `
    let toastContainer = select('.gw-toast-container')
    if(toastContainer){
        toastContainer.remove()
    }
    select('body').insertAdjacentHTML('beforeend', toastTemplate)
    if(sound) {
        let sound = new Audio(sound)
        sound.play()
    }
    toastContainer = select('.gw-toast-container')
    toastContainer.classList.add('animate-slideIn')
    const closeButton = select('.gw-toast-close')
    closeButton && closeButton.addEventListener('click', () => {
        toastContainer.classList.remove('animate-slideIn')
        toastContainer.classList.add('animate-slideOut')
        // toastContainer.remove()
    })
    if(autoClose){
        const time = closeAfter * 1000
        toastContainer && setTimeout(() => {
            toastContainer.classList.remove('animate-slideIn')
            toastContainer.classList.add('animate-slideOut')
            // toastContainer.remove()
        }, time)
    }
}