class Livro {
  constructor(nome, categoria, descricao) {
    this.nome = nome;
    this.categoria = categoria;
    this.descricao = descricao;
    this.id = Date.now(); // ID único baseado na data/hora
  }
}

// Lista onde os livros cadastrados serão armazenados
let livros = [];

// Captura os elementos do HTML
const form = document.getElementById('productForm');
const LivroList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');

// Cria o elemento <li> para exibir o livro na tela
const criarElementoLivro = (livro) => {
  const li = document.createElement('li');
  li.className = 'product-item';
  li.innerHTML = `
    <h3>${livro.nome}</h3>
    <p><strong>Categoria:</strong> ${livro.categoria}</p>
    <p>${livro.descricao}</p>
    <button class="remove-btn" onclick="removerLivro(${livro.id})">Remover</button>
  `;
  return li;
};

// Mostra os livros na tela
function renderLivro(lista) {
  LivroList.innerHTML = '';

  if (lista.length === 0) {
    LivroList.innerHTML = '<li>Nenhum livro encontrado.</li>';
    return;
  }

  lista.forEach(livro => {
    const elemento = criarElementoLivro(livro);
    LivroList.appendChild(elemento);
  });
}

// Executa ao enviar o formulário de cadastro
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('name').value.trim();
  const categoria = document.getElementById('category').value.trim();
  const descricao = document.getElementById('description').value.trim();

  // Verifica se os campos estão preenchidos corretamente
  if (!nome || !categoria || !descricao) {
    alert('Preencha todos os campos!');
    return;
  } else if (nome.length < 3) {
    alert('O nome do livro deve ter pelo menos 3 caracteres.');
    return;
  }

  // Cria um novo livro e adiciona à lista
  const novoLivro = new Livro(nome, categoria, descricao);
  livros.push(novoLivro);

  form.reset(); // Limpa o formulário
  renderLivro(livros); // Atualiza a lista na tela
});

// Remove o livro com base no ID
function removerLivro(id) {
  livros = livros.filter(livro => livro.id !== id);
  renderLivro(livros);
}

// Filtra os livros com base no texto digitado na busca
searchInput.addEventListener('input', () => {
  const termo = searchInput.value.toLowerCase();

  switch (termo.length) {
    case 0:
      renderLivro(livros); // Se não digitou nada, mostra todos
      break;
    default:
      const resultados = livros.filter(livro =>
        livro.nome.toLowerCase().includes(termo) ||
        livro.categoria.toLowerCase().includes(termo)
      );
      renderLivro(resultados); // Mostra apenas os que correspondem à busca
      break;
  }
});

// Mostra no console os livros cadastrados (caso existam)
let i = 0;
while (i < livros.length) {
  console.log(`Livro ${i + 1}: ${livros[i].nome}`);
  i++;
}

// Exibe os livros ao carregar a página
renderLivro(livros);
