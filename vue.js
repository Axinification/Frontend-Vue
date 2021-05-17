Vue.component('navbar-top', {
    data: function () {
      return {
      }
    },
    template: `
    <div class="navbar">

        <div class="appName">
            <h1> APPs NAME </h1>
        </div>

        <div class="options">
            <span v-if="this.$root.authorized">
                {{this.$root.strings.helloText}} <h4> {{this.$root.user.username}} </h4> <!-- LOGIN when logged out -->
            </span>
            <a @click="optionsOnClick"> {{this.$root.strings.optionsText}} </a>
            <a @click="logout" v-if="this.$root.authorized"> {{this.$root.strings.logoutText}} </a>
            <a @click="logout" v-if="!this.$root.authorized"> {{this.$root.strings.loginText}} </a>
        </div>
    </div>`,
    methods: {
        optionsOnClick () { //TODO add options logic
            this.$root.page = 'optionsPage';
        },

        logout () { //TODO Add logout logic
            this.$root.authorized = false;
            this.$root.page = 'loginPage';
        }
    }
  })

Vue.component('login-panel', {
    data: function () {
        return {
            note: ''
        }
    },
    watch: {
        note () {
        const note = document.querySelector('.note')
        if (this.note.length) {
            note.classList.add('note--up')
        } else {
            note.classList.remove('note--up')
            note.classList.add('note--down')
        }
        }
    },
    methods:{
        // login() {
        //     if(this.input.username != "" && this.input.password != "") {
        //         if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
        //             this.$emit("authenticated", true);
        //             this.$router.replace({ name: "secure" });
        //         } else {
        //             console.log("The username and / or password is incorrect");
        //         }
        //     } else {
        //         console.log("A username and password must be present");
        //     }
        // }
        makeAuth (e) {
            // write you own auth logic here
            this.$root.authorized = true;
            this.$root.page = 'myPage';
            this.note = this.$root.loginFailed
        },
        inputFocus () {
            this.note = ''
        },
        register () {
            this.$root.page = 'registerPage';
        }
    },
    template: `
    <div class="loginPage">
        <h1>{{this.$root.strings.welcome}}</h1>
            <div class="container">
                <div class="note note--down"><p>{{ this.note }}</p></div>
                <div class="login">
                    <header class="login--header">
                        <h3> {{this.$root.strings.loginPanel}} </h3>
                    </header>
                    <section class="login--section">
                        <form class='login--form' @submit.prevent='makeAuth'>
                        <fieldset>
                            <input v-validate="'required'" type="text" :placeholder="this.$root.strings.username" @focus='inputFocus' />
                            <svg viewbox='0 0 100 1' class='line'>
                            <path class='line--default' d='M0 10 L300 10'></path>
                            </svg>
                        </fieldset>
                        <fieldset>
                            <input v-validate="'required'" type="password" :placeholder="this.$root.strings.password" @focus='inputFocus' />
                            <svg viewbox='0 0 100 1' class='line'>
                            <path class='line--default' d='M0 10 L300 10'></path>
                            </svg>
                        </fieldset>
                        <fieldset>
                            <button type='submit' class='btn'>{{this.$root.strings.loginText}}</button>
                        </fieldset>
                        </form>
                    </section>
                    <span>{{this.$root.strings.askIfRegistered}} <a @click="register">{{this.$root.strings.register}}</a></span>
                </div>
            </div>  
    </div>`
  }) //TODO add function to a for registering

  Vue.component('register-panel', {
    data: function () {
        return {
            note: ''
        }
    },
    watch: {
        note () {
        const note = document.querySelector('.note')
        if (this.note.length) {
            note.classList.add('note--up')
        } else {
            note.classList.remove('note--up')
            note.classList.add('note--down')
        }
        }
    },
    methods:{
        // register() {
        //     if(this.input.username != "" && this.input.password != "") {
        //         if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
        //             this.$emit("authenticated", true);
        //             this.$router.replace({ name: "secure" });
        //         } else {
        //             console.log("The username and / or password is incorrect");
        //         }
        //     } else {
        //         console.log("A username and password must be present");
        //     }
        // }
        makeAuth (e) {
            // write you own auth logic here
            this.$root.authorized = false;
            this.$root.page = 'loginPage';
            this.note = this.$root.passDontMatch

        },
        inputFocus () {
            this.note = ''
        },
        register () {

            this.$root.page = 'registerPage';
        },
        login () { //TODO Add logout logic
            this.$root.authorized = false;
            this.$root.page = 'loginPage';
        }
    },
    template: `
    <div class="loginPage">
        <h1>{{this.$root.strings.welcome}}</h1>
            <div class="container">
                <div class="note note--down"><p>{{ this.note }}</p></div>
                <div class="login">
                    <header class="login--header">
                        <h3> {{this.$root.strings.loginPanel}} </h3>
                    </header>
                    <section class="login--section">
                        <form class='login--form' @submit.prevent='makeAuth'>
                        <fieldset>
                            <input type="text" :placeholder="this.$root.strings.username" required @focus='inputFocus' />
                            <svg viewbox='0 0 100 1' class='line'>
                            <path class='line--default' d='M0 10 L300 10'></path>
                            </svg>
                        </fieldset>
                        <fieldset>
                            <input id="txtPassword" v-validate="'required'" type="password" :placeholder="this.$root.strings.password" @focus='inputFocus' />
                            <svg viewbox='0 0 100 1' class='line'>
                            <path class='line--default' d='M0 10 L300 10'></path>
                            </svg>
                        </fieldset>
                        <fieldset>
                            <input id="txtPasswordConfirm" v-validate="'required|confirmed:password'" type="password" :placeholder="this.$root.strings.confirmPassword" @focus='inputFocus' required />
                            <svg viewbox='0 0 100 1' class='line'>
                            <path class='line--default' d='M0 10 L300 10'></path>
                            </svg>
                        </fieldset>
                        <fieldset>
                            <button type='submit' class='btn'>{{this.$root.strings.loginText}}</button>
                        </fieldset>
                        </form>
                    </section>
                    <span>{{this.$root.strings.alreadyHaveAcct}} <a @click="login">{{this.$root.strings.login}}</a></span>
                </div>
            </div>  
    </div>`
  }) //TODO add function to a for registering
