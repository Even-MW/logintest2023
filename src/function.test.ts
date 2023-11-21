// require isValidEmail from functions.tsx
// ts ignore this file
import { isValidEmail, isLongEnoughPassword, isValidPassword, getUsersFromLocalStorage, registerUser, loginUser, checkPasswordStrength } from './functions'

test('isValidEmail returns true for valid emails', () => {
    expect(isValidEmail('even@test.no')).toBe(true);
});

test('isValidEmail returns false for invalid emails', () => {
    expect(isValidEmail('even@test')).toBe(false);
});

test('isLongEnoughPassword returns true for long enough passwords', () => {
    expect(isLongEnoughPassword('12345678')).toBe(true);
});

test('isLongEnoughPassword returns false for too short passwords', () => {
    expect(isLongEnoughPassword('12345')).toBe(false);
});

test('isValidPassword returns true for valid passwords', () => {
    expect(isValidPassword('Test123@')).toBe(true);
});

test('isValidPassword returns false for invalid passwords', () => {
    expect(isValidPassword('1234567')).toBe(false);
});

test('getUsersFromLocalStorage returns empty array if no users in local storage', () => {
    window.localStorage.clear();
    expect(getUsersFromLocalStorage()).toEqual([]);
});

test('getUsersFromLocalStorage returns users from local storage', () => {
    window.localStorage.clear();
    window.localStorage.setItem('users', JSON.stringify([{ email: 'even@jest.no', password: 'Test123@' }]));
    expect(getUsersFromLocalStorage()).toEqual([{ email: 'even@jest.no', password: 'Test123@' }]);
});

test('registerUser adds user to local storage', () => {
    window.localStorage.clear();
    registerUser({ email: 'even@jest.no', password: 'Test123@' });
    expect(getUsersFromLocalStorage()).toEqual([{ email: 'even@jest.no', password: 'Test123@' }]);
});

test('loginUser returns true if user exists', () => {
    window.localStorage.clear();
    window.localStorage.setItem('users', JSON.stringify([{ email: 'even@jest.no', password: 'Test123@' }]));
    expect(loginUser('even@jest.no', 'Test123@')).toBe(true);
});


test('loginUser returns false if user does not exist', () => {
    window.localStorage.clear();
    window.localStorage.setItem('users', JSON.stringify([{ email: 'even@jest.no', password: 'Test123@' }]));
});

test('checkPasswordStrength returns low for weak passwords', () => {
    expect(checkPasswordStrength('123456')).toBe('low');
});

test('checkPasswordStrength returns medium for medium passwords', () => {
    expect(checkPasswordStrength('Test123')).toBe('medium');
});

test('checkPasswordStrength returns high for strong passwords', () => {
    expect(checkPasswordStrength('12345678Aa@')).toBe('high');
});







