window.scroll({
  top: 0,
  behavior: "smooth",
});

// Variáveis de controle de paginação
let paginaAtual = 1;

// tanto de protudos na pagina
const produtosPorPagina = 8; // Altere o valor conforme necessário

// evento de enter realizar a pesquisa
const inputPesquisa = document.getElementById("input-pesquisa");

// evento de pesquisa clicando no botao
const botaoPesquisa = document.getElementById("botao-pesquisa");

// Carrinho de compras
const carrinho = [];

// Adiciona um evento change ao select do carrinho
const removerCarrinho = document.getElementById("remover-carrinho");

let termoPesquisaGlobal = ""; // Variável global para armazenar o termo de pesquisa

// função de pesquisa
function pesquisarProdutos(pesquisado) {
  const termoPesquisado = pesquisado ? termoPesquisaGlobal : document.getElementById("input-pesquisa").value.trim().replace(/\s+/g, " ");

  let contador = 1;

  const containerProdutos = document.getElementById("container-produtos");
  const navPagina = document.getElementById("nav-pagina");

  const produtos = JSON.parse(localStorage.getItem("produtos"));

  const produtosFiltrados =
    termoPesquisado === "" ? produtos : produtos.filter((produto) => produto.nome.toLowerCase().includes(termoPesquisado.toLowerCase()));

  const indiceInicial = (paginaAtual - 1) * produtosPorPagina;
  const indiceFinal = indiceInicial + produtosPorPagina;

  const produtosPaginaAtual = produtosFiltrados.slice(indiceInicial, indiceFinal);

  if (termoPesquisado) {
    termoPesquisaGlobal = termoPesquisado;
    paginaAtual = 1; // Redefine a página atual para a primeira página ao trocar a categoria
  }

  containerProdutos.innerHTML = "";

  if (termoPesquisado === "") {
    exibirPopup("Insira algo para pesquisar!", false);
    colocandoProdutoNaPage();
  } else if (!produtosFiltrados || produtosFiltrados.length === 0) {
    exibirPopup("Nenhum produto encontrado!", false);
    colocandoProdutoNaPage();
  } else {
    produtosPaginaAtual.forEach((produto) => {
      const produtoElement = document.createElement("div");
      produtoElement.className = `produto-numero`;
      produtoElement.id = `produto-${contador}`;

      const imagemProduto = document.createElement("img");
      imagemProduto.src = produto.imagemfrente;
      imagemProduto.id = "imagem-produto";

      // Adiciona o evento para trocar a imagem quando o mouse passar por cima
      imagemProduto.addEventListener("mouseenter", function () {
        imagemProduto.src = produto.imagemcostas;
      });

      // Adiciona o evento para retornar à imagem de frente quando o mouse sair
      imagemProduto.addEventListener("mouseleave", function () {
        imagemProduto.src = produto.imagemfrente;
      });

      const tituloProduto = document.createElement("p");
      tituloProduto.textContent = produto.nome;
      tituloProduto.id = "titulo-produto";

      const precoProduto = document.createElement("h3");
      if (produto.preco && typeof produto.preco === "number") {
        precoProduto.textContent = `R$ ${produto.preco.toFixed(2)}`;
      } else {
        precoProduto.textContent = "Preço indisponível";
      }
      precoProduto.id = "preco-produto";

      const quantidadeProduto = document.createElement("p");
      quantidadeProduto.textContent = `Quantidade em estoque: ${produto.quantidade}`;
      quantidadeProduto.id = "quantidade-produto";

      const inputQuantidade = document.createElement("input");
      inputQuantidade.type = "number";
      inputQuantidade.min = 1;
      inputQuantidade.max = produto.quantidade;
      inputQuantidade.value = 1;
      inputQuantidade.id = "input-quantidade-produto";

      const selectTamanho = document.createElement("select");
      selectTamanho.id = "select-tamanho";
      // Adicione as opções de tamanho do produto ao select
      produto.tamanho.forEach((tamanho) => {
        const optionTamanho = document.createElement("option");
        optionTamanho.value = tamanho;
        optionTamanho.textContent = tamanho;
        selectTamanho.appendChild(optionTamanho);
      });

      const botaoComprar = document.createElement("button");
      botaoComprar.textContent = "Comprar";
      botaoComprar.id = "botao-comprar-produto";
      botaoComprar.addEventListener("click", () => {
        const quantidadeSelecionada = inputQuantidade.value;
        const tamanhoSelecionado = selectTamanho.value;

        if (quantidadeSelecionada <= 0) {
          exibirPopup("Quantidade inválida!", false);
        } else if (quantidadeSelecionada > produto.quantidade) {
          exibirPopup("Quantidade insuficiente em estoque!", false);
        } else if (precoProduto == "Preço indisponível!") {
          exibirPopup("Produto indisponível!", false);
        } else {
          produtoSelecionado = {
            nome: produto.nome,
            preco: produto.preco,
            quantidade: quantidadeSelecionada,
            tamanhoSelecionado: tamanhoSelecionado,
          };
          carrinho.push(produtoSelecionado);
          produto.quantidade -= quantidadeSelecionada;
          localStorage.setItem("produtos", JSON.stringify(produtos));
          preencherSelectCarrinho();
          colocandoProdutoNaPage();
          calcularTotal();
          exibirPopup("Produto adicionado ao carrinho!", true);
        }
      });

      produtoElement.appendChild(imagemProduto);
      produtoElement.appendChild(tituloProduto);
      produtoElement.appendChild(precoProduto);
      produtoElement.appendChild(quantidadeProduto);
      produtoElement.appendChild(selectTamanho);
      produtoElement.appendChild(inputQuantidade);
      produtoElement.appendChild(botaoComprar);
      containerProdutos.appendChild(produtoElement);
      contador++;
    });
    const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

    if (navPagina.children.length > 0) {
      navPagina.innerHTML = "";
    }

    const divNavegacao = document.createElement("div");
    divNavegacao.className = "navegacao-pagina";

    const paginaAnterior = document.createElement("button");
    paginaAnterior.textContent = "Anterior";
    paginaAnterior.addEventListener("click", function () {
      if (paginaAtual > 1) {
        paginaAtual--;
        pesquisarProdutos(); // Não é necessário passar a categoria como argumento
      }
    });

    divNavegacao.appendChild(paginaAnterior);

    for (let i = 1; i <= totalPaginas; i++) {
      const pagina = document.createElement("button");
      pagina.textContent = i;
      pagina.id = "numero-pagina";
      pagina.addEventListener("click", function () {
        paginaAtual = i;
        pesquisarProdutos(); // Não é necessário passar a categoria como argumento
      });

      // Adiciona o id 'pagina-atual' para destacar o botão da página atual
      if (i === paginaAtual) {
        pagina.id = "pagina-atual";
      }

      divNavegacao.appendChild(pagina);
    }

    const paginaSeguinte = document.createElement("button");
    paginaSeguinte.textContent = "Próxima";
    paginaSeguinte.addEventListener("click", function () {
      if (paginaAtual < totalPaginas) {
        paginaAtual++;
        pesquisarProdutos(); // Não é necessário passar a categoria como argumento
      }
    });

    divNavegacao.appendChild(paginaSeguinte);
    navPagina.appendChild(divNavegacao);
  }
  termoPesquisaGlobal = termoPesquisado;
}

