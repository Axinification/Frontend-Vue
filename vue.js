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

