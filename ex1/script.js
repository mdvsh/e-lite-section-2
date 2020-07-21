// Learnt about dependent forms, ternary operator, find and every methods.
// Initial reading from https://stackoverflow.com/questions/29623225/javascript-dependent-drop-down-list

const name_inp = document.querySelector("input#name")
const email_inp = document.querySelector("input#email")
const class_sel = document.querySelector("select#class")
const sec_sel = document.querySelector("select#section")
const form = document.querySelector("form")

const sec_num = {
    VI: 10,
    VII: 10,
    VIII: 10,
    IX: 15,
    X: 10,
    XI: 24,
    XII: 25
}

function get_sec_list(n) {
    const alph = "abcdefghijklmnopqrstuvwxyz".split("")
    let sec_list = []
    for (let i = 0; i < n; i++) {
        sec_list.push(alph[i].toUpperCase())
    }
    return sec_list
}

// Dependent section dropdown on selected class

class_sel.addEventListener("change", event => {
    sec_sel.innerHTML = `<option key="" selected>Select a section</option>`
    if (event.target.value) {
        // console.log(1)
        sec_sel.disabled = false
        let foo = get_sec_list(sec_num[event.target.value])
        for (let i = 0; i < foo.length; i++) {
            let sec = document.createElement("option")
            // console.log(foo[i].toUpperCase())
            sec.innerHTML = `<option key="${foo[i]}">${foo[i]}</option>`
            sec_sel.appendChild(sec)
        }
    } else {
        sec_sel.disabled = true
        sec_sel.innerHTML = `<option key="" selected>Select a section</option>`
    }
})


// Validation
function validate(name, email, clss, sec) {
    const rkpRegex = /^[r|e|v]\d{4,8}.+@dpsrkp.net$/
    const isValidName = (name != "")
    const isValidMail = rkpRegex.test(email)
    const isValidClass = Object.keys(sec_num).includes(clss)
    const isValidSec = get_sec_list(sec_num[clss]).includes(sec)
    let validated = isValidMail && isValidName && isValidClass && isValidSec
    if (!isValidMail) {
        alert("Please enter your valid student email-id")
    }
    if (!isValidName) {
        alert("Name cannot be empty. Please try again.")
    }
    if (!isValidClass) {
        alert("Invalid Class. Please try again.")
    }
    if (!isValidSec) {
        alert("Invalid Secion. Please try again.")
    }
    if (validated) {
        alert(`Hello, ${name} <${email}> from ${class_sel.value}-${sec_sel.value}.`)
    }
    // console.log(isValidName, isValidMail)
}

function submit_form(event) {
    event.preventDefault()
    validate(name_inp.value, email_inp.value, class_sel.value, sec_sel.value)
}

form.addEventListener("submit", submit_form)