function colocandoProdutoNaPage(categoria) {
  const containerProdutos = document.getElementById("container-produtos");
  const navPagina = document.getElementById("nav-pagina");

  const produtos = JSON.parse(localStorage.getItem("produtos"));
  let contador = 1;

  // Verifica se a categoria foi alterada
  if (categoria) {
    categoriaSelecionada = categoria;
    paginaAtual = 1; // Redefine a página atual para a primeira página ao trocar a categoria
  }

  const indiceInicial = (paginaAtual - 1) * produtosPorPagina;
  const indiceFinal = indiceInicial + produtosPorPagina;

  const produtosFiltrados =
    categoriaSelecionada === "todos" ? produtos : produtos.filter((produto) => produto.categoria === categoriaSelecionada);

  const produtosPaginaAtual = produtosFiltrados.slice(indiceInicial, indiceFinal);

  containerProdutos.innerHTML = "";

  if (produtosFiltrados === null) {
    const semProdutos = document.createElement("p");
    semProdutos.textContent = "Não há produtos nesta categoria.";
    semProdutos.id = "sem-produtos";
    containerProdutos.appendChild(semProdutos);
  } else {
    produtosPaginaAtual.forEach((produto) => {
      const produtoElement = document.createElement("div");
      produtoElement.className = `produto-numero`;
      produtoElement.id = `produto-${contador}`;

      const imagemProduto = document.createElement("img");
      imagemProduto.src = produto.imagemfrente;
      imagemProduto.id = "imagem-produto";

      // Adiciona o evento para trocar a imagem quando o mouse passar por cima
      imagemProduto.addEventListener("mouseenter", function () {
        imagemProduto.src = produto.imagemcostas;
      });

      // Adiciona o evento para retornar à imagem de frente quando o mouse sair
      imagemProduto.addEventListener("mouseleave", function () {
        imagemProduto.src = produto.imagemfrente;
      });

      const tituloProduto = document.createElement("p");
      tituloProduto.textContent = produto.nome;
      tituloProduto.id = "titulo-produto";

      const precoProduto = document.createElement("h3");
      if (produto.preco && typeof produto.preco === "number") {
        precoProduto.textContent = `R$ ${produto.preco.toFixed(2)}`;
      } else {
        precoProduto.textContent = "Preço indisponível";
      }
      precoProduto.id = "preco-produto";

      const quantidadeProduto = document.createElement("p");
      if (produto.quantidade === 0) {
        precoProduto.textContent = `Produto zerado em estoque!`;
      } else {
        quantidadeProduto.textContent = `Quantidade em estoque: ${produto.quantidade}`;
      }
      quantidadeProduto.id = "quantidade-produto";

      const inputQuantidade = document.createElement("input");
      inputQuantidade.type = "number";
      inputQuantidade.min = 1;
      inputQuantidade.max = produto.quantidade;
      inputQuantidade.value = 1;
      inputQuantidade.id = "input-quantidade-produto";

      const selectTamanho = document.createElement("select");
      selectTamanho.id = "select-tamanho";
      // Adicione as opções de tamanho do produto ao select
      produto.tamanho.forEach((tamanho) => {
        const optionTamanho = document.createElement("option");
        optionTamanho.value = tamanho;
        optionTamanho.textContent = tamanho;
        selectTamanho.appendChild(optionTamanho);
      });

      const botaoComprar = document.createElement("button");
      botaoComprar.textContent = "Comprar";
      botaoComprar.id = "botao-comprar-produto";
      botaoComprar.addEventListener("click", () => {
        const quantidadeSelecionada = inputQuantidade.value;
        const tamanhoSelecionado = selectTamanho.value;

        if (quantidadeSelecionada <= 0) {
          exibirPopup("Quantidade inválida!", false);
        } else if (quantidadeSelecionada > produto.quantidade) {
          exibirPopup("Quantidade insuficiente em estoque!", false);
        } else if (precoProduto == "Preço indisponível!") {
          exibirPopup("Produto indisponível!", false);
        } else {
          produtoSelecionado = {
            nome: produto.nome,
            preco: produto.preco,
            quantidade: quantidadeSelecionada,
            tamanhoSelecionado: tamanhoSelecionado,
          };
          carrinho.push(produtoSelecionado);
          produto.quantidade -= quantidadeSelecionada;
          // localStorage.setItem("produtos", JSON.stringify(produtos));

          // Atualizar a quantidade do produto no localStorage
          const produtoArmazenado = produtos.find((p) => p.id === produto.id);
          if (produtoArmazenado) {
            produtoArmazenado.quantidade -= quantidadeSelecionada;
            localStorage.setItem("produtos", JSON.stringify(produtos));
          }

          preencherSelectCarrinho();
          colocandoProdutoNaPage();
          calcularTotal();
          exibirPopup("Produto adicionado ao carrinho!", true);
        }
      });

      produtoElement.appendChild(imagemProduto);
      produtoElement.appendChild(tituloProduto);
      produtoElement.appendChild(precoProduto);
      produtoElement.appendChild(quantidadeProduto);
      produtoElement.appendChild(selectTamanho);
      produtoElement.appendChild(inputQuantidade);
      produtoElement.appendChild(botaoComprar);
      containerProdutos.appendChild(produtoElement);
      contador++;
    });

    const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

    if (navPagina.children.length > 0) {
      navPagina.innerHTML = "";
    }

    const divNavegacao = document.createElement("div");
    divNavegacao.className = "navegacao-pagina";

    const paginaAnterior = document.createElement("button");
    paginaAnterior.textContent = "Anterior";
    paginaAnterior.addEventListener("click", function () {
      if (paginaAtual > 1) {
        paginaAtual--;
        colocandoProdutoNaPage(); // Não é necessário passar a categoria como argumento
      }
    });

    divNavegacao.appendChild(paginaAnterior);

    for (let i = 1; i <= totalPaginas; i++) {
      const pagina = document.createElement("button");
      pagina.textContent = i;
      pagina.id = "numero-pagina";
      pagina.addEventListener("click", function () {
        paginaAtual = i;
        colocandoProdutoNaPage(); // Não é necessário passar a categoria como argumento
      });

      // Adiciona o id 'pagina-atual' para destacar o botão da página atual
      if (i === paginaAtual) {
        pagina.id = "pagina-atual";
      }

      divNavegacao.appendChild(pagina);
    }

    const paginaSeguinte = document.createElement("button");
    paginaSeguinte.textContent = "Próxima";
    paginaSeguinte.addEventListener("click", function () {
      if (paginaAtual < totalPaginas) {
        paginaAtual++;
        colocandoProdutoNaPage(); // Não é necessário passar a categoria como argumento
      }
    });

    divNavegacao.appendChild(paginaSeguinte);
    navPagina.appendChild(divNavegacao);
  }
}

