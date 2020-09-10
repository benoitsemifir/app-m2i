const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function checkCookie() {
    var username = getCookie("username");
    var password = getCookie("password");
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', '*')

    await fetch('https://192.168.99.107:5000/api/users/' + username, {
        method: "GET",
        headers: myHeaders
    }).then(resp => resp.json()).then(users => {
        u = JSON.parse(users[0])
        if (password == u.password) {
            return true
        } else {
            return false
        }
    })
}

const getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}