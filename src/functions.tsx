
export function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export function isLongEnoughPassword(password) {
    const regex = /^(?=.{6,})/;
    return regex.test(password);
}

export function isValidPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
    return regex.test(password);
}

// Not used yet

export function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

export function registerUser(user) {
    const users = getUsersFromLocalStorage();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

export function loginUser(email, password) {
    const users = getUsersFromLocalStorage();
    const user = users.find(user => user.email === email);
    return user && user.password === password;
}

export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'));
}

export function logoutUser() {
    localStorage.removeItem('loggedInUser');
}

export function isLoggedIn() {
    return !!getLoggedInUser();
}

export function getLoggedInUserEmail() {
    const user = getLoggedInUser();
    return user && user.email;
}

export function checkPasswordStrength(password): string {
    let strength = 0;

    // If password contains both lower and uppercase characters, increase strength value.
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;

    // If it has numbers and characters, increase strength value.
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1;

    // If it has one special character, increase strength value.
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;

    // If password is longer than 7, increase strength value.
    if (password.length > 7) strength += 1;

    // Determine password strength level based on strength value.
    switch (strength) {
        case 0:
        case 1:
            return 'low';
        case 2:
        case 3:
            return 'medium';
        default:
            return 'high';
    }
}