// var editNote = new Vue({
//     el: '#editNote',
//     data(){
//         return {
//             note : {
//                 title: 'Notes Title',
//                 description: 'Notes Description',
//                 content: 'Notes content'
//             },
//             editField: ''
//         }
//     },
//     methods: {
//         focusField(field){
//           this.editField = field;
//         },
//         blurField(){
//           this.editField = '';
//         },
//         showField(field){
//           return (this.user[field] == '' || this.editField == field)
//         }
//       }
// })

// Vue.component('editable',{
//     template:'<div contenteditable="true" @input="update"></div>',
//     props:['content'],
//     mounted:function(){
//       this.$el.innerText = this.content;
//     },
//     methods:{
//       update:function(event){
//         this.$emit('update',event.target.innerText);
//       }
//     }
//   })

{/* <h1> {{noteTitle}} </h1> <!-- NOTE TITLE -->
            <editable :content="text" @update="text = $event" style="outline: 0px solid transparent;"></editable>
            <div class="panel">
                <!-- Content -->
                <div id="textArea">
                    <editable :content="text" @update="text = $event" style="width:95%; height:95%; margin: auto; outline: 0px solid transparent;"></editable>
                </div>
            </div> */}

var app = new Vue({
    el: '#app',
    data: {
        authorized: true,
        page: 'loginPage',
        strings: {
            username: "Username",
            password: "Password",
            confirmPassword: "Confirm password",
            loginFailed: "Login failed",
            register: "register",
            askIfRegistered: "I you don't have an account ",
            alreadyHaveAcct: "Already have account? ",
            welcome: "Welcome to our app!",
            loginPanel: "Login Panel",
            helloText: 'Hello',
            optionsText: 'Options',
            logoutText: "Log Out",
            loginText: "Log In",
            passDontMatch: "Passwords doesn't match"
        },

        user: {
            username: 'TestTest',
            
        }
    },
    components: {

    }
})