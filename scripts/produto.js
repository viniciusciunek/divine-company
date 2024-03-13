class Produto {
  constructor(nome, categoria, preco, quantidade, tamanho, imagemfrente, imagemcostas) {
    this.nome = nome;
    this.categoria = categoria;
    this.preco = preco;
    this.quantidade = quantidade;
    this.tamanho = Array.isArray(tamanho) ? tamanho : ["P", "M", "G"];
    this.imagemfrente = imagemfrente;
    this.imagemcostas = imagemcostas;
  }
}

// Lista de produtos
const produtos = [
  {
    nome: "Camiseta Chronic",
    categoria: "camiseta",
    preco: 79.9,
    quantidade: 120,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/556/unidade/16843245092883_detalhe.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/556/produto/16843245085712_detalhe.jpg",
  },
  {
    nome: "Camiseta Chronic Mato Seco",
    categoria: "camiseta",
    preco: 96.0,
    quantidade: 96,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16831215655480_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16831215651683_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Paz",
    categoria: "camiseta",
    preco: 89.9,
    quantidade: 73,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16813935569431_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16813935568631_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic O Mundo é Nosso",
    categoria: "camiseta",
    preco: 89,
    quantidade: 34,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16752627788373_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16752627753935_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Green Friend",
    categoria: "camiseta",
    preco: 89,
    quantidade: 46,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16759683792659_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16759683798832_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic P1xando",
    categoria: "camiseta",
    preco: 89,
    quantidade: 35,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16836363684831_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16836363677217_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Chapando o Globo",
    categoria: "camiseta",
    preco: 89,
    quantidade: 31,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16836556974761_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16836556969262_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Mundo Louco",
    categoria: "camiseta",
    preco: 89,
    quantidade: 22,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16838991733796_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16838991723693_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Mato Seco",
    categoria: "camiseta",
    preco: 96,
    quantidade: 13,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16831215744448_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16831215741293_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Manchister Weed",
    categoria: "camiseta",
    preco: 89,
    quantidade: 113,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16776099753506_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16776099757881_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Deus é Brasileiro",
    categoria: "camiseta",
    preco: 96,
    quantidade: 25,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16775055727453_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16775055718085_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic NGM Guenta",
    categoria: "camiseta",
    preco: 89,
    quantidade: 12,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16771500594529_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16771500569529_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Alegria Palhaço",
    categoria: "camiseta",
    preco: 89,
    quantidade: 37,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16782189086909_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16782189087117_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Blind Justice",
    categoria: "camiseta",
    preco: 89,
    quantidade: 62,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16782821796949_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16782821788526_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Cheepos",
    categoria: "camiseta",
    preco: 89,
    quantidade: 52,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16789965176843_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16789965155483_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic ET Marginal",
    categoria: "camiseta",
    preco: 89,
    quantidade: 44,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16812135724545_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16812135711783_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Nun",
    categoria: "camiseta",
    preco: 89,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16644735837202_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16644735835056_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic",
    categoria: "camiseta",
    preco: 89,
    quantidade: 21,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16814979685001_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16814979682446_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Circus",
    categoria: "camiseta",
    preco: 89,
    quantidade: 33,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16756911774773_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16756911727591_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic High Buda",
    categoria: "camiseta",
    preco: 89,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16757091762928_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16757091768809_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Muito Rua",
    categoria: "camiseta",
    preco: 89,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16680016038272_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16680016007228_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic SkunkDoo",
    categoria: "camiseta",
    preco: 89,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16660287674677_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16660287679056_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Homer",
    categoria: "camiseta",
    preco: 89,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16756848628554_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16756848603456_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Bobo da Corte",
    categoria: "camiseta",
    preco: 89,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16710435516594_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16710435503366_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Baby Bong",
    categoria: "camiseta",
    preco: 89,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16741395647844_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16741395639550_zoom.jpg",
  },
  {
    nome: "Camiseta Chronic Weed Panther",
    categoria: "camiseta",
    preco: 89,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/707/unidade/16738947721108_zoom.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/707/produto/16738947712849_zoom.jpg",
  },
  {
    nome: "Moletom Chronic - Peace",
    categoria: "blusa",
    preco: 249.9,
    quantidade: 23,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/219504035/16775992785357_zoom.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/219504035/16775992761396_zoom.jpg",
  },
  {
    nome: "Moletom Chronic - Tons Terrosos",
    categoria: "blusa",
    preco: 209.9,
    quantidade: 293,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/144126642/8c03b373e5.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/144126642/1a4b076010.jpg",
  },
  {
    nome: "Corta vento Chronic - Bag Vermelho",
    categoria: "blusa",
    preco: 179.9,
    quantidade: 123,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/103859599/7a38edbf6f.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/103859599/58ec5daeaa.jpg",
  },
  {
    nome: "Moletom Chronic Plus Size - Bike Good Vibes",
    categoria: "blusa",
    preco: 249.9,
    quantidade: 3,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/219502888/16775956756803_zoom.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/219502888/16775956712982_zoom.jpg",
  },
  {
    nome: "Moletom Chronic - Notorious Big",
    categoria: "blusa",
    preco: 209.9,
    quantidade: 231,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/144127181/46e7c2b665.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/144127181/b775bdbaec.jpg",
  },
  {
    nome: "Moletom Chronic Zyper - Anti Racism Facism Club",
    categoria: "blusa",
    preco: 209.9,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/108228380/5100701567.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/108228380/4c8e15d4d8.jpg",
  },
  {
    nome: "Moletom Half Green",
    categoria: "blusa",
    preco: 249.9,
    quantidade: 23,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/556/unidade/16593800989820_detalhe.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/556/produto/16593800972196_detalhe.jpg",
  },
  {
    nome: "Moletom Caramelo",
    categoria: "blusa",
    preco: 199.9,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/556/unidade/16811524843986_detalhe.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/556/produto/16811524835491_detalhe.jpg",
  },
  {
    nome: "Moletom Love And Peace",
    categoria: "blusa",
    preco: 229.9,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/556/unidade/16839028579306_detalhe.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/556/produto/16839028555113_detalhe.jpg",
  },
  {
    nome: "Jaqueta World Tour",
    categoria: "blusa",
    preco: 299.9,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/556/unidade/16844212774921_detalhe.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/556/produto/16844212757029_detalhe.jpg",
  },
  {
    nome: "Moletom Mostard",
    categoria: "blusa",
    preco: 299.9,
    quantidade: 0,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://static.cdnlive.com.br/uploads/556/unidade/16824376691027_detalhe.jpg",
    imagemcostas: "https://static.cdnlive.com.br/uploads/556/produto/16824376673431_detalhe.jpg",
  },
  {
    nome: "Calça Cargo Chronic - Marrom",
    categoria: "calca",
    preco: 269.9,
    quantidade: 23,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/211284407/16763897178905_zoom-uyolyt.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/211284407/16763897169480_zoom-yjegzc.jpg",
  },
  {
    nome: "Calça Sarja Chronic - Caqui",
    categoria: "calca",
    preco: 269.9,
    quantidade: 32,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/210292894/16763897113015_zoom-epcqlz.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/210292894/16763897072886_zoom-pygzbm.jpg",
  },
  {
    nome: "Calça Sarja Chronic - Cinza",
    categoria: "calca",
    preco: 269.9,
    quantidade: 12,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/209862216/16763825082403_zoom-pycazk3lhi.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/209862216/16763825015200_zoom-4cwq42oxph.jpg",
  },
  {
    nome: "Short Chronic Caramelo - Logo Bordado",
    categoria: "calca",
    preco: 109.9,
    quantidade: 10,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/205330635/16632712555447_zoom-rttunb.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/205330635/16632712523277_zoom-jjvxto.jpg",
  },
  {
    nome: "Short Chronic Preto - Logo Bordado",
    categoria: "calca",
    preco: 109.9,
    quantidade: 20,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/205343644/preto-vuaeoi.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/205343644/preto-2-wtonnq.jpg",
  },
  {
    nome: "Short Chronic Caramelo - Logo Tag",
    categoria: "calca",
    preco: 109.9,
    quantidade: 23,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/205346830/16650713598820_zoom-dxvyzn.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/205346830/16650713566337_zoom-ujfeav.jpg",
  },
  {
    nome: "Boné Aba Reta Chronic - Tag Pixo Reto",
    categoria: "acessorios",
    preco: 99.9,
    quantidade: 120,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/182098627/7360b1e31a.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/182098627/7fd79bb891.jpg",
  },
  {
    nome: "Chaveiro Tirante Chronic - Mosaico",
    categoria: "acessorios",
    preco: 25.9,
    quantidade: 30,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/194572605/16590378587969_zoom-7977411d94.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/194572605/16590378599778_zoom-4cda2f8f6e.jpg",
  },
  {
    nome: "Boné Five Panel Chronic - Tag Vermelho",
    categoria: "acessorios",
    preco: 79.9,
    quantidade: 89,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/182065309/2cb270599f.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/182065309/6fc0a964dd.jpg",
  },
  {
    nome: "Boné Dad Hat Chronic - Fé Pra Tudo!",
    categoria: "acessorios",
    preco: 99.9,
    quantidade: 23,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente:
      "https://cdn.awsli.com.br/2500x2500/777/777259/produto/205124133/15820560269971_zoom1-f27589d237c4b8916216280150166157-640-0-luvlon.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/205124133/16261866973246_zoom-xkhuvv.jpg",
  },
  {
    nome: "Carteira Chronic - Bike 100",
    categoria: "acessorios",
    preco: 79.9,
    quantidade: 33,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/219491504/16751872778012_zoom.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/219491504/16751872745873_zoom.jpg",
  },
  {
    nome: "Boné Dad Hat Chronic - Sustente Suas Palavras",
    categoria: "acessorios",
    preco: 99.9,
    quantidade: 21,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/190868597/07325628ea.jpg ",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/190868597/398c6f51d0.jpg",
  },
  {
    nome: "Boné Five Panel Chronic - Sustente Suas Palavras",
    categoria: "acessorios",
    preco: 99.9,
    quantidade: 43,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/190866997/c1384e0aac.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/190866997/6d13ff7134.jpg",
  },
  {
    nome: "Boné Aba Reta Chronic - Tag Original Marginal",
    categoria: "acessorios",
    preco: 79.9,
    quantidade: 12,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/182097867/a7d6e637e3.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/182097867/7d0c7750b3.jpg",
  },
  {
    nome: "Carteira Chronic - Barroco",
    categoria: "acessorios",
    preco: 79.9,
    quantidade: 53,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/219363295/16705252332169_zoom.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/219363295/16705252325192_zoom.jpg",
  },
  {
    nome: "Carteira Chronic - Santa ceia dos Mc's",
    categoria: "acessorios",
    preco: 79.9,
    quantidade: 31,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/219490802/16710408389809_zoom.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/219490802/16710408378401_zoom.jpg",
  },
  {
    nome: "Boné Five Panel Chronic - Bala Clava",
    categoria: "acessorios",
    preco: 99.9,
    quantidade: 42,
    tamanho: ["P", "M", "G", "GG"],
    imagemfrente: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/190866016/404b7fc18e.jpg",
    imagemcostas: "https://cdn.awsli.com.br/2500x2500/777/777259/produto/190866016/6b8990017d.jpg",
  },
  // {
  //   nome: "",
  //   categoria: "",
  //   preco: 0,
  //   quantidade: 0,
  //   tamanho: ["P", "M", "G", "GG"],
  //   imagemfrente: "",
  //   imagemcostas: "",
  // },
];

// está comentado porque se nao fica aumentando a quantidade depois da compra

if (!localStorage.getItem("produtos")) {
  console.log("Sem produtos adicionados, adicionando....");

  localStorage.setItem("produtos", JSON.stringify(produtos));
}
