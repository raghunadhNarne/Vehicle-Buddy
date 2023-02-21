let users=localStorage.getItem("users");
if(users!=null)
    users=JSON.parse(users);
else
    users=[];
users.unshift({'name':'Admin','email':'admin@admin.com','password':'1234'});
if(containsUser('admin@admin.com'))
    console.log("Contains Admin");
else
    localStorage.setItem('users',JSON.stringify(users));