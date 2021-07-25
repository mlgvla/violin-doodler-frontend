const endPoint = "http://localhost:3000/api/v1/melodies"
const endPointUsers = "http://localhost:3000/api/v1/users"
const synth = new Tone.Synth().toDestination();


document.addEventListener("DOMContentLoaded", () => {
    getMelodies()
    getUsers

    createMelodyForm = document.querySelector("#create-melody-form")

    createMelodyForm.addEventListener('submit', (e) => createFormHandler(e))
})

function getMelodies() {
    fetch(endPoint)
        .then(res => res.json())
        .then(melodies => {
            console.log(melodies.data)
            melodies.data.forEach(melody => {
                const newMelody = new Melody(melody.id, melody.attributes)
                newMelody.renderMelodyRow()
            })
            

            //**use melodies.data in a call to renderUserSelect(melody), which populates the select box
            //in the form with all current users - do this in the User Class, maybe?**

            //eliminate this after I refactor rendorMelodyRow to use
            // createElements and AppendChilds
            //melodies.data.forEach(melody => attachEventListeners(melody))           
        })
}





//eliminate this after event listener is attached in refactored render function
// function attachEventListeners(melody) {
//     let btn = document.querySelector(`button[data-id="${melody.id}"]`)
    
//     btn.addEventListener("click", (e) =>  getMelody(e))
// }

// function getMelody(e) {
//     // right now this is with a fetch.  Eventually, I will get it from the JS Melody Class
//     fetch(endPoint + `/${e.target.dataset.id}`)
//         .then(res => res.json())
//         .then(melody => {
//             //must get rid of outer quotes!!
//             //JSON require string literals to be in double quotes in order to parse!!!  But in order to
//             //store as a string of nested arrays, I need the single quotes in the seed file.  The Regex makes it parsable!
//             //Will try with escape characters in the seed file.  Update:  that worked!
//             melodyNotes = JSON.parse(melody.data.attributes.notes)
  
//             //melodyNotes = JSON.parse(melody.data.attributes.notes.replace(/'/g, '"')) don't need this for now. Just holding onto the RegEx!
//             debugger
//             playMelody(melodyNotes)
//         })
// }


// Using Melody Class to access Melody instead of fetch call

function getMelody(e) {
    melodyNotes = JSON.parse(Melody.findById(e.target.dataset.id).notes)
    //get the BPM out of the tempo input box
    const tempo = document.getElementById("tempo").value
    playMelody(melodyNotes, parseInt(tempo))
}



function createFormHandler(e){
    e.preventDefault()
    const titleInput = document.querySelector("#input-title").value
    const notesInput = document.querySelector("#input-notes").value
    const keyInput = document.querySelector("#input-key").value
    const userId = document.querySelector("#users").value
    //const userId = parseInt(userInput) for inputting a new user
    postMelody(titleInput, notesInput, keyInput, userId)
}


function postMelody(title, notes, key, user_id){
    const bodyData = {title, notes, key, user_id}

    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(res => res.json())
    .then(melody => {
        const newMelody = new Melody(melody.data.id, melody.data.attributes)
        newMelody.renderMelodyRow()
    })
    document.querySelector("#create-melody-form").reset()
}

function deleteMelody(e) {
    const confirm = window.confirm("Are you sure you want to delete this melody?")
    if (confirm == true) {
        e.preventDefault()
        const configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        fetch(endPoint + `/${e.target.dataset.id}`, configObj)
        e.target.parentElement.parentElement.remove()
        // also remove from Melody.all
        Melody.deleteById(e.target.dataset.id) 
    }    
}





// Violin Class Functions
// display strings()
// display note()

// Violin Sandbox Code

//const play = document.querySelector("#run")

const violin = document.querySelector(".violin")

// violin.addEventListener("click", (e) => {
//    console.log(e.target.dataset.note)
//    playNote(e.target.dataset.note)
//  }) // click on a note bubbles up to violin!!!!  Very cool!!!
    // change to mouseDown and mouseUp listeners with noteOn and noteOff handlers

violin.addEventListener("mousedown", e => playNote(e.target.dataset.note))
violin.addEventListener("mouseup", e =>  synth.triggerRelease())

// play.addEventListener("click", async () => {
    
// 	await Tone.start()
//     console.log("audio is ready")
//     playMelody()
// })

async function playNote(note){
    await Tone.start()  
    synth.triggerAttack(note);
}



// function playTest(){
//     const synth = new Tone.Synth().toDestination();
//     Tone.Transport.bpm.value = 200
//     const now = Tone.now()
//     synth.triggerAttackRelease("C4", "4n", now)
//     synth.triggerAttackRelease("E4", "4n", now + .5)
//     synth.triggerAttackRelease("G4", "2n", now + 1)
// }
// Melody Class Functions
// playNote - helps playMelody - implement mousedown/mouseup to doodle
// consider renaming parent divs g-string, d-string, etc.

// async function playMelody(melody) {  // will eventually play .this

//     await Tone.start()
//     //const synth = new Tone.Synth().toMaster();
//     Tone.Transport.bpm.value = 120;

//     let t = Tone.now();
 
//     for (const note of melody) {
//         //let el = document.querySelector(`[data-note="${note[0]}"]`)
//         if (note[0] !== "rest") {
//             //synth.triggerAttackRelease(note[0], note[1], t);
//            //el.style.filter = "brightness(130%) saturate(110%)"
            
