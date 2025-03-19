import {config} from "./util";

const SECRET_KEY = config.SECRET_KEY;

const customEncrypt = (text) => {
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
        encryptedText += String.fromCharCode(
            text.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length),
        );
    }
    return encryptedText;
};

const customDecrypt = (encryptedText) => {
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
    const stringValue = customEncrypt(JSON.stringify(value), SECRET_KEY ?? "");
    localStorage.setItem(key, stringValue);
};

export const getItem = (key) => {
    const item = localStorage.getItem(key);
    if (item) {
        try {
            const decryptedValue = customDecrypt(item, SECRET_KEY ?? "");
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
