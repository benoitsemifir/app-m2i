const login = (event) => {
    event.preventDefault()
    const loginInfo = {}
    const form = event.target
    for (input of form) {
        if (input.id !== "") {
            loginInfo[input.id] = input.value
        }
    }
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', '*')

    fetch('https://192.168.99.107:5000/api/users/' + loginInfo.login, {
        method: "GET",
        headers: myHeaders
    }).then(resp => resp.json()).then(users => {
        if (users[0] != undefined) {
            if (verif_hash(loginInfo.login, hashage(loginInfo.password), JSON.parse(users[0]))) {
                alert("Vous êtes connecté !")
                setCookie("username", loginInfo.login, 1)
                setCookie("password", hashage(loginInfo.password), 1)
            } else {
                alert("Problème Login/Mot de passe.")
            }
        }else{
            alert("Ce login n'existe pas. Veuillez vous enregistrer.")
        }
    })
}

document.querySelector('#loginForm').addEventListener('submit', login)

const verif_hash = (login, password, user) => {
    return (login == user.login && password == user.password)
}