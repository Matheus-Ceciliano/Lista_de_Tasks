let listElement = document.querySelector("#tbody_task");
let inputElement = document.querySelector("#input_task");
let inputData = document.querySelector("#input_data");
let buttonElemente = document.querySelector("#button_task");
let bnt = document.getElementById("botaoexcluir");
const status = document.getElementById("status");



let tarefas = JSON.parse(localStorage.getItem("@listaTask")) || [];



function renderTask() {
    listElement.innerHTML = "";




    tarefas.forEach((tasks, index) => {

        const status = calcularStatus(tasks.data);

        const tr = document.createElement("tr");

        const tdNome = document.createElement("td");
        tdNome.textContent = tasks.task;

        const tdData = document.createElement("td");
        tdData.textContent = tasks.data;



        const tdStatus = document.createElement("td");
        tdStatus.textContent = status;

        const tdAcoes = document.createElement("td");

        const button = document.createElement("button");
        button.className = "btn_delete";
        button.innerHTML = `<i class="fa-solid fa-trash"></i>`;


        button.addEventListener("click", () => {
            let resposta = confirm("Deseja realmente apagar?")

            if (resposta === true) {
                tarefas.splice(index, 1);
                renderTask();
                salvardados();
            }
        });

        const [ano, mes, dia] = tasks.data.split("-");
        const dataLocal = new Date(ano, mes - 1, dia);
        const dataBR = dataLocal.toLocaleDateString("pt-BR");

        if (tasks.data == "") {
            tdData.textContent = "Sem Prazo definido";
        }
        else { tdData.textContent = dataBR; }
        tdAcoes.appendChild(button);


        tr.appendChild(tdNome);
        tr.appendChild(tdData);
        tr.appendChild(tdStatus);
        tr.appendChild(tdAcoes);

        listElement.appendChild(tr);

    });
    calcularStatus();



}
renderTask();

function addTask() {

    if (inputElement.value == "") {
        alert("Digite alguma tarefa");
        return false
    }

    else {
        let novaTarefa = inputElement.value;
        let data_tarefa = inputData.value;



        tarefas.push({
            task: novaTarefa,
            data: data_tarefa,


        });

        inputElement.value = "";
        inputData.value = "";

    }

    renderTask();
    salvardados();
}

function salvardados() {
    localStorage.setItem("@listaTask", JSON.stringify(tarefas));
}


function calcularStatus(data_tarefa) {

    if (!data_tarefa) {
        return "Sem data limite";
    }

    const dataAtual = new Date();
    const dataObj = new Date(data_tarefa);

    dataAtual.setHours(0, 0, 0, 0);
    dataObj.setHours(0, 0, 0, 0);

    const diffDias = Math.floor((dataObj - dataAtual) / (1000 * 60 * 60 * 24)) + 1;


    if (diffDias > 1) {
        return `Prazo de ${diffDias} dias`;
    }
    else if (diffDias === 1) {
        return "Prazo de 1 dia";
    }
    else if (diffDias === 0) {
        return "Hoje é o último dia";
    }
    else if (diffDias === -1) {
        return "Atraso de 1 dia";
    }
    else {
        return `Atraso de ${Math.abs(diffDias)} dias`;
    }
}



