// Used: https://numbers-api.vercel.app/
// Learnt about promises and asynchrous js events...


const num_inp = document.querySelector("input#number");
const submit_btn = document.querySelector("button[type='submit']")

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault()
    // basic validation 
    if (document.querySelector("input#number").value === "") {
        alert("Please enter a valid number first.")
        return
    }
    async function get_fact() {
        const res = await (
            await fetch(`https://numbers-api.vercel.app/${num_inp.value}`)
        ).text()
        // console.log(res)
        document.querySelector("textarea#fact").value = res
    }

    // Handle errors and succesfull requests
    get_fact()
        .then(() => {
            submit_btn.disabled = false
            num_inp.value = ""
        })
        .catch(event => {
            console.error(e)
            alert("Error!")
            submit_btn.disabled = false
        })
    return

})