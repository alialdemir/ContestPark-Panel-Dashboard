import axios from 'axios';
import { vm } from '../../main';
const apiUrlDomain = process.env.VUE_APP_BASE_API_URL;
const apiUrl = `${process.env.VUE_APP_BASE_API_URL}${process.env.VUE_APP_BASE_VERSION}`;
const clientId = process.env.VUE_APP_CLIENT_ID;
const grantType = process.env.VUE_APP_GRANT_TYPE;
const scope = process.env.VUE_APP_SCOPE;
var qs = require('qs')

const categoryActions = {

    /**
     * Token alır
     * @param {*} loginInfo kullanıcı adı şifre
     */
    async login({ dispatch }, loginInfo) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const params = qs.stringify({
            userName: loginInfo.userName,
            password: loginInfo.password,
            scope,
            client_id: clientId,
            grant_type: grantType,

        });
        axios.post(
            `${apiUrlDomain}/connect/token`,
            params,
            config)
            .then((response) => {
                dispatch('userInfo', {
                    ...response.data,
                    $vs: loginInfo.$vs
                });

                loginInfo.$vs.loading.close();
            }).catch(() => {
                dispatch('smsCodeClear');

                loginInfo.$vs.loading.close();
                loginInfo.$vs.notify({
                    time: 2500,
                    title: 'Error',
                    text: "Kullanıcı adı veya şifre yanlış",
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });
                setTimeout(() => location.reload(), 1000);
            });

    },

    /**
     * Kullanıcı bilgisini alır
     */
    async userInfo({ dispatch, commit }, token) {
        axios.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;

        const { data, status } = await axios.get(
            `${apiUrl}/Account/UserInfo`);

        const roles = ((data || {}).roles || []);
        const isRoleCheck = roles.includes('admin') && roles.includes('user');
        if (isRoleCheck === true && status === 200) {
            dispatch('setCurrentUser', {
                ...token,
                ...data,
                roles: []
            });

            commit('CHANGE_SINGIN_SUCCESS', true)

            dispatch('smsCodeClear')

            vm.$router.push({ path: '/' })


        } else {
            dispatch('smsCodeClear');
            token.$vs.notify({
                time: 2500,
                title: 'Error',
                text: "Kullanıcı adı veya şifre yanlış",
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
            });
        }
    },

    /**
     * Doğrulama sms gönderir
     */
    async sendSms({ commit }, data) {
        const { status } = await axios.post(
            `${apiUrl}/Notification/SendSms`, {
            phoneNumber: data.password,
            countryCode: '+90'
        });

        if (status === 200) {
            data.$vs.loading.close();
            commit('CHANGE_SMSCODE', 1)
        }
    },

    /**
     * Sms kodunu doğru girmiş mi kontrol eder
     */
    async checkSmsCode({ dispatch }, data) {
        axios.post(
            `${apiUrl}/Notification/CheckSmsCode`, {
            code: data.code,
            phoneNumber: data.phoneNumber
        })
            .then(response => dispatch('login', {
                userName: response.data.userName,
                password: data.phoneNumber,
                $vs: data.$vs
            }))
            .catch(() => {
                data.$vs.loading.close();

                data.$vs.notify({
                    time: 2500,
                    title: 'Error',
                    text: "Geçersiz sms kodu!",
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });

                setTimeout(() => location.reload(), 1000);
            });
    },

    /**
     * Sms kodunu 0 yapar
     */
    smsCodeClear({ commit }) {
        commit('CHANGE_SMSCODE', 0)
    },


    /**
     * Şuanki kullanıcı bilgisini değiştirir
     */
    setCurrentUser({ commit }, token) {
        if (token && token.token_type && token.access_token) {
            // TODO: token şifrele
            localStorage.setItem('currentUser', JSON.stringify(token));

            commit('CHANGE_CURRENT_USER', token);
        }
    }
}

export default categoryActions