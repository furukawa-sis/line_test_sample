function line_connect(){
    liff.init({
    liffId: '2002036154-XaAJJnLO', // Use own liffId
    })
    .then(() => {
        // start to use LIFF's api
        const idToken = liff.getIDToken();
        const accessToken = liff.getAccessToken();

        // const idToken_text = document.getElementById('idToken_text');
        // idToken_text.innerHTML = idToken;
        // const accessToken_text = document.getElementById('accessToken_text');
        // accessToken_text.innerHTML = accessToken;

        const message_text = document.getElementById('message');
        message_text.innerHTML = "ID連携画面へ遷移しました";

        // openWindow call
        liff.openWindow({
          url: 'https://furukawa-sis.github.io/line_test_sample/out.html?idToken=' + idToken + '&accessToken=' + accessToken,
          external: true,
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

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