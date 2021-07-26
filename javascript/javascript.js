class Aluno {
    constructor(ra, nome, b1, b2, b3, b4, media) {
       this.ra = ra,
       this.nome = nome,
       this.b1 = b1,
       this.b2 = b2,
       this.b3 = b3,
       this.b4 = b4,
       this.media = media
    }
}

class Bd {
    constructor() {
        this.id = localStorage.getItem('id')
        if(this.id == null || this.id == undefined || this.id == "") {
            this.id = localStorage.setItem('id', 0)
        }
    }

    getProximoId() {    
        let ProximoId = localStorage.getItem('id')
        return parseInt(ProximoId) + 1
    }
    
    gravar(aluno) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(aluno))
        localStorage.setItem('id', id)
    }

    recuperarAlunos() {

        let id = localStorage.getItem('id')
        let alunos = []

        for(let x = 1; x <= id; x++) {
            let aluno = JSON.parse(localStorage.getItem(x))
            alunos.push(aluno)
            console.log(alunos)
        }
        return alunos
    }

}

let bd = new Bd()

function criarAluno() {

    let ra =  document.getElementById('ra')
    let nome = document.getElementById('nome')
    let b1 = document.getElementById('b1')
    let b2 = document.getElementById('b2')
    let b3 =  document.getElementById('b3')
    let b4 = document.getElementById('b4')  
    let media = (eval(b1.value) + eval(b2.value) + eval(b3.value) + eval(b4.value)) / 4

    if(validarDados()) {
        let aluno = new Aluno(
            this.ra = ra.value,
            this.nome = nome.value,
            this.b1 = b1.value,
            this.b2 = b2.value,
            this.b3 = b3.value,
            this.b4 = b4.value,
            this.media = media
        )
        
        bd.gravar(aluno)
        limparCampos()
    }else {
        alert('Há campos não preenchidos')
    }
}

function validarDados() {

    if(document.getElementById('ra').value != ""
    && document.getElementById('nome').value != ""
    && document.getElementById('b1').value != ""
    && document.getElementById('b2').value != ""
    && document.getElementById('b3').value != ""
    && document.getElementById('b4').value != "") {
        return true
    }else {
        return false
    }
}

function carregarAlunos() {
   let id = localStorage.getItem('id')


   let alunos = bd.recuperarAlunos()


   let table = document.getElementById('tbody')
   
    
   for(let x = 0; x < id; x++ ) {
    let row = table.insertRow(0)
    var cell0 = row.insertCell(0).innerHTML = alunos[x].ra
    var cell1 = row.insertCell(1).innerHTML = alunos[x].nome
    var cell2 = row.insertCell(2).innerHTML = alunos[x].b1
    var cell3 = row.insertCell(3).innerHTML = alunos[x].b2
    var cell4 = row.insertCell(4).innerHTML = alunos[x].b3
    var cell5 = row.insertCell(5).innerHTML = alunos[x].b4
    var cell6 = row.insertCell(6).innerHTML = alunos[x].media
   }
}

function limparCampos() {
    document.getElementById('ra').value = ""
    document.getElementById('nome').value = ""
    document.getElementById('b1').value = ""
    document.getElementById('b2').value = ""
    document.getElementById('b3').value = ""
    document.getElementById('b4').value = ""
}

function filtrarAlunos() {
    let id = localStorage.getItem('id')
    let alunosFiltrados = bd.recuperarAlunos()

    if(document.getElementById('nome').value != "") {
        let nome = document.getElementById('nome').value
        alunosFiltrados = alunosFiltrados.filter(d => d.nome == nome)
    }


    if(document.getElementById('media').value != "") {
        let media = document.getElementById('media').value
        alunosFiltrados = alunosFiltrados.filter(d => d.media == media)
    }

    if(document.getElementById('ra').value != "") {
        let ra = document.getElementById('ra').value
        alunosFiltrados = alunosFiltrados.filter(d => d.ra == ra)
    }
       // return alunosFiltrados
 
    let table = document.getElementById('tbody')
    table.innerHTML = ""
    
    for(let x = 0; x < alunosFiltrados.length; x++ ) {
    
        let row = table.insertRow(0)
        var cell0 = row.insertCell(0).innerHTML = alunosFiltrados[x].ra
        var cell1 = row.insertCell(1).innerHTML = alunosFiltrados[x].nome
        var cell2 = row.insertCell(2).innerHTML = alunosFiltrados[x].b1
        var cell3 = row.insertCell(3).innerHTML = alunosFiltrados[x].b2
        var cell4 = row.insertCell(4).innerHTML = alunosFiltrados[x].b3
        var cell5 = row.insertCell(5).innerHTML = alunosFiltrados[x].b4
        var cell6 = row.insertCell(6).innerHTML = alunosFiltrados[x].media
     
    }
}
