let input = document.querySelector('input[name=github_user]');
let button = document.querySelector('#btn_send');
let div = document.querySelector('.app');

let promise = () => {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
    
        ajax.open('GET', `https://api.github.com/users/${input.value}`);
    
        ajax.send(null);
    
        ajax.onreadystatechange = () => {
    
            if(ajax.readyState == 4)
            {
                if(ajax.status == 200)
                {
                    resolve(JSON.parse(ajax.responseText));
                }
                else
                {
                    reject(`Não foi possível encontrar um usuário com o nome: ${input.value}`);
                }
    
                input.value = '';
            }
    
        };
    });
};

button.addEventListener('click', () => {

    div.innerHTML = '';

    let spanName = document.createElement('span');

    let txtName = '';

    promise()
    .then((user) => {
        txtName = document.createTextNode(user['name']);

        spanName.appendChild(txtName);

        let imgUser = document.createElement('img');
        imgUser.setAttribute('src', user['avatar_url']);
        imgUser.setAttribute('alt', user['name']);
        imgUser.width = '150';
        imgUser.height = '150';

        div.appendChild(imgUser);
        div.appendChild(spanName);
    })
    .catch((error) => {
        txtName = document.createTextNode(error);
        spanName.appendChild(txtName);
        div.appendChild(spanName);
    });

    input.value = '';
});