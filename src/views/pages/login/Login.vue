<template>
  <div class="h-screen flex w-full bg-img" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img
                width="400"
                height="230"
                src="@/assets/images/pages/rocket.png"
                alt="login"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg"
              style="min-height:420px"
            >
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Giriş Yap</h4>
                  <p>ContestPark panele hoş geldin.</p>
                </div>
                <vs-input
                  v-if="isShowSmsCodeInput"
                  v-validate="'required|min:3'"
                  data-vv-validate-on="blur"
                  placeholder="Sms ile gelen kodu giriniz"
                  v-model="smsCode"
                />

                <vs-input
                  v-if="!isShowSmsCodeInput"
                  v-validate="'required|min:3'"
                  data-vv-validate-on="blur"
                  placeholder="Kullanıcı adı"
                  v-model="userName"
                />

                <vs-input
                  v-if="!isShowSmsCodeInput"
                  data-vv-validate-on="blur"
                  v-validate="'required|min:6|max:10'"
                  type="password"
                  name="password"
                  placeholder="Şifre"
                  v-model="password"
                  class="w-full mt-6"
                />

                <vs-button class="float-right" :disabled="!validateForm" @click="login">Giriş Yap</vs-button>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      password: '',
      smsCode: '',
      smsCheckCount: 0
    };
  },
  computed: {
    validateForm() {
      return this.smsCode > 0 || (this.userName != '' && this.password != ''); //&&   !this.errors.any();
    },

    getSmsCode() {
      return this.$store.state.smsCode;
    },

    isShowSmsCodeInput() {
      return this.getSmsCode > 0;
    }
  },

  methods: {
    login() {
      const userDetails = {
        userName: this.userName,
        password: this.password
      };

      if (this.smsCheckCount > 3) {
        this.userName = '';
        this.password = '';
        this.smsCode = '';
        this.smsCheckCount = 0;

        this.$store.dispatch('smsCodeClear');
      } else if (!this.isShowSmsCodeInput) {
        this.$store.dispatch('getUserName', userDetails);
      } else if (this.getSmsCode + '' === this.smsCode) {
        alert('Login ');
      } else {
        this.smsCheckCount += 1;
        this.notifyAlreadyLogedIn();
      }
    },

    notifyAlreadyLogedIn() {
      this.$vs.notify({
        title: 'Giriş Başarısız!',
        text: 'Kullanıcı adı veya şifre yanlış!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
    }
  }
};
</script>
