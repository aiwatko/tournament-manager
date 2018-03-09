export const saveStateToLocalStorage = (state) => {
    localStorage.setItem('state', JSON.stringify(state));
}

export const getStateFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('state'));
}