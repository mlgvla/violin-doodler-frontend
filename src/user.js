class User {

    constructor(id, name){
        this.id = id
        this.name = name
        User.all.push(this)
    }

    static userSelectOptions(users){

        const sortedUsers = users.sort((a, b) => (a.attributes.name > b.attributes.name) ? 1 : -1)
        const select = document.getElementById("users")
        
        sortedUsers.forEach(user => {
          let option = document.createElement("option")
  
          option.value = user.id
          option.setAttribute("name", user.attributes.name)
          option.innerHTML = user.attributes.name
          select.appendChild(option)           
        });
    }
}

User.all = []