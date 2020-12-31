const endPoint = "http://localhost:3000/api/v1/melodies"

document.addEventListener("DOMContentLoaded", () => {
    getMelodies()
})

function getMelodies() {
    fetch(endPoint)
        .then(res => res.json())
        .then(melodies => {
            console.log(melodies.data)
            melodies.data.forEach(melody => renderMelodyRow(melody))

            melodies.data.forEach(melody => attachEventListeners(melody))           
        });
}

function renderMelodyRow(melody){
    const melodyMarkup = `
        <tr data-id=${melody.id}>
            <td>${melody.attributes.title}</td>
            <td>${melody.attributes.key}</td>
            <td>${melody.attributes.user.name}</td>
            <td><button data-id=${melody.id}>Play</button></td>                      
        </tr>`
        
    document.querySelector('#melody-container').innerHTML += melodyMarkup
}

function attachEventListeners(melody) {
    let btn = document.querySelector(`button[data-id="${melody.id}"]`)
    
    btn.addEventListener("click", (e) =>  getMelody(e))
}

function getMelody(e) {
    // right now this is with a fetch.  Eventually, it will get it from the JS Melody Class
    fetch(endPoint + `/${e.target.dataset.id}`)
        .then(res => res.json())
        .then(melody => {
            //must get rid of outer quotes!!
            //JSON require string literals to be in double quotes in order to parse!!!  But in order to
            //store as a string of nested arrays, I need the single quotes.  The Regex makes it parsable!
            
            melodyNotes = JSON.parse(melody.data.attributes.notes.replace(/'/g, '"'))
            playMelody(melodyNotes)
        })
}






// Violin Class Functions
// display strings()
// display note()

// Violin Sandbox Code

const play = document.querySelector("#run")

const violin = document.querySelector(".violin")

violin.addEventListener("click", (e) => {
   console.log(e.target.dataset.note)
   playNote(e.target.dataset.note)
 }) // click on a note bubbles up to violin!!!!  Very cool!!!



play.addEventListener("click", async () => {
    
	await Tone.start()
    console.log("audio is ready")
    playMelody()
})

async function playNote(note){
    await Tone.start()
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "8n")
}



function playTest(){
    const synth = new Tone.Synth().toDestination();
    Tone.Transport.bpm.value = 200
    const now = Tone.now()
    synth.triggerAttackRelease("C4", "4n", now)
    synth.triggerAttackRelease("E4", "4n", now + .5)
    synth.triggerAttackRelease("G4", "2n", now + 1)
}
// Melody Class Functions
// playNote - helps playMelody - 
// setup eventlisteners for all notes
// consider renaming parent divs g-string, d-string, etc.

async function playMelody(melody) {  // will eventually play .this
    console.log("in playMelody")
    debugger
    await Tone.start()
    console.log("audio is ready")

    const synth = new Tone.Synth().toMaster();
    Tone.Transport.bpm.value = 120;

    const mary = [['E4', '4n.'], ['D4', '8n'], ['C4', '4n'], ['D4', '4n'], ['E4', '4n'], ['E4', '4n'], ['E4', '2n'], ['D4', '4n'], ['D4', '4n'], ['D4', '2n'],    ['E4', '4n'], ['G4', '4n'], ['G4', '4n'], ['rest', '4n'], ['E4', '4n.'],   ['D4', '8n'], ['C4', '4n'], ['D4', '4n'], ['E4', '4n'], ['E4', '4n'], ['E4', '4n'], ['E4', '4n'], ['D4', '4n'], ['D4', '4n'], ['E4', '4n'], ['D4', '4n'], ['C4', '1m']]


    const lightlyRow = [['E5', '4n'], ['C#5', '4n'], ['C#5', '2n'], ['D5', '4n'], ['B4', '4n'], ['B4', '2n'], ['A4', '4n'], ['B4', '4n'], ['C#5', '4n'], ['D5', '4n'], ['E5', '4n'], ['E5', '4n'], ['E5', '2n'], ['E5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['D5', '4n'], ['B4', '4n'], ['B4', '4n'], ['B4', '4n'], ['A4', '4n'], ['C#5', '4n'], ['E5', '4n'], ['E5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['C#5', '2n'], ['B4', '4n'], ['B4', '4n'], ['B4', '4n'], ['B4', '4n'], ['B4', '4n'], ['C#5', '4n'], ['D5', '2n'], ['C#5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['D5', '4n'], ['E5', '2n'], ['E5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['D5', '4n'], ['B4', '4n'], ['B4', '4n'], ['B4', '4n'], ['A4', '4n'], ['C#5', '4n'], ['E5', '4n'], ['E5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['C#5', '2n']]

  
    const twinkle =  [['A4', '4n'], ['A4', '4n'], ['E5', '4n'], ['E5', '4n'], ['F#5', '4n'], ['F#5', '4n'], ['E5', '2n'], ['D5', '4n'], ['D5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['B4', '4n'], ['B4', '4n'], ['A4', '2n'], ['E5', '4n'], ['E5', '4n'], ['D5', '4n'], ['D5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['B4', '2n'], ['E5', '4n'], ['E5', '4n'], ['D5', '4n'], ['D5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['B4', '2n'], ['A4', '4n'], ['A4', '4n'], ['E5', '4n'], ['E5', '4n'], ['F#5', '4n'], ['F#5', '4n'], ['E5', '2n'], ['D5', '4n'], ['D5', '4n'], ['C#5', '4n'], ['C#5', '4n'], ['B4', '4n'], ['B4', '4n'], ['A4', '2n']]

//window.onmousedown = (e) => {
  // Play the melody!

  let t = Tone.now();
 

//   for (const note of melody) {
//     console.log(note);
//     if (note[0] !== "rest") {
//       //synth.triggerAttackRelease(note[0], note[1], t);
//       synth.triggerAttackRelease(note[0], Tone.Time(note[1]) - 0.1, t);
//     }
//     t += Tone.Time(note[1]);
//   }

    for (const note of melody) {
        console.log(note);
        let el = document.querySelector(`[data-note="${note[0]}"]`)
        if (note[0] !== "rest") {
            //synth.triggerAttackRelease(note[0], note[1], t);
           //el.style.filter = "brightness(130%) saturate(110%)"
            
            //Experiment using separate triggerAttack and triggerRelease for animation?
            synth.triggerAttackRelease(note[0], Tone.Time(note[1]) - 0.1, t);
          //setTimeout(function (){ el.removeAttribute("style") }, Tone.Time(note[1]).toMilliseconds())//set equal to note length
           
        }

    t += Tone.Time(note[1]);
    //setTimeout(function (){ el.removeAttribute("style") }, Tone.Time(note[1]).toMilliseconds())//set equal to 

  }

  
}


