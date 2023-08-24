const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const pessoasCadastradas =
  JSON.parse(localStorage.getItem("pessoasCadastradas")) || [];
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// seleciona o botão de comprar
const btnComprar = document.getElementById("btn-comprar");

// botao de pagar do metodo de pagamento
const btnPagar = document.getElementById("botao-pagar");

// seleciona o modal de pagamento
const modalPagamento = document.getElementById("modal-pagamento");

// adiciona evento de clique no botão de fechar do modal de pagamento
const btnFecharModal = document.querySelector(".close");

// seleciona  se for cartao
const formCartao = document.getElementById("form-cartao");

// seleciona  se for pix
const formPix = document.getElementById("form-pix");

// seleciona a bolinha selecionada de cartao
const radioCredito = document.querySelector(
  'input[name="forma-pagamento"][value="credito"]'
);

// seleciona a bolinha selecionada de debito
const radioDebito = document.querySelector(
  'input[name="forma-pagamento"][value="debito"]'
);

// seleciona a bolinha selecionada de pix
const radioPix = document.querySelector(
  'input[name="forma-pagamento"][value="pix"]'
);

// pega o input do cartao para formatar
const cartaoInput = document.getElementById("numero-cartao");

// pega o input do cartao para formatar
const dataValidadeInput = document.getElementById("data-validade");

const cvcInput = document.getElementById("codigo-seguranca");

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

function gerarIdPedido() {
  const caracteres = "0123456789";
  const tamanho = 8;
  let randomId = "";

  for (let i = 0; i < tamanho; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    randomId += caracteres.charAt(randomIndex);
  }

  return randomId;
}

// adiciona evento de envio do formulário de pagamento e salva e vai pra outra page
// function efetuarCompra(event) {
//   event.preventDefault();

//   const nomeCompleto = document.getElementById("nome-completo").value;
//   const numeroCartao = document.getElementById("numero-cartao").value;
//   const dataValidade = document.getElementById("data-validade").value;
//   const codigoSeguranca = document.getElementById("codigo-seguranca").value;
//   const formaPagamento = document.querySelector('input[name="forma-pagamento"]:checked');

//   const estaLogado = localStorage.getItem("estaLogado");

//   let id = gerarIdPedido();
//   let produtosNomes = carrinho.map((produto) => produto.nome);
//   let quantidadeProdutos = carrinho.length;
//   let totalCarrinho = totalCompra;
//   const formaPagamentoSelecionada = formaPagamento.value;

//   if (estaLogado === "true") {
//     if (!nomeCompleto || !numeroCartao || !dataValidade || !codigoSeguranca || !formaPagamento) {
//       exibirPopup("Confira os campos se estão preenchidos!", false);
//       return;
//     }

//     if (formaPagamentoSelecionada === "debito" || formaPagamentoSelecionada === "credito") {
//       const dadosCartao = {
//         nomeCompleto: nomeCompleto,
//         numeroCartao: numeroCartao,
//         dataValidade: dataValidade,
//         codigoSeguranca: codigoSeguranca,
//         formaPagamentoSelecionada: formaPagamentoSelecionada,
//       };

//       usuarioLogado.cartao = dadosCartao;

//       // Atualizar pessoasCadastradas com o usuário modificado
//       const indexUsuario = pessoasCadastradas.findIndex((usuario) => usuario.email === usuarioLogado.email);
//       if (indexUsuario !== -1) {
//         pessoasCadastradas[indexUsuario] = usuarioLogado;
//         localStorage.setItem("pessoasCadastradas", JSON.stringify(pessoasCadastradas));
//       }

//       let novoPedido = new Pedido(id, produtosNomes, quantidadeProdutos, totalCarrinho, formaPagamentoSelecionada);

//       pedidos.push(novoPedido);

//       localStorage.setItem("pedidos", JSON.stringify(pedidos));

//       // Atualizar usuárioLogado no localStorage
//       localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
//     } else {
//       let novoPedido = new Pedido(id, produtosNomes, quantidadeProdutos, totalCarrinho, formaPagamentoSelecionada);

//       pedidos.push(novoPedido);

//       localStorage.setItem("pedidos", JSON.stringify(pedidos));
//     }

//     // fecha o modal de pagamento
//     modalPagamento.style.display = "none";

//     // redireciona para a página de confirmação de compra
//     window.location.href = "/javascript/loja/pages/confirmacao.html";
//   } else {
//     alert("Cadastre-se ou faça login para efetuar a compra!");
//     window.location.href = "/javascript/loja/pages/conta.html";
//   }
// }

