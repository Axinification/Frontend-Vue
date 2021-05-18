import Vue from 'vue';
// import vSelect from './node_modules';
// import './node_modules/vue-select/dist/vue-select.css';
Vue.component('navbar-top', {
    data: function () {
      return {
      }
    },
    template: `
    <div class="navbar">

        <div class="appName">
            <h1> NotesShare </h1>
        </div>

        <div class="options">
            <span v-if="this.$root.authorized">
                {{this.$root.strings.helloText}} <h4> {{this.$root.user.username}} </h4> <!-- LOGIN when logged out -->
            </span>
            <a @click="optionsOnClick" v-if="this.$root.page != 'optionsPage'"> {{this.$root.strings.optionsText}} </a>
            <a @click="myPageOnClick" v-else > {{this.$root.strings.dashboardText}} </a>
            <a @click="logout" v-if="this.$root.authorized"> {{this.$root.strings.logoutText}} </a>
            <a @click="logout" v-if="!this.$root.authorized"> {{this.$root.strings.loginText}} </a>
        </div>
    </div>`,
    methods: {
        optionsOnClick () { //TODO add options logic
            this.$root.page = 'optionsPage';
        },

        myPageOnClick () {
            this.$root.page = 'myPage';
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
                            <input required type="text" :placeholder="this.$root.strings.username" @focus='inputFocus' />
                            <svg viewbox='0 0 100 1' class='line'>
                            <path class='line--default' d='M0 10 L300 10'></path>
                            </svg>
                        </fieldset>
                        <fieldset>
                            <input required type="password" :placeholder="this.$root.strings.password" @focus='inputFocus' />
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
            note: '',
            password: "",
            confirmPassword: "",
            passwordRules: [v => !!v || this.$root.string.passRequired],
            confirmPasswordRules: [v => !!v || this.$root.string.passRequired],
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
            // this.$root.authorized = false;
            // 
            if( this.password === this.confirmPassword) {
                this.$root.page = 'loginPage';
            } else {
                this.note = this.$root.passDontMatch
            }
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
                        <h3> {{this.$root.strings.register}} </h3>
                    </header>
                    <section class="login--section">
                        <form class='login--form' @submit.prevent='makeAuth'>
                        <fieldset>
                            <input required type="email" :placeholder="this.$root.strings.email" @focus='inputFocus' />
                            <svg viewbox='0 0 100 1' class='line'>
                            <path class='line--default' d='M0 10 L300 10'></path>
                            </svg>
                        </fieldset>
                        <fieldset>
                            <input type="text" :placeholder="this.$root.strings.username" required @focus='inputFocus' />
                            <svg viewbox='0 0 100 1' class='line'>
                            <path class='line--default' d='M0 10 L300 10'></path>
                            </svg>
                        </fieldset>
                        <fieldset>
                            <input v-model="password" :rules="passwordRules" required type="password" name="password" :placeholder="this.$root.strings.password" @focus='inputFocus' ref="password" />
                            <svg viewbox='0 0 100 1' class='line'>
                            <path class='line--default' d='M0 10 L300 10'></path>
                            </svg>
                        </fieldset>
                        <fieldset>
                            <button type='submit' class='btn'>{{this.$root.strings.registerText}}</button>
                        </fieldset>
                        </form>
                    </section>
                    <span>{{this.$root.strings.alreadyHaveAcct}} <a @click="login">{{this.$root.strings.loginText}}</a></span>
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

Vue.component('my-page', {
    data: function () {
        return {
            deleteText: this.$root.strings.deleteText,
            editText: this.$root.strings.editText,
            viewText: this.$root.strings.viewText
        }
    },
    template: `
    <div class="dashboard">
        <h1> {{this.$root.strings.dashboardText}} </h1>
        <div class="notesList">
            <h2>Note List</h2>
            <div class="noteBar" v-for="note in this.$root.notes" :key="note.id">
                <div class="bar">
                    <div class="barText">
                        <div class="barTitle"><span><b>{{note.title}}</b></span></div>
                        <div class="barDescription"><span>{{note.description}}</span> </div>
                    </div>
                    <div class="barBtns">
                        <a class="saveBtn" href="#" > {{viewText}} </a>
                        <a class="editBtn" href="#" > {{editText}} </a>
                        <a class="deleteBtn" href="#" > {{deleteText}} </a>
                    </div>
                </div>
            </div>
            <div class="addNoteBtn"><a class="btn" href="#" > {{this.$root.strings.addText }} </a></div>
        </div>
        <div class="filesdrop">
            <br>
            <h2>My Files</h2>
            <div class="dropzone panel">
            
            </div>
        </div>
    </div>
    `, //TODO add dropzone and onclicks
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
     
Vue.component('options-page', {
    data: function () {
        return {
            
        }
    },
    template: `
    
    `, //TODO add dropzone and onclicks
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

// Vue.component('v-select', vSelect)

var app = new Vue({
    el: '#app',
    data: {
        authorized: true,
        page: 'optionsPage',
        strings: {
            username: "Username",
            password: "Password",
            email: "Email",
            confirmPassword: "Confirm password",
            loginFailed: "Login failed",
            register: "Register",
            askIfRegistered: "Don't have an account? ",
            alreadyHaveAcct: "Already have account? ",
            welcome: "Welcome to our app!",
            loginPanel: "Login Panel",
            helloText: 'Hello',
            optionsText: 'Options',
            logoutText: "Log Out",
            loginText: "Log In",
            registerText: "Register",
            passDontMatch: "Passwords doesn't match",
            passRequired: "Password is required",
            editText: "Edit",
            deleteText: "Delete",
            viewText: "View",
            addText: "Add note",
            dashboardText: "Dashboard",
            changeLanguage: "Change Language",
            select: "Select"
        },

        user: {
            username: 'TestTest',
            
        },

        notes: [
            {id: 0, title: "First note", description: "First notes description", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
            {id: 1, title: "Second note", description: "Second notes description", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        ],

        languages: [
            english = "English",
            polish = "Polish",
            russian = "Russian",
            german = "German"
        ]
    },
    components: {
        'v-select': v-select
    }
})