export const setTheme = theme => {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
}