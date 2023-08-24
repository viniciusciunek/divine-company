let pessoasCadastradas = JSON.parse(localStorage.getItem("pessoasCadastradas")) || [];
let pedidosFeitos = JSON.parse(localStorage.getItem("pedidos")) || [];

$(document).ready(() => {
  carregarPaises();
  carregarEstados();
  carregarCidades();
  exibirInformacoesUsuario();
  exibirPedidos();
});

const botaoSair = document.getElementById("botao-sair");
const nomeinput = document.getElementById("nome-completo");
const cpfinput = document.getElementById("cpf");
const emailinputcad = document.getElementById("email-cadastro");
const senhainputcad = document.getElementById("senha-cadastro");
const requisitosSenha = document.getElementById("requisitos-senha");
const nascimentoinput = document.getElementById("nascimento");

const paisSelectCad = document.getElementById("pais-cadastro");
const estadoSelectCad = document.getElementById("estado-cadastro");
const cidadeSelectCad = document.getElementById("cidade-cadastro");
const ruaInputCad = document.getElementById("rua-cadastro");
const complementoInputCad = document.getElementById("complemento-cadastro");

const botaoCadastrar = document.getElementById("botao-cadastrar");
const botaoLogar = document.getElementById("botao-logar");

const divCadastrar = document.getElementById("cadastro");
const divLogar = document.getElementById("login");

const botaoCadastro = document.getElementById("botao-cadastro");
const formCadastro = document.getElementById("form-cadastro");

const emailinputlog = document.getElementById("email-login");
const senhainputlog = document.getElementById("senha-login");

const botaoLogin = document.getElementById("botao-login");
const formLogin = document.getElementById("form-login");

const informacoes = document.querySelector(".informacoes");
const informacoesTitulo = document.querySelector(".informacoes-titulo");
const informacoesSeta = document.querySelector(".informacoes-seta");
const informacoesConteudo = document.querySelector(".informacoes-conteudo");

const pedidos = document.querySelector(".pedidos");
const pedidosTitulo = document.querySelector(".pedidos-titulo");
const pedidosSeta = document.querySelector(".pedidos-seta");
const pedidosConteudo = document.querySelector(".pedidos-conteudo");

const estaLogado = localStorage.getItem("estaLogado");
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

const requisitos = {
  tamanho: {
    mensagem: "Pelo menos 8 caracteres",
    validador: (senha) => senha.length >= 8,
  },
  numero: {
    mensagem: "Pelo menos 1 número",
    validador: (senha) => /[0-9]/.test(senha),
  },
  maiuscula: {
    mensagem: "Pelo menos 1 letra maiúscula",
    validador: (senha) => /[A-Z]/.test(senha),
  },
};

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

function carregarPaises() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((paises) => {
      paisSelectCad.innerHTML = "<option value=''>Selecione um país:</option>";
      paises.sort((a, b) => a.name.common.localeCompare(b.name.common));
      for (const pais of paises) {
        const option = document.createElement("option");
        option.value = pais.name.common;
        option.textContent = pais.name.common;
        paisSelectCad.appendChild(option);
      }
    });
}

