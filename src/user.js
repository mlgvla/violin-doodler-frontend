class User {
    constructor(id, name){
        this.id = id
        this.name = name
        allUsers.push(this)
    }

    userSelectOptions(){       
        const select = document.getElementById("users")
        const option = document.createElement("option")

        option.value = this.id
        option.setAttribute("name", this.name)
        option.innerHTML = this.name
        select.appendChild(option)           

    }
    static clearSelectOptions(selectBox){
        const select = document.getElementById("users")
        while (selectBox.options.length > 0) {
            selectBox.remove(0);
        }
    }
}
