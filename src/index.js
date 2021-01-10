const endPoint = "http://localhost:3000/api/v1/melodies"
const synth = new Tone.Synth().toDestination();

document.addEventListener("DOMContentLoaded", () => {
    getMelodies()

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
    playMelody(melodyNotes)
}



function createFormHandler(e){
    e.preventDefault()
    const titleInput = document.querySelector("#input-title").value
    const notesInput = document.querySelector("#input-notes").value
    const keyInput = document.querySelector("#input-key").value
    const userId = document.querySelector("#user-id").value
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

async function playMelody(melody) {
    await Tone.start() 

    console.log("audio is ready")
    
    // Stop the Transport, position to 0, cancel any scheduled events
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    Tone.Transport.cancel();

    Tone.Transport.bpm.value = 120; // eventually make this user-defined

    Tone.Transport.schedule((time) => {

        let t = time
        let oldEl;
        

        for (let i = 0; i < melody.length; i++) {
            let note = melody[i]
            let el = document.querySelector(`[data-note="${note[0]}"]`)       
            
            if (note[0] !== "rest") {
                synth.triggerAttackRelease(note[0], Tone.Time(note[1]) - 0.1, t)
                Tone.Draw.schedule(() => {
                    if (i === 0) {
                        el.style.filter = "brightness(130%) saturate(110%)" 
                        oldEl = el
                    }
                    else {
                        console.log(oldEl)
                        oldEl.removeAttribute("style")
                        console.log(el)
                        el.style.filter = "brightness(160%) saturate(110%)"
                        oldEl = el 
                    }
                }, t)  //write a callback function to handle the DOM Manipulation    
            }
            t += Tone.Time(note[1])
            
        }
        let lastNote = melody[melody.length -1][0]
       
       
    }, 0) //end of Transport.schedule

    Tone.Transport.start()
    document.querySelector(`[data-note="${lastNote}"]`).removeAttribute("style")
}


