Bug to Fix (create new branch for this):
[] All Notes should re-check any unchecked Strings
[] Make sure you only show the key patterns for selected strings - right now the pattern shows on unchecked boxes 
   I have to choose key before unchecking string choice to avoid bug

Stretch Goals:
Must Have:
[ ] Practice Mode
    [x] notes respond to mouseDown and mouseUp events
    [x] const synth should be global because it is accessed by several functions - evenutally moved to violin class?
    [ ] add hover listener specific to open strings - will trump the violin listener because it's more specific
    [x] user-defined BPM - add to td that holds play and delete buttons.  Eventually store BPM with Melody?
    [ ] Place finger numbers to the left of fingerboard

[x] Animation
    [x] note highlight synced with sound
    [x] show open strings highlighting

[x] Fingerboard Customization
    [x] choose which string(s) to display
    [x] choose which notes (by key) to display:  A major, D major, G major

[x] User class
    [x] populate select box with all students upon DOM Content Load - can maybe do without extra fetch?
    [x] alphabetize

Would be nice:

Designate BPM (moved it up to Must Have)

2 Modes:  Practice Mode and Compose Mode for Violin div
    - button group - one or the other selected
    - 2 different event listeners
    - remove the other violin element event listner on mode change (toggle event listeners)
    - on change (radio button) add proper event listener to violin div
    - remember to remove any existing event listeners for violin div
    - put radio buttons in div and attach event listener to div.
    - use if or switch to set proper event listener for violin div

Compose Mode
    - select note value
    - click on desired note
    - note with value pushed onto array in text area box.  Can be edited before submission



