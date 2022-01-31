import { createElement } from "../utils";

const Dialog = {
    overlay: () => {
        const overlay = createElement("div");
        overlay.classList.add("modal-overlay");
        return overlay;
    },
    modalContainer: () => {
        const modalContainer = createElement("div");
        modalContainer.classList.add("modal");
        return modalContainer
    },
    modalInner: () => {
        const modalInner = createElement("div");
        modalInner.classList.add("modal-inner");
        return modalInner
    },
    modalTitle: (title) => {
        const modalTitle = createElement("div");
        modalTitle.classList.add("modal-title");
        modalTitle.textContent = title;
        return modalTitle
    },
    modalText: (message) => {
        const modalText = createElement("div");
        modalText.classList.add("modal-text");
        modalText.textContent = message;
        return modalText
    },
    modalButtons: () => {
        const buttonContainer = createElement("div");
        buttonContainer.classList.add("modal-buttons");
        return buttonContainer;
    },
    okButton: (confirmText) => {
        const ok = createElement("span");
        ok.classList.add(...["modal-button", "modal-button-bold"]);
        ok.textContent = confirmText
        return ok;
    },
    cancelButton: (cancelText) => {
        const cancel = createElement("span");
        cancel.classList.add("modal-button");
        cancel.textContent = cancelText;
        return cancel;
    }
};
export default Dialog
