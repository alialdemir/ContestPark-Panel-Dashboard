import axios from 'axios';
const apiUrlDomain = process.env.VUE_APP_BASE_API_URL;
const apiUrl = `${process.env.VUE_APP_BASE_API_URL}${process.env.VUE_APP_BASE_VERSION}`;
const clientId = process.env.VUE_APP_CLIENT_ID;
const grantType = process.env.VUE_APP_GRANT_TYPE;
const scope = process.env.VUE_APP_SCOPE;
var qs = require('qs')

const categoryActions = {

    /**
     * Telefon numarası ile kullanıcı adı sorgulama 
     */
    async getUserName({ dispatch }, userData) {
        const { data, status } = await axios.get(
            `${apiUrl}/Account/GetUserName?phoneNumber=${userData.password}`
        );

        if (status === 200 && data.userName === userData.userName) {
            dispatch('login', userData);

        }
    },

    /**
     * Token alır
     * @param {*} userData kullanıcı adı şifre
     */
    async login({ dispatch }, userData) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const params = qs.stringify({
            ...userData,
            scope,
            client_id: clientId,
            grant_type: grantType,

        });
        const { data, status } = await axios.post(
            `${apiUrlDomain}/connect/token`,
            params,
            config);

        if (status === 200) {
            dispatch('userInfo', {
                ...data,
                phoneNumber: userData.password
            })
        }
    },

    /**
     * Kullanıcı bilgisini alır
     */
    async userInfo({ dispatch }, token) {
        axios.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;

        const { data, status } = await axios.get(
            `${apiUrl}/Account/UserInfo`);

        const roles = ((data || {}).roles || []);
        const isRoleCheck = roles.includes('admin') && roles.includes('user');
        if (isRoleCheck === true && status === 200) {
            dispatch('sendSms', token.phoneNumber);
        } else {
            alert("Kullanıcı adı veya şifre yanlış")
        }
    },

    /**
     * Doğrulama sms gönderir
     */
    async sendSms({ commit }, phoneNumber) {
        const { data, status } = await axios.post(
            `${apiUrl}/Notification/Sms`, {
            PhoneNumber: phoneNumber,
            CountryCode: '+90'
        });

        if (status === 200) {
            commit('CHANGE_SMSCODE', data.code)
        }
    },

    /**
     * Sms kodunu 0 yapar
     */
    smsCodeClear({ commit }) {
        commit('CHANGE_SMSCODE', 0)
    }
}

export default categoryActions