// Fonction de hash
const hashage = (password) => {
    var hash = 0;
    if (password.length == 0) {
        return hash;
    }
    for (var i = 0; i < password.length; i++) {
        var char = password.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}