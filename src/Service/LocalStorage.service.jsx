const Get = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const Set = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const LocalStorageService = {
    Get,
    Set,
}