const quadroCategorias = document.getElementById("quadro-categorias");
quadroCategorias.addEventListener("click", function (event) {
  if (event.target.classList.contains("botao-categoria")) {
    const categoria = event.target.dataset.categoria;
    colocandoProdutoNaPage(categoria);
  }
});

// exibindo popup passando uma mensagem e um boolean pra deixar verde/vermelho o popup
function exibirPopup(mensagem, sucesso) {
  // exibindo popup quando adicionado ao carrinho
  const popupCarrinho = document.getElementById("popup");

  // pegando o p da mensagem
  const popupMensagem = document.getElementById("popup-mensagem");

  // Remove todas as classes existentes no popup
  popupCarrinho.classList.remove("popup-sucesso", "popup-erro");

  // Adiciona a classe de acordo com o resultado da ação
  if (sucesso) {
    popupCarrinho.classList.add("popup-sucesso");
  } else {
    popupCarrinho.classList.add("popup-erro");
  }

  popupMensagem.textContent = mensagem;
  popupCarrinho.style.display = "block";
  setTimeout(() => {
    popupCarrinho.style.display = "none";
  }, 3000);
}

// Preenche o select com os produtos já adicionados no carrinho
function preencherSelectCarrinho() {
  const selectCarrinho = document.getElementById("select-carrinho");
  selectCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    const option = document.createElement("option");
    option.text = "Carrinho vazio";
    selectCarrinho.appendChild(option);
  } else {
    carrinho.forEach((produto) => {
      const option = document.createElement("option");
      option.text = `${produto.nome}`;
      selectCarrinho.appendChild(option);
    });
  }
}

