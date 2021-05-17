var navbar = new Vue({ 
    el: '#navbar',
    data: {
        newFileText: 'New File',
        uploadFileText: 'Upload File',
        myFilesText: 'My Files',
        helloText: 'Hello',
        username: 'Username',
        optionsText: 'Options',
        loginText: "Log In"
    }
});

var panels = new Vue({
    el: '#panels',
    data: {
        noteTitle: 'Edit Text Note',
        page: "editPage" //editPage - edit texts  
    }
});

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

