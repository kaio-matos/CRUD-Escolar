// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCA_fpG7PtqwwSExISmizBkkfoPlmK1vnk",
    authDomain: "escola-6cff8.firebaseapp.com",
    projectId: "escola-6cff8",
    storageBucket: "escola-6cff8.appspot.com",
    messagingSenderId: "119693968837",
    appId: "1:119693968837:web:52ad316dafe03172be77ac",
    measurementId: "G-K3160Y5SWX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const TURMA = "Turma 1B";
var dbTURMA = db.collection(TURMA);

function addAlunos(aluno) {
    dbTURMA.add(aluno)
        .then((doc) => { })
        .catch(error => { console.log(error) })

}

dbTURMA.onSnapshot((snapshot => {
    //Limpa a tabela ao adicionar um novo aluno
    cleanTable()
    snapshot.forEach((doc) => {
        let alunodeAlunos = doc.data();
        createTable(alunodeAlunos)
    })
}))

function deleteThisElement() {
    //Capturando o nome do usuário
    let td = this.parentElement;
    let tr = td.parentElement;
    let nameTdId = parseInt(tr.children[0].dataset.id);

    dbTURMA.where("id", "==", nameTdId).get()
        .then((doc) => {
            doc.forEach((elm) => {
                dbTURMA.doc(elm.id).delete()
                    .then(() => {
                        warning("green", "none", "O usuário foi apagado com sucesso!")
                    })
                    .catch((error) => {
                        warning("red", `O usuário não foi apagado ${error}`)
                    })
            })
        })

}