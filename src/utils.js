export const Log = (level, message) => {
    if (!window.console) return;

    const { console } = window;
    if (typeof console[level] === "function") {
        console[level](message);
    }
};

export const select = (selector) => {
    // Check if selector is missing log the error and exit
    if (!selector) {
        Log("error", "No selector provided");
        return;
    }
    return document.querySelector(selector);
};
export const createElement = (element) => {
    if (!element) {
        Log("error", "No element provided");
        return;
    }
    return document.createElement(element);
};

export const createFragment = () => new DocumentFragment();
export const isEmpty = (str) => str === "";

export const makeProxy = (obj, handler) => new Proxy(obj, handler)

export const Uuid = () => Math.random().toString(36).substring(2, 9)

export const isObject = o => Object.prototype.toString.call(o) === '[object Object]'