// enche o select de estados quando o pais é selecionado
function carregarEstados() {
  const nomePais = paisSelectCad.value;
  const estadoSelectCad = document.getElementById("estado-cadastro");
  estadoSelectCad.innerHTML = "<option value=''>Selecione um estado:</option>";
  if (nomePais === "Brazil") {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => response.json())
      .then((estados) => {
        estados.sort((a, b) => a.nome.localeCompare(b.nome));
        estados.forEach((estado) => {
          const option = document.createElement("option");
          option.value = estado.id;
          option.text = estado.nome;
          estadoSelectCad.appendChild(option);
        });
      })
      .catch((error) => console.error(error));
  } else {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${nomePais}&key=f76f2b3223df42ef895f7a324e1a4e13`)
      .then((response) => response.json())
      .then((data) => {
        const estados = new Set();
        for (const result of data.results) {
          if (result.components.state) {
            estados.add(result.components.state);
          }
        }
        const estadosArray = Array.from(estados);
        estadosArray.sort();
        for (const estado of estadosArray) {
          const option = document.createElement("option");
          option.value = estado;
          option.textContent = estado;
          estadoSelectCad.appendChild(option);
        }
      });
  }
}

function obterNomeEstado(idEstado) {
  const estados = {
    11: "Rondônia",
    12: "Acre",
    13: "Amazonas",
    14: "Roraima",
    15: "Pará",
    16: "Amapá",
    17: "Tocantins",
    21: "Maranhão",
    22: "Piauí",
    23: "Ceará",
    24: "Rio Grande do Norte",
    25: "Paraíba",
    26: "Pernambuco",
    27: "Alagoas",
    28: "Sergipe",
    29: "Bahia",
    31: "Minas Gerais",
    32: "Espírito Santo",
    33: "Rio de Janeiro",
    35: "São Paulo",
    41: "Paraná",
    42: "Santa Catarina",
    43: "Rio Grande do Sul",
    50: "Mato Grosso do Sul",
    51: "Mato Grosso",
    52: "Goiás",
    53: "Distrito Federal",
  };
  return estados[idEstado] || "Desconhecido";
}

// enche o select de cidades quando o estado é selecionado
function carregarCidades() {
  estadoNome = estadoSelectCad.value;

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoNome}/municipios`)
    .then((response) => response.json())
    .then((cidades) => {
      cidadeSelectCad.innerHTML = "<option value=''>Selecione uma cidade:</option>";
      for (const cidade of cidades) {
        const option = document.createElement("option");
        option.text = cidade.nome;
        cidadeSelectCad.add(option);
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar cidades:", error);
    });
}

function cadastrarPessoa() {
  const nomeCompleto = nomeinput.value;
  const cpf = cpfinput.value;
  const email = emailinputcad.value;
  const senha = senhainputcad.value;
  const nascimento = nascimentoinput.value;

  const pais = paisSelectCad.value;
  const estado = estadoSelectCad.value;
  const cidade = cidadeSelectCad.value;
  const rua = ruaInputCad.value;
  const complemento = complementoInputCad.value;

  const endereco = {
    pais: pais,
    estado: estado,
    cidade: cidade,
    rua: rua,
    complemento: complemento,
  };

  if ((nomeCompleto || cpf || email || nascimento || senha) == "") {
    exibirPopup("Cadastro com problema, reveja os campos", false);
    return;
  } else if (
    pessoasCadastradas &&
    (pessoasCadastradas.some((pessoa) => pessoa.cpf === cpf) || pessoasCadastradas.some((pessoa) => pessoa.email === email))
  ) {
    exibirPopup("CPF ou e-mail já cadastrados", false);
    return;
  } else {
    let cadastroPessoa = new Pessoa(nomeCompleto, cpf, email, senha, nascimento, endereco);
    pessoasCadastradas.push(cadastroPessoa);
    localStorage.setItem("pessoasCadastradas", JSON.stringify(pessoasCadastradas));
    exibirPopup("Cadastro efetuado com sucesso!", true);
    nomeinput.value = "";
    cpfinput.value = "";
    emailinputcad.value = "";
    senhainputcad.value = "";
    nascimentoinput.value = "";
    paisSelectCad.value = "";
    estadoSelectCad.value = "";
    cidadeSelectCad.value = "";
    ruaInputCad.value = "";
    complementoInputCad.value = "";
    divLogar.style.display = "block";
    divCadastrar.style.display = "none";
  }
}

