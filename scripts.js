let lista = [];

function listarAlunos()
{   
    fetch("https://641b8d989b82ded29d5436ce.mockapi.io/api/v1/alunos")
    .then(res => res.json())
    .then(alunos => {
        lista = alunos; 
        if(lista.length > 0){
            let tabela = document.querySelector("#tabela");
    tabela.innerHTML = "";
    for(let i = 0; i < lista.length; i++){
        tabela.innerHTML += `<tr>
                                <td>${lista[i].nome}</td>
                                <td>${lista[i].email}</td>
                                <td>${lista[i].telefone}</td>
                                <td>${lista[i].cidade}</td>
                                <td>
                                    <button 
                                        class="btn btn-warning" 
                                        type="button"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRightEditar"
                                        aria-controls="offcanvasRightEditar"
                                        onclick="preencherForm(${lista[i].id})">Editar</button>
                                    <button 
                                        class="btn btn-danger"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal"
                                        onclick="setarAluno(${lista[i].id})">Deletar</button>
                                </td>
                            </tr>`;
    };
            return;
        }else{
            tabela.innerHTML = "";
            tabela.innerHTML += `<tr><td colspan=5 style="text-align: center;">Nenhum aluno cadastrado</td></tr>`
        }
    });
} listarAlunos();

function adicionarAluno()
{
    event.preventDefault();
    let aluno = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        cidade: cidade.value
    }
    fetch("https://641b8d989b82ded29d5436ce.mockapi.io/api/v1/alunos",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(aluno)
    })
    .then(res => res.json())
    .then(resposta => {
    cadastro.reset();
    document.querySelector(".offcanvas").classList.remove("show");
    document.querySelector(".offcanvas-backdrop").classList.remove("show");
    mostrarAlerta("Aluno cadastrado com sucesso");
    listarAlunos();
    })
}

function preencherForm(id){
    let aluno = {}
    lista.forEach(function(cada){
        if(cada.id == id){
            aluno = cada;
        }
    });
    e_id.value = id;
    e_nome.value = aluno.nome;
    e_email.value = aluno.email;
    e_telefone.value = aluno.telefone;
    e_cidade.value = aluno.cidade;
}

function editarAluno(){
    event.preventDefault();
    let posicao = e_id.value;
    let aluno = {
        nome: e_nome.value,
        email: e_email.value,
        telefone: e_telefone.value,
        cidade: e_cidade.value
    }

    fetch(`https://641b8d989b82ded29d5436ce.mockapi.io/api/v1/alunos/${posicao}`,{
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(aluno)
    })
    .then(res => res.json())
    .then(resposta => {
        editar.reset();
        document.querySelectorAll(".offcanvas")[1].classList.remove("show");
        document.querySelector(".offcanvas-backdrop").classList.remove("show");
        listarAlunos();
        mostrarAlerta("Aluno atualizado com sucesso");
    })

   
}

function deletarAluno(){
    let posicao = confirmar.getAttribute("aluno-id");
    fetch(`https://641b8d989b82ded29d5436ce.mockapi.io/api/v1/alunos/${posicao}`,{method: "DELETE"})
    .then(res => res.json())
    .then(resposta => {
        listarAlunos();
        mostrarAlerta(`Aluno de id ${posicao} deletado com sucesso.`);
    })
}

function setarAluno(id){
    confirmar.setAttribute("aluno-id", id);
}

function mostrarAlerta(mensagem){
    let alerta = document.querySelector("#alerta");
    let msg = document.querySelector(".toast-body");

    msg.innerHTML = mensagem;
    alerta.classList.add("show");

    setTimeout(function(){
        alerta.classList.remove("show");
    }, 5000)
}