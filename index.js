
function verifir_id_token(idToken){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.line.me/oauth2/v2.1/verify", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        var data = this.response;
        //document.write(data);
        const obj = JSON.parse(data);
        //document.write(obj['sub']);
        const lineID_text = document.getElementById('lineID_text');
        lineID_text.innerHTML = obj['sub'];
    };
    xhr.send("id_token=" + idToken + "&client_id=2002036154");
}

function verifir_access_token(accessToken){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.line.me/oauth2/v2.1/verify?access_token=" + accessToken, true);
    xhr.send();
    xhr.onload = function () {
        if (this.status == 200){
            get_profile(accessToken);
        }else{
            document.write("failed");
        }
    };
}

function get_profile(accessToken){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.line.me/oauth2/v2.1/userinfo", true);
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    //xhr2.withCredentials = true;
    xhr.send();
    xhr.onload = function () {
        var data = this.response;
        //document.write(data);
        const obj = JSON.parse(data);
        //document.write(obj["sub"]);
        const lineID_text = document.getElementById('lineID_text');
        lineID_text.innerHTML = obj['sub'];
    }
}