// Remove um produto do carrinho selecionado no select
function removerProduto() {
  const selectCarrinho = document.getElementById("select-carrinho");
  const nomeProduto = selectCarrinho.value;
  const produtos = JSON.parse(localStorage.getItem("produtos"));

  const index = carrinho.findIndex((produto) => produto.nome === nomeProduto);
  if (carrinho.length === 0) {
    exibirPopup("Carrinho vazio!", false);
    return;
  } else if (index !== -1) {
    const produtoSelecionado = carrinho[index];
    const produtoIndex = produtos.findIndex((p) => p.nome === produtoSelecionado.nome);
    produtos[produtoIndex].quantidade += parseInt(produtoSelecionado.quantidade); // adiciona a quantidade ao saldo
    carrinho.splice(index, 1);
    preencherSelectCarrinho();
    const carrinhoElement = document.getElementById("carrinho");
    if (carrinhoElement) {
      carrinhoElement.removeChild(carrinhoElement.childNodes[index]);
    }
    localStorage.removeItem("produtos");
    localStorage.setItem("produtos", JSON.stringify(produtos));
    exibirPopup("Produto retirado do carrinho", true);
    colocandoProdutoNaPage();
    calcularTotal();
  }
}

let totalCompra = 0;
// Função para calcular o total da compra
function calcularTotal() {
  const produtos = JSON.parse(localStorage.getItem("produtos"));
  const totalElement = document.getElementById("total");
  const carrinhoElement = document.getElementById("carrinho-lista");
  let total = 0;
  let carrinhoHTML = "";

  carrinho.forEach((produto) => {
    const produtoInfo = produtos.find((p) => p.nome === produto.nome);
    const produtoPreco = produtoInfo.preco * produto.quantidade;
    const produtoQuantidade = produtoInfo.quantidade;
    total += produtoPreco;
    carrinhoHTML += `<li>
    ${produto.nome} | Tamanho: ${produto.tamanhoSelecionado} |  R$${produtoPreco.toFixed(2)} (${produto.quantidade}x)
    </li>`;
  });

  totalElement.innerHTML = `R$ ${total.toFixed(2)}`;
  carrinhoElement.innerHTML = carrinhoHTML;

  totalCompra = total;
  console.log(totalCompra);
}

// Adiciona um evento change ao select do carrinho
removerCarrinho.addEventListener("click", removerProduto);

// chamando a funnção para mostrar os produtos na pagina
colocandoProdutoNaPage("todos");

// Chama a função para preencher o select do carrinho
preencherSelectCarrinho();

// chama a função para deixar o valor zero se nao tiver nada no carrinho
calcularTotal();

function limparPedidos() {
  pedidos = [];
}

// limparPedidos();
