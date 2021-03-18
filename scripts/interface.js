let body = document.querySelector("body");
let name = document.querySelector("#name");
let n1 = document.querySelector("#n1");
let n2 = document.querySelector("#n2");
let adv = document.querySelector("#adv");
let aviso = document.querySelector("#aviso");
let failedSuccess = document.querySelector("#failedSuccess");
let table = document.querySelector("table");
table.innerHTML = "<th>Nome</th>    <th>Nota 1</th>    <th>Nota 2</th>     <th>Advertências</th>";


//Objeto com as propriedades do aluno
let aluno = {
    nome: null,
    notas: {},
    advertencias: [],
    id: parseInt(Math.random() * 20000)
};

//Colocando os dados do aluno // Regras dos inputs // Chamando a função addAlunos();
function createObjAluno() {


    //Verificando se não há conteúdo nos inputs, com excessão da advertência
    if (name.value != "" && n1.value != "" && n2.value != "") {


        //Verificando valor das notas. Entre 0 e 10
        if (n1.value < 11 && n2.value < 11) {


            //Alterando os dados do objeto aluno
            aluno.nome = name.value;
            aluno.notas = { nota1: parseFloat(n1.value), nota2: parseFloat(n2.value) };
            aluno.advertencias.push(adv.value);
            console.log(aluno.advertencias)


            //Adicionando o aluno com os dados inseridos
            addAlunos(aluno);


            //Após adicionar ao DB resetamos os valores de aluno
            aluno = {
                nome: null,
                notas: {},
                advertencias: [],
                id: parseInt(Math.random() * 20000)
            };


            //Aviso de sucesso
            warning("green", "flex", "O aluno foi criado no banco de dados")

        }
    } else {


        //Timer para o alert de falha 
        warning("red", "none", "O aluno não foi criado no banco de dados")
        // setTimeout(() => {
        //     alert("Por favor insira todos os dados");
        // }, 200)


        //Aviso de falha
    }
}


//Cria a tabela
function createTable(alunodeAlunos) {
    let { nome, notas, advertencias, id } = alunodeAlunos
    //Montando o corpo da tabela
    table.innerHTML += `<tr>
    <td data-id="${id}">${nome}</td>
    <td>${notas.nota1}</td>
    <td>${notas.nota2}</td>
    <td>${advertencias}<button class="delete">x</button></td>
    </tr>`

    let deleteThis = document.querySelectorAll(".delete");
    for (let i = 0; i < deleteThis.length; i++) {
        deleteThis[i].addEventListener("click", deleteThisElement);
    }
}

//Limpa a tabela
function cleanTable() {
    table.innerHTML = "<th>Nome</th>    <th>Nota 1</th>    <th>Nota 2</th>     <th>Advertências</th>";
}

//Aviso
function warning(color, display, text) {
    failedSuccess.style.color = color;
    failedSuccess.innerText = text;

    if (failedSuccess.style.display == "none") {
        failedSuccess.style.display = "flex";
    } else {
        setTimeout(() => {
            failedSuccess.style.display = display
        }, 5000)
    }
}

//Limitando os numeros digitados no inputNumber
function limitLength() {
    if (this.value.length > 2) {
        this.value = this.value.slice(0, 2);
    }
    if (this.value > 10) {
        aviso.innerText = "Por favor insira um valor menor que 10"
    } else {
        aviso.innerText = ""
    }
}
n1.oninput = limitLength;
n2.oninput = limitLength;

