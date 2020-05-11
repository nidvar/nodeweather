const div = document.getElementById('result')
const the_whole_app = (location)=>{
    fetch('http://localhost:3000/weather?address='+location)
    .then(a=>{
        return a.json()
    })
    .then(a=>{
        console.log(a)
        if(a.location=='fail'){
            const p = document.createElement('p');
            p.innerHTML = `Fail`
            div.appendChild(p);
            return
        }
        const p = document.createElement('p');
        p.innerHTML = `<br />Country: ${a.country}<br />Region: ${a.region}<br />Specific location chosen:${a.name}`
        div.appendChild(p);
    })
    .catch(a=>{
        return a
    })
}

const my_form = document.getElementById('myform')
const user_input = document.getElementById('userinput');

my_form.addEventListener('submit',(e)=>{
    div.innerHTML = ''
    e.preventDefault()
    the_whole_app(user_input.value)
    user_input.value = ''
})