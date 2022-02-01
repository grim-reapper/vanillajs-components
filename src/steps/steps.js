import {isObject, Log} from "../utils";

export default function steps(options = {}) {
    if(!isObject(options)){
        Log('error', typeof options + ' must be an Object')
        return;
    }
    const defaultOptions = {
        container: '.gw-progress-tracker',
        step: '.gw-progress-step',
        activeClass: 'is-active',
        completedClass: 'is-complete',
    }
    const props = {...defaultOptions, ...options}
    const stepsCollection = []
    window.onload = function () {
        const containers = document.querySelectorAll(props.container)
        containers.forEach((element, p_index) => {
            const steps = document.querySelectorAll(props.container)[p_index];
            const items = steps.querySelectorAll(props.step)
            stepsCollection.push({
                activeStep: 0,
                steps,
                items
            })
            items.forEach((elem, c_index) => {
                elem.addEventListener('click', e => onStepChange(e, c_index, p_index, elem))
            })
        })
    }
    const removeClass = (elems, activeIndex) => {
        const { activeClass, completedClass } = props
        elems.forEach((ele, index) => {
            ele.classList.remove(activeClass)
            if(index >= activeIndex)
                ele.classList.remove(completedClass)
        })
    }
    const addClass = (elems, activeIndex) => {
        const { completedClass } = props
        elems.forEach((ele, index) => {
            if(index < activeIndex)
                ele.classList.add(completedClass)
        })
    }
    const onStepChange = (event, index, p_index, elem) => {
        const { activeClass } = props

        const container = stepsCollection[p_index]

        const beforeStepChange = new CustomEvent('before.step.change', {detail: {tabID: index}})
        document.dispatchEvent(beforeStepChange)

        removeClass(container.items, index)
        addClass(container.items, index)
        elem.classList.add(activeClass)

        const afterStepChange = new CustomEvent('after.step.change',{detail: {tabID: index}})
        document.dispatchEvent(afterStepChange)
    }
}