function logar() {
  const email = emailinputlog.value;
  const senha = senhainputlog.value;

  if (pessoasCadastradas && pessoasCadastradas.length > 0) {
    let usuarioEncontrado = pessoasCadastradas.find((usuario) => usuario.email === email && usuario.senha === senha);

    if (usuarioEncontrado) {
      if (!usuarioEncontrado.pedidos) {
        usuarioEncontrado.pedidos = [];
      }
      exibirPopup("Login bem sucedido!", true);
      localStorage.setItem("estaLogado", "true");
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
      emailinputlog.value = "";
      senhainputlog.value = "";
      exibirPaginaCorreta();
      exibirInformacoesUsuario();
      exibirPedidos();
    } else {
      exibirPopup("E-mail ou senha incorretos.", false);
    }
  } else {
    exibirPopup("Não há usuários cadastrados.", false);
  }
}

function verificarUsuarioLogado() {
  if (estaLogado === "true") {
    exibirPaginaCorreta();
    exibirInformacoesUsuario();
    exibirPedidos();
  } else {
    exibirPaginaCorreta();
  }
}

function exibirInformacoesUsuario() {
  // Verifica se há um usuário logado
  if (estaLogado) {
    // Limpa o conteúdo atual das informações
    informacoesConteudo.innerHTML = "";

    // Cria os elementos de parágrafo para exibir as informações
    const nomeParagrafo = document.createElement("p");
    nomeParagrafo.textContent = `Nome: ${usuarioLogado.nomeCompleto}`;

    const cpfParagrafo = document.createElement("p");
    cpfParagrafo.textContent = `CPF: ${usuarioLogado.cpf}`;

    const emailParagrafo = document.createElement("p");
    emailParagrafo.textContent = `Email: ${usuarioLogado.email}`;

    const paisParagrafo = document.createElement("p");
    paisParagrafo.textContent = `Pais: ${usuarioLogado.endereco.pais}`;

    const estadoParagrafo = document.createElement("p");
    estadoParagrafo.textContent = `Estado: ${obterNomeEstado(usuarioLogado.endereco.estado)}`;

    const cidadeParagrafo = document.createElement("p");
    cidadeParagrafo.textContent = `Cidade: ${usuarioLogado.endereco.cidade}`;

    const ruaParagrafo = document.createElement("p");
    ruaParagrafo.textContent = `Rua: ${usuarioLogado.endereco.rua}`;

    const complementoParagrafo = document.createElement("p");
    complementoParagrafo.textContent = `Complemento: ${usuarioLogado.endereco.complemento}`;

    // Adiciona os parágrafos ao elemento de conteúdo das informações
    informacoesConteudo.appendChild(nomeParagrafo);
    informacoesConteudo.appendChild(paisParagrafo);
    informacoesConteudo.appendChild(estadoParagrafo);
    informacoesConteudo.appendChild(cidadeParagrafo);
    informacoesConteudo.appendChild(ruaParagrafo);
    informacoesConteudo.appendChild(complementoParagrafo);
    informacoesConteudo.appendChild(cpfParagrafo);
    informacoesConteudo.appendChild(emailParagrafo);
  }
}

function exibirPedidos() {
  const pedidosUser = usuarioLogado.pedidos;
  console.log(pedidosUser);
  if (estaLogado) {
    pedidosConteudo.innerHTML = ""; // Clear the current content

    if (pedidosUser.length > 0) {
      for (const pedido of pedidosUser) {
        const pedidoDiv = document.createElement("div");
        pedidoDiv.classList.add("pedido");

        const numeroPedido = document.createElement("p");
        numeroPedido.textContent = `Número do pedido: ${pedidosUser.idPedido}`;

        const dataPedido = document.createElement("p");
        dataPedido.textContent = `Data do pedido: ${pedido.data}`;

        const produtos = document.createElement("p");
        produtos.textContent = `Produtos: ${pedido.produtos.join(", ")}`;

        pedidoDiv.appendChild(numeroPedido);
        pedidoDiv.appendChild(dataPedido);
        pedidoDiv.appendChild(produtos);

        pedidosConteudo.appendChild(pedidoDiv);
      }
    } else {
      const semPedidos = document.createElement("p");
      semPedidos.textContent = "Você não possui pedidos.";
      pedidosConteudo.appendChild(semPedidos);
    }
  }
}