//             //Experiment using separate triggerAttack and triggerRelease for animation?
//             synth.triggerAttackRelease(note[0], Tone.Time(note[1]) - 0.1, t);
//           //setTimeout(function (){ el.removeAttribute("style") }, Tone.Time(note[1]).toMilliseconds())//set equal to note length
           
//         }
//     t += Tone.Time(note[1]);
//     //setTimeout(function (){ el.removeAttribute("style") }, Tone.Time(note[1]).toMilliseconds())//set equal to 

//   }  
// }

async function playMelody(melody, tempo) {
   
    await Tone.start() 

    console.log("audio is ready")
    
    // Stop the Transport, position to 0, cancel any scheduled events
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    Tone.Transport.cancel();

    Tone.Transport.bpm.value = tempo; // eventually make this user-defined

    Tone.Transport.schedule((time) => {

        let t = time
        let oldEl; // 
        let lastTime; // need in order to schedule removing style from last note
        

        for (let i = 0; i < melody.length; i++) {
            let note = melody[i]
            let el;

            //is this an open string? G3 has no 4th finger equivalent.  Just have open string light up. 4th finger alone or both can be an option later on. 
            if (note[0] == "D4" || note[0] == "A4" || note[0] == "E5") {
                el = document.querySelectorAll(`[data-note="${note[0]}"]`)[1] // there are two elements with the same data-note value. We want the open-string element
            } else {
                el = document.querySelector(`[data-note="${note[0]}"]`)  
            }
            
            if (note[0] !== "rest") {
                synth.triggerAttackRelease(note[0], Tone.Time(note[1]) - 0.1, t)
                Tone.Draw.schedule(() => {
                    if (i === 0) {
                        el.style.filter = "brightness(160%) saturate(110%)" // chnaged from 130 to 160 - not sure why it worked with 130.
                        oldEl = el
                    }
                    else {
                        //console.log(oldEl)
                        oldEl.removeAttribute("style")
                        //console.log(el)
                        el.style.filter = "brightness(160%) saturate(110%)"
                        oldEl = el 
                    }
                }, t)  //write a callback function to handle the DOM Manipulation    
            }
            t += Tone.Time(note[1])
            lastTime = t // keep track of time to schedule removing style from last note after for loop
            
        }// end of for loop
        // schedule removing style from last note
        Tone.Draw.schedule(() => {
            let lastNote = melody[melody.length -1][0]
          
            if (lastNote == "D4" || lastNote == "A4" || lastNote == "E5") {
                console.log(lastNote)
                document.querySelectorAll(`[data-note="${lastNote}"]`)[1].removeAttribute("style")   
            } else {
                document.querySelector(`[data-note="${lastNote}"]`).removeAttribute("style")  
            }
        }, lastTime)
    }, 0) //end of Transport.schedule

    Tone.Transport.start()   
}

// Preferences
const stringChange = document.querySelector("#stringGroup")

stringChange.addEventListener("change", (e) => {
    let string = e.target.dataset.show
    let elements = document.querySelectorAll(`.note.${string}`)
    if (!e.target.checked) {
        elements.forEach((element) => {
            element.style.visibility = "hidden"
        })
    } else {
        elements.forEach((element) => {
            element.style.visibility = "visible"
        })
    }
 })

 const keyChange = document.querySelector("#keyGroup")

 keyChange.addEventListener("change", (e) => keyPattern(e.target.dataset.key))

 function keyPattern(key) {
     console.log(key)

    // hide all strings
    document.querySelectorAll(".note").forEach(note => {
        note.style.visibility = "hidden"
    })

    // notes to display by key signature
    const aPattern = ["A3","B3","C#4","D4","E4","F#4","G#4","A4","B4","C#5","D5","E5","F#5","G#5","A5","B5"]
    const dPattern = ["A3","B3","C#4","D4","E4","F#4","G4","A4","B4","C#5","D5","E5","F#5","G5","A5","B5"]
    const gPattern = ["A3","B3","C4","D4","E4","F#4","G4","A4","B4","C5","D5","E5","F#5","G5","A5","B5"]
    const cPattern = ["A3","B3","C4","D4","E4","F4","G4","A4","B4","C5","D5","E5","F5","G5","A5","B5"]
    
    // create a switch statement here for the selected key - make "all" the default pattern
    switch(key) {
        case "a-major":
            showFingerPattern(aPattern)
            break;
        case "d-major":
            showFingerPattern(dPattern)
            break;
        case "g-major":
            showFingerPattern(gPattern)
            break;
        case "c-major":
            showFingerPattern(cPattern)
            break;
        default:
            //Fix Bug: recheck any unchecked String checkboxes when "All Notes is select"
            document.querySelectorAll(".note").forEach(note => {
                note.style.visibility = "visible"
            })
            document.querySelectorAll("[data-show]").forEach(cb => {
                cb.checked = true
            })
    }
 }

 function showFingerPattern(pattern) {
    pattern.forEach((note) => {
        document.querySelector(`[data-note="${note}"]`).style.visibility = "visible"
    })
    document.querySelectorAll("[data-show]").forEach(cb => {
        cb.checked = true
    })
 }

 function getUsers() {
    fetch(endPointUsers)
        .then(res => res.json())
        .then(users => {
            User.userSelectOptions(users.data)            
        })
}

function addUser(e) {
    //called by user form event listener
    //get name out of target
    //put it into a configObj
    //POST it to the database
    //call getUsers to repopulate the Select options
}




