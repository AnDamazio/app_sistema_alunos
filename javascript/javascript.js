class Aluno {
    constructor(ra, nome, b1, b2, b3, b4, media){
        this.ra = ra
        this.nome = nome
        this.b1 = b1
        this.b2 = b2
        this.b3 = b3
        this.b4 = b4
        this.media = media
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
    
}

class Bd {
    constructor() {
        //Define nome da chave no banco
        let id = localStorage.getItem('id')
 
        //"Seta" um valor inicial caso esteja vazio
        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

        //Recupera o id anterior e soma mais um, para não haver repetição
    getProximoId() {
        let getProximoId = localStorage.getItem('id')
        return parseInt(getProximoId) + 1
    }

    gravar(d) {
        //recebe o próximo id (retorno da getProximoId)
        let id = this.getProximoId()

        //
        localStorage.setItem(id, JSON.stringify(d)) //<- Transforma o objeto em string
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        //array de alunos
        let alunos = Array()

        let id = localStorage.getItem('id')

        //recuperar todos os alunos cadastrados em localStorage
        for(let i = 1; i <= id; i++) {

            //recuperar o aluno
            let aluno = JSON.parse(localStorage.getItem(i))

            //Caso tenha um id nulo
            if(i === null) {
                continue
            }
            alunos.push(aluno)

        }
        return alunos
    }
}

let bd = new Bd()


function criarAluno() {
    /*Recebe os valores dos formulários
     pelo id e salva em uma variável*/
    let ra = document.getElementById('ra')
    let nome = document.getElementById('nome')
    let b1 = document.getElementById('b1')
    let b2 = document.getElementById('b2')
    let b3 = document.getElementById('b3')
    let b4 = document.getElementById('b4')
    let media = (eval(b4.value) + eval(b3.value) + eval(b2.value) + eval(b1.value)) /4

    //Cria/sobrepõe o objeto com as variáveis recebidas
    let aluno = new Aluno(
        ra.value,
        nome.value,
        b1.value,
        b2.value,
        b3.value,
        b4.value,
        media
    )

    if(aluno.validarDados()) {
        bd.gravar(aluno)
    }else {
        alert('Campos inválidos ou incompletos')
    }

}

function carregaListaAlunos() {

    let alunos = Array()
    
    alunos = bd.recuperarTodosRegistros()

    var listaCorpo = document.getElementById('listaCorpo')

    alunos.forEach(function(d) {
        console.log(d)
    
        //Criando a linha(tr)
        let linha = listaCorpo.insertRow()
    
        //Criar as colunas(td)
        linha.insertCell(0).innerHTML = d.ra
        linha.insertCell(1).innerHTML = d.nome
        linha.insertCell(2).innerHTML = d.b1
        linha.insertCell(3).innerHTML = d.b2
        linha.insertCell(4).innerHTML = d.b3
        linha.insertCell(5).innerHTML = d.b4
        linha.insertCell(6).innerHTML = d.media
    
    })

    
}



/*
<tr>
    <td scope="col" id="ralista">#</td>
    <td scope="col" id="nomelista">#</td>
    <td scope="col" id="b1lista">#</td>
    <th scope="col" id="b2lista">#</th>
    <td scope="col" id="b3lista">#</td>
    <td scope="col" id="b4lista">#</td>
    <td scope="col" id="medialista">#</td>
</tr>
*/


