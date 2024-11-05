export function dropdownSelectCloseMenuOnScroll(e: Event): boolean {
    const target = e.target;

    if(!target) {
        return false;
    }

    return target === document;
}
