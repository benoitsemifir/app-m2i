const submit = (event) => {
    event.preventDefault()
    const user = {}
    const form = event.target
    for (input of form) {
        if (input.id == "password") {
            const hashed = hashage(input.value);
            user[input.id] = hashed
        }
        else if (input.id !== "") {
            user[input.id] = input.value
        }
    }

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', '*')

    fetch('https://192.168.99.107:5000/api/users/', {
        method: "GET",
    }).then(resp => resp.json()).then(users => {
        if (verif_user(user, users)) {
            fetch('https://192.168.99.107:5000/api/users/', {
                method: "POST",
                body: JSON.stringify(user),
                headers: myHeaders
            }).then(resp => resp.json()).then(user => {
                console.log(user)
                window.alert("Utilisateur enregisté !")
            })
        }
    })
}

document.querySelector('#registerForm').addEventListener('submit', submit)


//Fonction verif user :
const verif_user = (user, users) => {
    if (users.length == 0) {
        return true
    } else {
        for (u of users) {
            u = JSON.parse(u)
            if (u.login == user.login) {
                alert("Login : " + user.login + " déjà utilisé.")
                return false
            }
        }
        return true
    }
}
