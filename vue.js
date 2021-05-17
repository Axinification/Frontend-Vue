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
        titleText: 'Title',
        deleteText: 'Delete',
        saveText: 'Save',
        editText: 'Edit',
        isEdited: false
    }
});

Vue.component('editable',{
    template:'<div contenteditable="isEdited" @input="update"></div>',
    props:['content'],
    mounted:function(){
      this.$el.innerText = this.content;
    },
    methods:{
      update:function(event){
        this.$emit('update',event.target.innerText);
      }
    }
  })

  var textArea = new Vue({
    el: '#textArea',
    data: {
      text:"This text is editable!"
    }
  });

