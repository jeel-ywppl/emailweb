import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET;

export const encrypt = (data) => {
    try {
        if (!data) {
            throw new Error("No data provided to encrypt");
        }

        const dataString = typeof data === "string" ? data : JSON.stringify(data);

        const key = CryptoJS.enc.Utf8.parse(secretKey.padEnd(32, "0"));

        const iv = CryptoJS.lib.WordArray.random(16);

        const encrypted = CryptoJS.AES.encrypt(dataString, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        const ivHex = iv.toString(CryptoJS.enc.Hex);
        const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

        return `${ivHex}:${encryptedHex}`;
    } catch (error) {
        console.error("❌ Encryption failed:", error);
        throw error;
    }
};

export const decrypt = (encryptedData) => {
    try {
        if (!encryptedData || !encryptedData.includes(":")) {
            throw new Error("Invalid encrypted data format. Expected format: IV:encryptedHex");
        }

        console.log("🔓 Encrypted input received:", encryptedData);

        const [ivHex, encryptedHex] = encryptedData.split(":");
        console.log("🔍 Parsed IV (hex):", ivHex);
        console.log("🔍 Parsed Encrypted Data (hex):", encryptedHex);

        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHex);

        const key = CryptoJS.enc.Utf8.parse(secretKey.padEnd(32, "0"));
        console.log("🔑 Decryption key:", key.toString(CryptoJS.enc.Hex));

        const decrypted = CryptoJS.AES.decrypt({ciphertext: encryptedBytes}, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        console.log("✅ Decrypted string:", decryptedString);

        if (!decryptedString) {
            console.log(`Decryption resulted in empty string for input: ${encryptedData}`);
            return null;
        }

        const parsedData = JSON.parse(decryptedString);
        console.log("📦 Parsed decrypted data:", parsedData);

        return parsedData;
    } catch (error) {
        console.error("❌ Decryption failed:", error);
        throw error;
    }
};

