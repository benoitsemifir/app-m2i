const users = []

const deleteUser = event => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', '*')

    fetch('https://192.168.99.107:5000/api/users/' + event.target.id, {
        method: "DELETE",
        headers: myHeaders
    }).then(() => {
        window.location.reload()
    })
}

const renderUsers = () => {
    const list = document.querySelector('#userList')
    for (user of users) {
        const li = document.createElement('li')
        const data = document.createTextNode(`Login : ${user.login}  Email: ${user.email}`)
        const button = document.createElement('button')
        button.setAttribute("id", user.id.toString())
        button.addEventListener('click', deleteUser)
        button.innerHTML = "Supprimer"
        li.appendChild(data)
        li.appendChild(button)
        list.appendChild(li)
    }
}

const getUsers = () => {
    fetch('https://192.168.99.107:5000/api/users').then(resp => resp.json()).then(users2 => {
        for (user of users2) {
            users.push(JSON.parse(user))
        }
        renderUsers()
    })
}

if (checkCookie()) {
    getUsers();
}
else {
    document.getElementById("message").innerHTML = "Connectez-vous pour accéder à cette page!"
}