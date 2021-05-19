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

        <div class="navbarMenu">
            <span v-if="this.$root.authorized">
                {{this.$root.strings.helloText}} <h4> {{this.$root.user.username}} </h4> <!-- LOGIN when logged out -->
            </span>
            <a @click="optionsOnClick" v-if="this.$root.page != 'optionsPage'"> {{this.$root.strings.optionsText}} </a>
            <a @click="myPageOnClick" v-if="this.$root.authorized && this.$root.page == 'optionsPage'" > {{this.$root.strings.dashboardText}} </a>
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
            email: '',
            username: '',
            password: '',
            password_confirmation: '',
            login: this.$root.strings.loginPanel
        }
    },

    methods:{
        onSubmit: function() {
            console.log('Form has been submitted!'); //TODO Add authorization
            this.$root.page = 'myPage';
        },
        register () {
            this.$root.page = 'registerPage';
        },
    },
    template: `
    <div class="container">
        <validation-observer v-slot="{ invalid, handleSubmit }">
            <h3> {{login}} </h3>
            <form @submit.prevent="handleSubmit(onSubmit)">
            <div class="form-group">
                <validation-provider rules="required" v-slot="{ dirty, valid, invalid, errors }">
                    <label for="username">Username</label>
                    <div class="input-group">
                        <input type="text" id="username" name="username" placeholder="Enter your username" class="form-control" v-model="username" />
                    </div>
                    <div class="invalid-feedback d-inline-block" v-show="errors">{{ errors[0] }}</div>
                </validation-provider>
            </div>
        
            <div class="form-group">
                <validation-provider rules="required|min:6|onenumber" v-slot="{ dirty, valid, invalid, errors }">
                    <label for="password">Password</label>
                    <div class="input-group">
                        <input type="password" id="password" name="password" placeholder="Enter a password" class="form-control" v-model="password" />
                    </div>
                    <div class="invalid-feedback d-inline-block" v-show="errors">{{ errors[0] }}</div>
                </validation-provider>
            </div>
        
            <div class="form-group">
                <button type="submit" class="btn btn-block btn-lg btn-primary" v-bind:disabled="invalid">Login</button>
            </div>

            </form>
        </validation-observer>
        <span class="ask">{{this.$root.strings.askIfRegistered}} <a @click="register">{{this.$root.strings.register}}</a></span>
    </div>
    `
  }) //TODO add function to a for registering

Vue.component('register-panel', {
    data: function () {
        return {
            email: '',
            username: '',
            password: '',
            password_confirmation: '',
            register: this.$root.strings.registerPanel
        }
    },

    methods:{
        onSubmit: function() {
            console.log('Form has been submitted!');
        },

        login () { //TODO Add logout logic
            this.$root.authorized = false;
            this.$root.page = 'loginPage';
        }
    },
    template: `
    <div class="container">
        <validation-observer v-slot="{ invalid, handleSubmit }">
            <h3> {{register}} </h3>
            <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="form-group">
                <validation-provider rules="required|email" v-slot="{ dirty, valid, invalid, errors }">
                    <label for="email">Your Email</label>
                    <div class="input-group">
                        <input type="email" id="email" name="email" placeholder="email@example.com" class="form-control" v-model="email" />
                    </div>
                    <div class="invalid-feedback d-inline-block" v-show="errors">{{ errors[0] }}</div>
                </validation-provider>
            </div>
        
            <div class="form-group">
                <validation-provider rules="required" v-slot="{ dirty, valid, invalid, errors }">
                    <label for="username">Username</label>
                    <div class="input-group">
                        <input type="text" id="username" name="username" placeholder="Enter your username" class="form-control" v-model="username" />
                    </div>
                    <div class="invalid-feedback d-inline-block" v-show="errors">{{ errors[0] }}</div>
                </validation-provider>
            </div>
        
            <div class="form-group">
                <validation-provider rules="required|min:6|onenumber" vid="password" v-slot="{ dirty, valid, invalid, errors }">
                    <label for="password">Password</label>
                    <div class="input-group">
                        <input type="password" id="password" name="password" placeholder="Enter a password" class="form-control" v-model="password" />
                    </div>
                    <div class="invalid-feedback d-inline-block" v-show="errors">{{ errors[0] }}</div>
                </validation-provider>
            </div>
        
            <div class="form-group">
                <validation-provider rules="required|confirmed:password" v-slot="{ dirty, valid, invalid, errors }">
                    <label for="confirmation">Confirm Password</label>
                    <div class="input-group">
                        <input type="password" id="confirmation" name="confirmation" placeholder="Re-type password" class="form-control" v-model="password_confirmation" />
                    </div>
                    <div class="invalid-feedback d-inline-block" v-show="errors">{{ errors[0] }}</div>
                </validation-provider>
            </div>
        
            <div class="form-group">
                <button type="submit" class="btn btn-block btn-lg btn-primary" v-bind:disabled="invalid">Register</button>
            </div>

            </form>
        </validation-observer>
        <span class="ask">{{this.$root.strings.alreadyHaveAcct}} <a @click="login">{{this.$root.strings.loginText}}</a></span>
    </div>
    `
  }) //TODO add function to a for registering


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
        <h3> {{this.$root.strings.dashboardText}} </h3>
        <div class="notesList">
            <h4>Note List</h4>
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
            <div class="addNoteBtn"><a class="myBtn" href="#" > {{this.$root.strings.addText }} </a></div>
        </div>
        <div class="filesdrop">
            <br>
            <h3>My Files</h3>
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
    <div class="optionsPage container">
        <h3> {{this.$root.strings.optionsText}} </h3>
        <div class="changeLanguageContainer">
            <h4>{{this.$root.strings.changeLanguage}}</h4>
            <v-select :options="this.$root.languages"></v-select>  
            <div class="changeLanguageBtn"><a class="myBtn" href="#" > {{this.$root.strings.select}} </a></div>
        </div>
    <div class="changePasswordContainer">

    </div>
    <div class="deleteAccountContainer">

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

Object.keys(VeeValidateRules).forEach(rule => {
    VeeValidate.extend(rule, VeeValidateRules[rule]);
});

VeeValidate.extend('onenumber', {
    name: 'At least one number',
    validate: value => { 
        return value.match(/[0-9]/g) !== null
    },
    message: '{_field_} must contain at least one number.',
});

Vue.component('validation-observer', VeeValidate.ValidationObserver);

Vue.component('validation-provider', VeeValidate.ValidationProvider);

Vue.component('v-select', VueSelect.VueSelect)

var app = new Vue({
    el: '#app',
    data: {
        authorized: true,
        page: 'registerPage',
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
            registerPanel: "Registration",
            helloText: 'Hello',
            optionsText: 'Options',
            logoutText: "Log Out",
            loginText: "Log In",
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

        email: '',
        name: '',
        phone: '',
        url: '',

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
    methods: {
        
        inputFocus () {
            this.note = ''
        },

        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
              if (result) {
                // eslint-disable-next-line
                alert('Form Submitted!');
                return;
              }
      
              alert('Correct them errors!');
            });
          }
    }
})