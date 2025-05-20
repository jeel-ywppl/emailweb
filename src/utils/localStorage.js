import {config} from "./util";

const SECRET_KEY = config.SECRET_KEY;

const customEncrypt = (text) => {
    if (!text || typeof text !== "string" || !SECRET_KEY) return "";
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
        encryptedText += String.fromCharCode(
            text.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length),
        );
    }
    return encryptedText;
};

const customDecrypt = (encryptedText) => {
    if (!encryptedText || typeof encryptedText !== "string" || !SECRET_KEY) return "";
    let decryptedText = "";
    for (let i = 0; i < encryptedText.length; i++) {
        decryptedText += String.fromCharCode(
            encryptedText.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length),
        );
    }
    return decryptedText;
};

export const removeItem = (key) => {
    localStorage.removeItem(key);
};

export const setItem = (key, value) => {
    if (!key || value === undefined) return;
    const stringValue = customEncrypt(JSON.stringify(value));
    localStorage.setItem(key, stringValue);
};

export const getItem = (key) => {
    const item = localStorage?.getItem(key);
    if (item) {
        try {
            const decryptedValue = customDecrypt(item);
            return JSON.parse(decryptedValue);
        } catch (error) {
            console.error(error);
            removeItem(key);
            return "";
        }
    }
    removeItem(key);
    return "";
};