function exibirPaginaCorreta() {
  const estaLogado = localStorage.getItem("estaLogado");

  if (estaLogado === "true") {
    document.getElementById("minha-conta").style.display = "block";
    document.getElementById("login-ou-cadastro").style.display = "none";
  } else {
    document.getElementById("minha-conta").style.display = "none";
    document.getElementById("login-ou-cadastro").style.display = "block";
  }
}

function pressEnterCad(event) {
  if (event.keyCode === 13) {
    cadastrarPessoa();
  }
}

function pressEnterLog(event) {
  if (event.keyCode === 13) {
    logar();
  }
}

// formata o cpf enquanto digita
cpfinput.addEventListener("input", function () {
  let cpf = cpfinput.value;

  // remove tudo que não é número
  cpf = cpf.replace(/\D/g, "");

  // adiciona pontos e traço na formatação
  cpf = cpf.replace(/(\d{3})(\d{1,2})/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})/, "$1-$2");

  // atualiza o valor do input com a formatação do CPF
  cpfinput.value = cpf;

  // limita o tamanho do input em 14 caracteres
  if (cpf.length > 14) {
    cpfinput.value = cpf.substring(0, 14);
  }
});

// ir riscando conforme cumprido requisitos
senhainputcad.addEventListener("input", (event) => {
  const senha = event.target.value;
  const requisitosAtendidos = Object.values(requisitos).filter((requisito) => requisito.validador(senha));

  requisitosSenha.innerHTML = "";
  Object.values(requisitos).forEach((requisito) => {
    const atendido = requisitosAtendidos.includes(requisito);
    const mensagem = atendido ? `<del>${requisito.mensagem}</del>` : requisito.mensagem;
    requisitosSenha.innerHTML += `<li>${mensagem}</li>`;
  });
});

// entrar no campo senha aparecer
senhainputcad.addEventListener("focus", () => {
  requisitosSenha.style.display = "block";
});

// sair do campo senha sumir
senhainputcad.addEventListener("blur", () => {
  requisitosSenha.style.display = "none";
});

botaoCadastro.addEventListener("click", cadastrarPessoa);

botaoLogin.addEventListener("click", logar);

botaoCadastrar.addEventListener("click", function () {
  divLogar.style.display = "none";

  if (divCadastrar.style.display === "none") {
    divCadastrar.style.display = "block";
  } else {
    divCadastrar.style.display = "none";
  }
});

botaoLogar.addEventListener("click", function () {
  divCadastrar.style.display = "none";

  if (divLogar.style.display === "none") {
    divLogar.style.display = "block";
  } else {
    divLogar.style.display = "none";
  }
});

botaoSair.addEventListener("click", function () {
  localStorage.removeItem("estaLogado");
  localStorage.removeItem("usuarioLogado");
  exibirPaginaCorreta();
});

nomeinput.addEventListener("keydown", pressEnterCad);
cpfinput.addEventListener("keydown", pressEnterCad);
emailinputcad.addEventListener("keydown", pressEnterCad);
senhainputcad.addEventListener("keydown", pressEnterCad);
nascimentoinput.addEventListener("keydown", pressEnterCad);

emailinputlog.addEventListener("keydown", pressEnterLog);
senhainputlog.addEventListener("keydown", pressEnterLog);

informacoesSeta.addEventListener("click", function () {
  informacoes.classList.toggle("informacoes-aberto");
});

informacoesTitulo.addEventListener("click", function () {
  informacoes.classList.toggle("informacoes-aberto");
});

informacoesSeta.addEventListener("click", function () {
  informacoes.classList.toggle("informacoes-aberto");
});

pedidosSeta.addEventListener("click", function () {
  pedidos.classList.toggle("pedidos-aberto");
});

pedidosTitulo.addEventListener("click", function () {
  pedidos.classList.toggle("pedidos-aberto");
});

pedidosSeta.addEventListener("click", function () {
  pedidos.classList.toggle("pedidos-aberto");
});

verificarUsuarioLogado();
