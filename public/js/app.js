
const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

form.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent  = "Loading..."
    messageTwo.textContent = ""
    console.log(location)
    fetch("/weather?address=" + location).then((response) => {

        response.json().then((data) =>{
            
            if(data.error)
                messageOne.textContent = data.error
            else
                {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                console.log(data)
            }
        })
    
    })

    console.log('testing!')
})