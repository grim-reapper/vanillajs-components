import './confirm.css'
import Dialog from "./dialog-functions";
import {createFragment, select} from "../utils";

export default function confirm(
    {
        title = "",
        message = "All Done!",
        confirmText = "Ok",
        cancelText = "Cancel",
        showCancelButton = true,
        vibrate = true,
        sound = '',
    }
) {
    return new Promise(function (resolve, reject) {
        const fragment = createFragment();
        const body = select("body");
        let overlay
        let modalContainer
        let modalInner
        let modalTitle
        let modalText
        let modalButtons
        let okButton
        let cancelButton

        overlay = Dialog.overlay();
        fragment.appendChild(overlay);

        modalContainer = Dialog.modalContainer()
        modalInner = Dialog.modalInner()

        modalTitle = Dialog.modalTitle(title)
        modalText = Dialog.modalText(message)

        modalInner.appendChild(modalTitle);
        modalInner.appendChild(modalText);

        modalButtons = Dialog.modalButtons()
        if(showCancelButton) {
            cancelButton = Dialog.cancelButton(cancelText)
            modalButtons.appendChild(cancelButton);
        }
        okButton = Dialog.okButton(confirmText)
        modalButtons.appendChild(okButton);

        modalContainer.appendChild(modalInner);
        modalContainer.appendChild(modalButtons);
        fragment.appendChild(modalContainer);
        let modal = select('.modal')
        if (modal) {
            modal.remove()
        }
        body.appendChild(fragment);

        // display modal
        overlay.classList.add("modal-overlay-visible");
        modalContainer.style.display = "block";
        modalContainer.style.marginTop = -Math.round(modalContainer.offsetHeight / 2) + "px";
        modalContainer.classList.add("modal-in");
        if(vibrate) {
            navigator.vibrate(500)
        }
        if(sound) {
            let audio = new Audio(sound)
            audio.play()
        }
        // add event listener
        okButton.addEventListener("click", () => {
            removeModal()
            resolve(true)
        });
        cancelButton && cancelButton.addEventListener("click", () => {
            removeModal()
            resolve(false)
        });
        overlay.addEventListener("click", () => {
            removeModal()
            resolve(null)
        });
        const removeModal = () => {
            overlay.remove()
            let m = modalContainer.classList
            m.remove("modal-in");
            m.add("modal-out");
            if (modalContainer.style.display === 'block') {
                setTimeout(() => {
                    modalContainer.remove()
                }, 500)
            }
        }
    });
}