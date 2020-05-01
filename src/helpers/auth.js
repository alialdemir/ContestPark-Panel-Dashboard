import CryptoJS from "crypto-js";
import Vue from 'vue';
const clientName = process.env.VUE_APP_CLIENT_NAME;
const key = 'cu';
/**
 * Login olan kullanıcı bilgisi
 */
export function getCurrentUser() {
    const originalText = Vue.$cookies.get(key);
    if (originalText) {
        var bytes = CryptoJS.AES.decrypt(originalText, clientName);
        var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8) || '{}');
        return currentUser;
    }

    return null;
}

/**
 * Kullanıcı set eder
 * @param {*} currentUser 
 */
export function setCurrentUser(currentUser) {
    var tokenText = CryptoJS.AES.encrypt(
        JSON.stringify(currentUser),
        clientName
    ).toString();

    Vue.$cookies.set(key, tokenText, '30MIN');// 30 dakika session süresi var
}

/**
 * Cookie üzerinden şuanki kullanıcıyı kaldırır
 */
export function removeCurrentUser() {
    Vue.$cookies.remove(key);
}

