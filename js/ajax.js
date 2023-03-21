let input = document.querySelector('input[name=github_user]');
let button = document.querySelector('#btn_send');
let div = document.querySelector('.app');

button.addEventListener('click', () => {
    div.innerHTML = '';

    let ajax = new XMLHttpRequest();

    ajax.open('GET', `https://api.github.com/users/${input.value}`);

    ajax.send(null);

    ajax.onreadystatechange = () => {

        let spanName = document.createElement('span');

        let txtName = '';

        if(ajax.readyState == 4)
        {
            if(ajax.status == 200)
            {
                user = JSON.parse(ajax.responseText);

                txtName = document.createTextNode(user['name']);

                spanName.appendChild(txtName);

                let imgUser = document.createElement('img');
                imgUser.setAttribute('src', user['avatar_url']);
                imgUser.setAttribute('alt', user['name']);
                imgUser.width = '150';
                imgUser.height = '150';

                div.appendChild(imgUser);
                div.appendChild(spanName);
            }
            else
            {
                txtName = document.createTextNode(`Não foi possível encontrar um usuário com o nome: ${input.value}`);
                spanName.appendChild(txtName);
                div.appendChild(spanName);
            }

            input.value = '';
        }

    };
});