function efetuarCompra(event) {
  event.preventDefault();

  const nomeCompleto = document.getElementById("nome-completo").value;
  const numeroCartao = document.getElementById("numero-cartao").value;
  const dataValidade = document.getElementById("data-validade").value;
  const codigoSeguranca = document.getElementById("codigo-seguranca").value;
  const formaPagamento = document.querySelector(
    'input[name="forma-pagamento"]:checked'
  );

  const estaLogado = localStorage.getItem("estaLogado");

  let id = gerarIdPedido();
  let produtosNomes = carrinho.map((produto) => produto.nome);
  let quantidadeProdutos = carrinho.length;
  let totalCarrinho = totalCompra;
  const formaPagamentoSelecionada = formaPagamento.value;

  if (estaLogado === "true" && carrinho.length > 0) {
    if (
      !nomeCompleto ||
      !numeroCartao ||
      !dataValidade ||
      !codigoSeguranca ||
      !formaPagamento
    ) {
      exibirPopup("Confira se todos os campos estão preenchidos!", false);
      return;
    }
    const dadosCartao = {
      nomeCompleto: nomeCompleto,
      numeroCartao: numeroCartao,
      dataValidade: dataValidade,
      codigoSeguranca: codigoSeguranca,
      formaPagamentoSelecionada: formaPagamentoSelecionada,
    };

    usuarioLogado.cartao = dadosCartao;

    // Atualizar pessoasCadastradas com o usuário modificado
    const indexUsuario = pessoasCadastradas.findIndex(
      (usuario) => usuario.email === usuarioLogado.email
    );
    if (indexUsuario !== -1) {
      pessoasCadastradas[indexUsuario] = usuarioLogado;
      localStorage.setItem(
        "pessoasCadastradas",
        JSON.stringify(pessoasCadastradas)
      );
    }

    let novoPedido = new Pedido(
      id,
      produtosNomes,
      quantidadeProdutos,
      totalCarrinho,
      formaPagamentoSelecionada
    );

    usuarioLogado.pedidos = novoPedido;

    pedidos.push(novoPedido);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    // Atualizar usuárioLogado no localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    // fecha o modal de pagamento
    modalPagamento.style.display = "none";

    // redireciona para a página de confirmação de compra
    window.location.href = "../pages/confirmacao.html";
  } else if (carrinho.length <= 0) {
    exibirPopup("Carrinho vazio!", false);
  } else {
    alert("Cadastre-se ou faça login para efetuar a compra!");
    window.location.href = "../pages/conta.html";
  }
  carrinho = [];
}

function efetuarCompraPix(event) {
  event.preventDefault();

  const estaLogado = localStorage.getItem("estaLogado");

  let id = gerarIdPedido();
  let produtosNomes = carrinho.map((produto) => produto.nome);
  let quantidadeProdutos = carrinho.map((produto) => produto.quantidade);
  let totalCarrinho = totalCompra;
  let formaPagamentoSelecionada = "pix";

  if (estaLogado === "true" && carrinho.length > 0) {
    let novoPedido = new Pedido(
      id,
      produtosNomes,
      quantidadeProdutos,
      totalCarrinho,
      formaPagamentoSelecionada
    );

    if (!usuarioLogado.pedidos) {
      usuarioLogado.pedidos = []; // Cria um array vazio de pedidos se ainda não existir
    }

    usuarioLogado.pedidos = novoPedido;

    const indexUsuario = pessoasCadastradas.findIndex(
      (usuario) => usuario.email === usuarioLogado.email
    );
    if (indexUsuario !== -1) {
      pessoasCadastradas[indexUsuario] = usuarioLogado;
      localStorage.setItem(
        "pessoasCadastradas",
        JSON.stringify(pessoasCadastradas)
      );
    }

    pedidos.push(novoPedido);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    // fecha o modal de pagamento
    modalPagamento.style.display = "none";

    // redireciona para a página de confirmação de compra
    window.location.href = "../pages/confirmacao.html";
  } else if (carrinho.length <= 0) {
    exibirPopup("Carrinho vazio!", false);
  } else {
    alert("Cadastre-se ou faça login para efetuar a compra!");
    window.location.href = "../pages/conta.html";
  }
}

// adiciona evento de clique no botão de comprar
btnComprar.addEventListener("click", function () {
  // abre o modal de pagamento
  if (modalPagamento.style.display === "none") {
    modalPagamento.style.display = "block";
  } else {
    modalPagamento.style.display = "none";
  }
  window.scrollTo(0, document.body.scrollHeight);
});

// adiciona eventos de mudança nos botões de opção
radioCredito.addEventListener("change", function () {
  formCartao.style.display = "flex";
  formPix.style.display = "none";
});

// adiciona eventos de mudança nos botões de opção
radioDebito.addEventListener("change", function () {
  formCartao.style.display = "flex";
  formPix.style.display = "none";
});

// adiciona eventos de mudança nos botões de opção
radioPix.addEventListener("change", function () {
  formCartao.style.display = "none";
  formPix.style.display = "flex";
});

// iconezinho de x para fechar
btnFecharModal.addEventListener("click", function () {
  modalPagamento.style.display = "none";
});

// formata o cartao no tipo do cartao 0000 0000 0000 0000
cartaoInput.addEventListener("input", function () {
  let cartao = cartaoInput.value;

  // remove tudo que não é número
  cartao = cartao.replace(/\D/g, "");

  // adiciona espaço a cada 4 dígitos
  cartao = cartao.replace(/(\d{4})(?=\d)/g, "$1 ");

  // atualiza o valor do input com a formatação do cartão
  cartaoInput.value = cartao;

  // limita o tamanho do input em 19 caracteres
  if (cartao.length > 19) {
    cartaoInput.value = cartao.substring(0, 19);
  }
});

// formata a data de validade para ficar assim 05/23
dataValidadeInput.addEventListener("input", function () {
  let data = dataValidadeInput.value;

  // remove tudo que não é número
  data = data.replace(/\D/g, "");

  // adiciona espaço a cada 4 dígitos
  data = data.replace(/(\d{2})(?=\d)/g, "$1/");

  // atualiza o valor do input com a formatação do cartão
  dataValidadeInput.value = data;

  if (data.length > 5) {
    dataValidadeInput.value = data.substring(0, 5);
  }
});

// limita o cvc a tres
cvcInput.addEventListener("input", function () {
  let cvc = cvcInput.value;
  if (cvc.length > 3) {
    cvcInput.value = cvc.substring(0, 3);
  }
});

btnPagar.addEventListener("click", efetuarCompra);

const botaoPix = document.getElementById("botao-pagar-pix");
botaoPix.addEventListener("click", efetuarCompraPix);
