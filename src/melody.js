class Melody {
    constructor(id, melodyAttributes){
        this.id = id
        this.title = melodyAttributes.title
        this.notes = melodyAttributes.notes
        this.key = melodyAttributes.key
        this.user = melodyAttributes.user //or user.name?
        Melody.all.push(this)
    }

    renderMelodyRow(){

        const melodyTable = document.querySelector("#melody-container")
        const trMelody = document.createElement("tr")
        const tdTitle = document.createElement("td")
        const tdKey = document.createElement("td")
        const tdUser = document.createElement("td")
        const tdButton = document.createElement("td")
        const playButton = document.createElement("button")
        const deleteButton = document.createElement("button")
    
        trMelody.setAttribute("data-id", this.id)
        tdTitle.innerHTML = this.title
        tdKey.innerHTML = this.key
        tdUser.innerHTML = this.user.name
        playButton.setAttribute("data-id", this.id)
        playButton.innerHTML = "Play"
        playButton.addEventListener("click", (e) => getMelody(e))
        deleteButton.setAttribute("data-id", this.id)
        deleteButton.innerHTML = "Delete"
        deleteButton.addEventListener("click", (e) => deleteMelody(e))
        
        tdButton.appendChild(playButton)
        tdButton.appendChild(deleteButton)
        
        trMelody.appendChild(tdTitle)
        trMelody.appendChild(tdKey)
        trMelody.appendChild(tdUser)
        trMelody.appendChild(tdButton)
        melodyTable.appendChild(trMelody)
    }
}
Melody.all = []