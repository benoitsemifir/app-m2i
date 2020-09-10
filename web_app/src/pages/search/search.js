class SearchUser {
    constructor(lastname, firstname, birth) {
        this.lastname = lastname
        this.firstname = firstname
        this.birth = birth
    }
}

const renderUsers = (response) => {
    data = response.map(user => JSON.parse(user))
    users = data.map(user => new SearchUser(user.lastname, user.firstname, user.birth))
    const table = document.querySelector('#userTable')
    if (table.rows.length > 1) {
        for (let i = 1; i < table.rows.length; i++) {
            table.deleteRow(i)
        }
    }

    for (user of users) {
        const tr = table.insertRow()
        for (key in user) {
            let cell = tr.insertCell()
            cell.innerHTML = user[key]
        }
    }

}

const allUsers = async () => {
    response = await (await fetch('https://192.168.99.107:5000/api/users/')).json()
    renderUsers(response)
}

const searchUser = async () => {
    const user = document.querySelector("#searchInput").value
    if (user === "") {
        allUsers()
    }
    else {
        response = await (await fetch(`https://192.168.99.107:5000/api/users/${user}`)).json()
        renderUsers(response)
    }
}



document.querySelector("#searchButton").addEventListener('click', searchUser)
searchUser()