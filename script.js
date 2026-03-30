// Quando a página terminar de carregar,
// executa a função loadTasks para recuperar tarefas salvas
document.addEventListener("DOMContentLoaded", loadTasks);

// Função chamada ao clicar no botão "Adicionar"
function addTask() {
  // Pega o campo de input
  const input = document.getElementById("taskInput");

  // Pega o texto digitado
  const taskText = input.value;

  // Se estiver vazio, não faz nada
  if (taskText === "") return;

  // Cria o elemento da tarefa na tela (não concluída inicialmente)
  createTaskElement(taskText, false);

  // Salva todas as tarefas no navegador
  saveTasks();

  // Limpa o campo de input
  input.value = "";
}

// Função responsável por criar cada item da lista
function createTaskElement(text, completed) {
  // Cria o <li> (item da lista)
  const li = document.createElement("li");

  // Cria um <span> para o texto da tarefa
  const span = document.createElement("span");
  span.textContent = text;

  // Se a tarefa estiver marcada como concluída,
  // adiciona a classe "completed" (usada no CSS)
  if (completed) {
    li.classList.add("completed");
  }

  // Evento de clique no texto da tarefa
  // Alterna entre concluída e não concluída
  span.onclick = function () {
    li.classList.toggle("completed");

    // Atualiza o armazenamento sempre que muda
    saveTasks();
  };

  // Cria botão de excluir
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";

  // Adiciona classe para estilização no CSS
  deleteBtn.classList.add("delete-btn");

  // Evento de clique para remover a tarefa
  deleteBtn.onclick = function () {
    li.remove(); // Remove da tela

    // Atualiza o armazenamento
    saveTasks();
  };

  // Adiciona o texto e o botão dentro do <li>
  li.appendChild(span);
  li.appendChild(deleteBtn);

  // Adiciona o <li> na lista (<ul>)
  document.getElementById("taskList").appendChild(li);
}

// Função para salvar tarefas no navegador
function saveTasks() {
  // Cria um array vazio
  const tasks = [];

  // Percorre todos os <li> dentro da lista
  document.querySelectorAll("#taskList li").forEach(li => {
    
    // Para cada tarefa, salva:
    tasks.push({
      text: li.querySelector("span").textContent, // texto
      completed: li.classList.contains("completed") // se está concluída
    });
  });

  // Converte o array em string (JSON)
  // e salva no localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar tarefas salvas
function loadTasks() {
  // Pega as tarefas do localStorage
  // Se não existir nada, usa array vazio
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Para cada tarefa salva, recria na tela
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}