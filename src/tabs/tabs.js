import {isObject, Log} from "../utils";

export default function tabs(options = {}) {
    if(!isObject(options)){
        Log('error', typeof options + ' must be Object')
        return;
    }
    const defaultOptions = {
        container: '.tabs-container',
        button: '.tabs-buttons__btn',
        tab: '.tabs-sections__section',
        activeBtnClass: 'tabs-buttons__btn_active',
        activeTabClass: 'tabs-sections__section_active',
    }
    const props = {...defaultOptions, ...options}
    const tabsCollection = []
    window.onload = function () {
        const containers = document.querySelectorAll(props.container)
        containers.forEach((element, index) => {
            const tabContainer = document.querySelectorAll(props.container)[index];
            tabsCollection.push({
                activeTab: 0,
                tabs: tabContainer,
                sections: tabContainer.querySelectorAll(props.tab)
            })
            element.addEventListener('click', e => onTabChange(e, index))
        })
    }
    const onTabChange = (event, index) => {
        const { button, activeBtnClass, activeTabClass } = props
        const target = event.target
        const container = tabsCollection[index]

        if(!target.className.includes(button.replace('.',''))) return;

        const tabs = tabsCollection[index].tabs
        const sections = tabsCollection[index].sections
        const tabsChildren = target.parentNode?.children

        if(!tabsChildren?.length || !tabs) return;

        const beforeTabChange = new CustomEvent('before.tab.change')
        document.dispatchEvent(beforeTabChange)

        const tabIndex = Array.from(tabsChildren).indexOf(target);
        const prevTab = tabsChildren[container.activeTab];
        const prevSection = sections[container.activeTab];
        const activeSection = sections[tabIndex];

        tabsCollection[index].activeTab = tabIndex;

        prevTab?.classList.remove(activeBtnClass);
        prevSection?.classList.remove(activeTabClass);

        activeSection?.classList.add(activeTabClass);
        target.classList.add(activeBtnClass);
        const afterTabChange = new CustomEvent('after.tab.change')
        document.dispatchEvent(afterTabChange)
    }
}