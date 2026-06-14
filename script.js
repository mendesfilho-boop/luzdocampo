const STORAGE_KEY = "luz-do-campo-equipamentos";
const STORAGE_KEY_ANTIGA = ["auto", "energia-equipamentos"].join("");
const VALOR_KWH_PADRAO = 0.64;

const equipamentosPredefinidos = [
  { id: "chuveiro", nome: "Chuveiro elétrico", potencia: 5500, horas: 0, minutos: 30, dias: 30 },
  { id: "geladeira", nome: "Geladeira", potencia: 150, horas: 24, minutos: 0, dias: 30 },
  { id: "televisao", nome: "Televisão LED", potencia: 100, horas: 4, minutos: 0, dias: 30 },
  { id: "ventilador", nome: "Ventilador", potencia: 60, horas: 8, minutos: 0, dias: 30 },
  { id: "ar-condicionado", nome: "Ar-condicionado", potencia: 1200, horas: 8, minutos: 0, dias: 20 },
  { id: "lampada", nome: "Lâmpada LED", potencia: 10, horas: 5, minutos: 0, dias: 30 },
  { id: "maquina-lavar", nome: "Máquina de lavar", potencia: 500, horas: 1, minutos: 0, dias: 12 },
  { id: "micro-ondas", nome: "Micro-ondas", potencia: 1200, horas: 0, minutos: 15, dias: 20 },
  { id: "ferro", nome: "Ferro elétrico", potencia: 1000, horas: 0, minutos: 30, dias: 8 },
  { id: "notebook", nome: "Notebook", potencia: 65, horas: 6, minutos: 0, dias: 30 },
  { id: "desktop", nome: "Computador desktop", potencia: 250, horas: 5, minutos: 0, dias: 30 },
  { id: "roteador", nome: "Roteador Wi-Fi", potencia: 10, horas: 24, minutos: 0, dias: 30 },
  { id: "carregador", nome: "Carregador de celular", potencia: 10, horas: 3, minutos: 0, dias: 30 },
  { id: "freezer", nome: "Freezer", potencia: 200, horas: 24, minutos: 0, dias: 30 },
  { id: "personalizado", nome: "Equipamento personalizado", potencia: "", horas: "", minutos: "", dias: "" }
];

const form = document.querySelector("#form-equipamento");
const seletorPredefinido = document.querySelector("#equipamento-predefinido");
const nomeInput = document.querySelector("#nome");
const potenciaInput = document.querySelector("#potencia");
const horasInput = document.querySelector("#horas");
const minutosInput = document.querySelector("#minutos");
const diasInput = document.querySelector("#dias");
const valorKwhInput = document.querySelector("#valor-kwh");
const mensagemForm = document.querySelector("#mensagem-form");
const listaEquipamentos = document.querySelector("#lista-equipamentos");
const listaVazia = document.querySelector("#lista-vazia");
const totalKwh = document.querySelector("#total-kwh");
const mediaDiaria = document.querySelector("#media-diaria");
const totalCusto = document.querySelector("#total-custo");
const autoTotalMensal = document.querySelector("#auto-total-mensal");
const autoMediaDiaria = document.querySelector("#auto-media-diaria");
const quantidadeItens = document.querySelector("#quantidade-itens");
const limparTudo = document.querySelector("#limpar-tudo");
const limparFormularioBotao = document.querySelector("#limpar-formulario");
const botaoSalvar = document.querySelector("#botao-salvar");
const menuBotao = document.querySelector(".menu-botao");
const menu = document.querySelector("#menu-principal");

const camposAutossuficiencia = {
  horasSol: document.querySelector("#horas-sol"),
  potenciaPainel: document.querySelector("#potencia-painel"),
  fatorEficiencia: document.querySelector("#fator-eficiencia"),
  diasAutonomia: document.querySelector("#dias-autonomia"),
  capacidadeBateria: document.querySelector("#capacidade-bateria"),
  profundidadeDescarga: document.querySelector("#profundidade-descarga"),
  litrosKwh: document.querySelector("#litros-kwh"),
  precoCombustivel: document.querySelector("#preco-combustivel"),
  fatorSimultaneidade: document.querySelector("#fator-simultaneidade"),
  margemGerador: document.querySelector("#margem-gerador")
};

const saidasAutossuficiencia = {
  solarKwp: document.querySelector("#solar-kwp"),
  solarPaineis: document.querySelector("#solar-paineis"),
  solarProducao: document.querySelector("#solar-producao"),
  bateriaCapacidade: document.querySelector("#bateria-capacidade"),
  bateriaQuantidade: document.querySelector("#bateria-quantidade"),
  bateriaAutonomia: document.querySelector("#bateria-autonomia"),
  geradorLitros: document.querySelector("#gerador-litros"),
  geradorCusto: document.querySelector("#gerador-custo"),
  geradorPotencia: document.querySelector("#gerador-potencia")
};

let equipamentos = [];
let equipamentoEditandoId = null;

function formatarNumero(valor, casas = 2) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function mostrarMensagem(texto, tipo = "sucesso") {
  mensagemForm.textContent = texto;
  mensagemForm.classList.toggle("erro", tipo === "erro");
}

function obterNumero(input) {
  return Number(String(input.value).replace(",", "."));
}

function criarId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function horasTotaisPorDia(horas, minutos) {
  return horas + (minutos / 60);
}

function calcularConsumoMensal(potenciaWatts, horas, minutos, diasUsoMes) {
  return (potenciaWatts * horasTotaisPorDia(horas, minutos) * diasUsoMes) / 1000;
}

function salvarEquipamentos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(equipamentos));
}

function carregarEquipamentos() {
  let dadosSalvos = localStorage.getItem(STORAGE_KEY);

  if (!dadosSalvos) {
    const dadosAntigos = localStorage.getItem(STORAGE_KEY_ANTIGA);

    if (dadosAntigos) {
      localStorage.setItem(STORAGE_KEY, dadosAntigos);
      localStorage.removeItem(STORAGE_KEY_ANTIGA);
      dadosSalvos = dadosAntigos;
    }
  }

  if (!dadosSalvos) {
    return;
  }

  try {
    const dados = JSON.parse(dadosSalvos);
    equipamentos = Array.isArray(dados) ? dados.map(normalizarEquipamentoSalvo) : [];
  } catch (erro) {
    equipamentos = [];
    localStorage.removeItem(STORAGE_KEY);
  }
}

function normalizarEquipamentoSalvo(equipamento) {
  const horas = Number(equipamento.horas) || 0;
  const minutos = Number(equipamento.minutos) || 0;
  const potencia = Number(equipamento.potencia) || 0;
  const dias = Number(equipamento.dias) || 1;
  const valorKwh = Number(equipamento.valorKwh) || VALOR_KWH_PADRAO;
  const consumo = calcularConsumoMensal(potencia, horas, minutos, dias);

  return {
    id: equipamento.id || criarId(),
    nome: equipamento.nome || "Equipamento",
    potencia,
    horas,
    minutos,
    dias,
    valorKwh,
    consumo,
    custo: consumo * valorKwh
  };
}

function validarCampos(nome, potencia, horas, minutos, dias, valorKwh) {
  if (!nome.trim()) {
    return "Informe o nome do equipamento.";
  }

  if (!Number.isFinite(potencia) || potencia <= 0) {
    return "Informe uma potência válida maior que zero.";
  }

  if (!Number.isFinite(horas) || horas < 0 || horas > 24) {
    return "Informe horas de uso entre 0 e 24.";
  }

  if (!Number.isFinite(minutos) || minutos < 0 || minutos > 59) {
    return "Informe minutos de uso entre 0 e 59.";
  }

  if (horas === 0 && minutos === 0) {
    return "Informe pelo menos alguns minutos de uso por dia.";
  }

  if (horas === 24 && minutos > 0) {
    return "Para uso de 24 horas por dia, deixe os minutos em 0.";
  }

  if (!Number.isFinite(dias) || dias < 1 || dias > 31) {
    return "Informe dias de uso entre 1 e 31.";
  }

  if (!Number.isFinite(valorKwh) || valorKwh <= 0) {
    return "Informe um valor de kWh válido maior que zero.";
  }

  return "";
}

function preencherOpcoesPredefinidas() {
  equipamentosPredefinidos.forEach((equipamento) => {
    const option = document.createElement("option");
    option.value = equipamento.id;
    option.textContent = equipamento.nome;
    seletorPredefinido.appendChild(option);
  });
}

function preencherEquipamentoPredefinido() {
  const equipamento = equipamentosPredefinidos.find((item) => item.id === seletorPredefinido.value);

  if (!equipamento) {
    return;
  }

  nomeInput.value = equipamento.nome === "Equipamento personalizado" ? "" : equipamento.nome;
  potenciaInput.value = equipamento.potencia;
  horasInput.value = equipamento.horas;
  minutosInput.value = equipamento.minutos;
  diasInput.value = equipamento.dias;
  mostrarMensagem("Você pode ajustar os valores antes de adicionar.");
}

function limparFormulario() {
  form.reset();
  valorKwhInput.value = VALOR_KWH_PADRAO;
  equipamentoEditandoId = null;
  botaoSalvar.textContent = "Adicionar equipamento";
  mostrarMensagem("");
}

function obterDadosFormulario() {
  const nome = nomeInput.value.trim();
  const potencia = obterNumero(potenciaInput);
  const horas = Math.floor(obterNumero(horasInput));
  const minutos = Math.floor(obterNumero(minutosInput));
  const dias = Math.floor(obterNumero(diasInput));
  const valorKwh = obterNumero(valorKwhInput);
  const erro = validarCampos(nome, potencia, horas, minutos, dias, valorKwh);

  if (erro) {
    mostrarMensagem(erro, "erro");
    return null;
  }

  const consumo = calcularConsumoMensal(potencia, horas, minutos, dias);

  return {
    nome,
    potencia,
    horas,
    minutos,
    dias,
    valorKwh,
    consumo,
    custo: consumo * valorKwh
  };
}

function adicionarOuEditarEquipamento(evento) {
  evento.preventDefault();

  const dados = obterDadosFormulario();

  if (!dados) {
    return;
  }

  let mensagemSucesso = "Equipamento adicionado com sucesso.";

  if (equipamentoEditandoId) {
    equipamentos = equipamentos.map((equipamento) => (
      equipamento.id === equipamentoEditandoId ? { ...dados, id: equipamentoEditandoId } : equipamento
    ));
    mensagemSucesso = "Equipamento atualizado com sucesso.";
  } else {
    equipamentos.push({ ...dados, id: criarId() });
  }

  salvarEquipamentos();
  atualizarTela();
  limparFormulario();
  mostrarMensagem(mensagemSucesso);
  nomeInput.focus();
}

function editarEquipamento(id) {
  const equipamento = equipamentos.find((item) => item.id === id);

  if (!equipamento) {
    mostrarMensagem("Não foi possível encontrar esse equipamento.", "erro");
    return;
  }

  equipamentoEditandoId = id;
  seletorPredefinido.value = "";
  nomeInput.value = equipamento.nome;
  potenciaInput.value = equipamento.potencia;
  horasInput.value = equipamento.horas;
  minutosInput.value = equipamento.minutos;
  diasInput.value = equipamento.dias;
  valorKwhInput.value = equipamento.valorKwh;
  botaoSalvar.textContent = "Salvar alterações";
  mostrarMensagem("Edite os dados e salve as alterações.");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function removerEquipamento(id) {
  equipamentos = equipamentos.filter((equipamento) => equipamento.id !== id);
  salvarEquipamentos();
  atualizarTela();

  if (equipamentoEditandoId === id) {
    limparFormulario();
  }

  mostrarMensagem("Equipamento removido da lista.");
}

function limparEquipamentos() {
  if (equipamentos.length === 0) {
    mostrarMensagem("A lista já está vazia.");
    return;
  }

  equipamentos = [];
  salvarEquipamentos();
  atualizarTela();
  limparFormulario();
  mostrarMensagem("Todos os equipamentos foram removidos.");
}

function formatarTempo(horas, minutos) {
  const partes = [];

  if (horas > 0) {
    partes.push(`${horas} h`);
  }

  if (minutos > 0) {
    partes.push(`${minutos} min`);
  }

  return partes.length ? partes.join(" ") : "0 min";
}

function criarBotaoAcao(texto, classe, id) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = classe;
  botao.textContent = texto;
  botao.dataset.id = id;
  return botao;
}

function criarLinhaEquipamento(equipamento) {
  const linha = document.createElement("tr");

  const nome = document.createElement("td");
  nome.textContent = equipamento.nome;

  const potencia = document.createElement("td");
  potencia.textContent = `${formatarNumero(equipamento.potencia)} W`;

  const uso = document.createElement("td");
  uso.textContent = formatarTempo(equipamento.horas, equipamento.minutos);

  const dias = document.createElement("td");
  dias.textContent = `${equipamento.dias} dias`;

  const consumo = document.createElement("td");
  consumo.textContent = `${formatarNumero(equipamento.consumo)} kWh`;

  const custo = document.createElement("td");
  custo.textContent = formatarMoeda(equipamento.custo);

  const acao = document.createElement("td");
  acao.className = "acoes-tabela";
  acao.append(
    criarBotaoAcao("Editar", "editar", equipamento.id),
    criarBotaoAcao("Remover", "remover", equipamento.id)
  );

  linha.append(nome, potencia, uso, dias, consumo, custo, acao);
  return linha;
}

function calcularTotais() {
  const consumoTotal = equipamentos.reduce((total, item) => total + item.consumo, 0);
  const custoTotal = equipamentos.reduce((total, item) => total + item.custo, 0);
  const potenciaTotalWatts = equipamentos.reduce((total, item) => total + item.potencia, 0);

  return {
    consumoTotal,
    custoTotal,
    consumoDiario: consumoTotal / 30,
    potenciaTotalWatts
  };
}

function atualizarTela() {
  listaEquipamentos.innerHTML = "";

  equipamentos.forEach((equipamento) => {
    listaEquipamentos.appendChild(criarLinhaEquipamento(equipamento));
  });

  const totais = calcularTotais();
  const textoItens = equipamentos.length === 1 ? "1 item" : `${equipamentos.length} itens`;

  totalKwh.textContent = `${formatarNumero(totais.consumoTotal)} kWh`;
  mediaDiaria.textContent = `${formatarNumero(totais.consumoDiario)} kWh`;
  totalCusto.textContent = formatarMoeda(totais.custoTotal);
  quantidadeItens.textContent = textoItens;
  listaVazia.classList.toggle("oculto", equipamentos.length > 0);
  atualizarAutossuficiencia();
}

function obterValorAutossuficiencia(campo, fallback) {
  const valor = obterNumero(campo);
  return Number.isFinite(valor) && valor > 0 ? valor : fallback;
}

function atualizarAutossuficiencia() {
  const totais = calcularTotais();
  const consumoMensalTotalKwh = totais.consumoTotal;
  const consumoDiarioKwh = totais.consumoDiario;

  const horasSolPleno = obterValorAutossuficiencia(camposAutossuficiencia.horasSol, 4.5);
  const potenciaPainelWatts = obterValorAutossuficiencia(camposAutossuficiencia.potenciaPainel, 550);
  const fatorEficiencia = obterValorAutossuficiencia(camposAutossuficiencia.fatorEficiencia, 0.75);
  const diasAutonomia = obterValorAutossuficiencia(camposAutossuficiencia.diasAutonomia, 1);
  const capacidadeModuloBateriaKwh = obterValorAutossuficiencia(camposAutossuficiencia.capacidadeBateria, 5);
  const profundidadeDescarga = obterValorAutossuficiencia(camposAutossuficiencia.profundidadeDescarga, 0.8);
  const litrosPorKwh = obterValorAutossuficiencia(camposAutossuficiencia.litrosKwh, 0.35);
  const precoCombustivel = obterValorAutossuficiencia(camposAutossuficiencia.precoCombustivel, 6);
  const fatorSimultaneidade = obterValorAutossuficiencia(camposAutossuficiencia.fatorSimultaneidade, 0.6);
  const margemSeguranca = obterValorAutossuficiencia(camposAutossuficiencia.margemGerador, 1.25);

  const potenciaSolarNecessariaKwp = consumoMensalTotalKwh > 0
    ? consumoMensalTotalKwh / (30 * horasSolPleno * fatorEficiencia)
    : 0;
  const quantidadePaineis = potenciaSolarNecessariaKwp > 0
    ? Math.ceil((potenciaSolarNecessariaKwp * 1000) / potenciaPainelWatts)
    : 0;
  const producaoMensalEstimada = quantidadePaineis * (potenciaPainelWatts / 1000) * horasSolPleno * fatorEficiencia * 30;

  const capacidadeBateriaNecessariaKwh = profundidadeDescarga > 0
    ? (consumoDiarioKwh * diasAutonomia) / profundidadeDescarga
    : 0;
  const quantidadeBaterias = capacidadeBateriaNecessariaKwh > 0
    ? Math.ceil(capacidadeBateriaNecessariaKwh / capacidadeModuloBateriaKwh)
    : 0;

  const litrosCombustivelMes = consumoMensalTotalKwh * litrosPorKwh;
  const custoCombustivelMes = litrosCombustivelMes * precoCombustivel;
  const potenciaTotalEquipamentosKw = totais.potenciaTotalWatts / 1000;
  const potenciaGeradorSugeridaKw = potenciaTotalEquipamentosKw * fatorSimultaneidade * margemSeguranca;

  autoTotalMensal.textContent = `${formatarNumero(consumoMensalTotalKwh)} kWh`;
  autoMediaDiaria.textContent = `${formatarNumero(consumoDiarioKwh)} kWh`;
  saidasAutossuficiencia.solarKwp.textContent = `${formatarNumero(potenciaSolarNecessariaKwp)} kWp`;
  saidasAutossuficiencia.solarPaineis.textContent = `${quantidadePaineis} ${quantidadePaineis === 1 ? "painel" : "painéis"}`;
  saidasAutossuficiencia.solarProducao.textContent = `${formatarNumero(producaoMensalEstimada)} kWh`;
  saidasAutossuficiencia.bateriaCapacidade.textContent = `${formatarNumero(capacidadeBateriaNecessariaKwh)} kWh`;
  saidasAutossuficiencia.bateriaQuantidade.textContent = `${quantidadeBaterias} ${quantidadeBaterias === 1 ? "módulo" : "módulos"}`;
  saidasAutossuficiencia.bateriaAutonomia.textContent = `${formatarNumero(diasAutonomia, 1)} ${diasAutonomia === 1 ? "dia" : "dias"}`;
  saidasAutossuficiencia.geradorLitros.textContent = `${formatarNumero(litrosCombustivelMes)} L`;
  saidasAutossuficiencia.geradorCusto.textContent = formatarMoeda(custoCombustivelMes);
  saidasAutossuficiencia.geradorPotencia.textContent = `${formatarNumero(potenciaGeradorSugeridaKw)} kW`;
}

function alternarMenu() {
  const aberto = menu.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", String(aberto));
}

form.addEventListener("submit", adicionarOuEditarEquipamento);
seletorPredefinido.addEventListener("change", preencherEquipamentoPredefinido);
limparFormularioBotao.addEventListener("click", limparFormulario);
limparTudo.addEventListener("click", limparEquipamentos);
menuBotao.addEventListener("click", alternarMenu);

Object.values(camposAutossuficiencia).forEach((campo) => {
  campo.addEventListener("input", atualizarAutossuficiencia);
});

listaEquipamentos.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remover")) {
    removerEquipamento(evento.target.dataset.id);
  }

  if (evento.target.classList.contains("editar")) {
    editarEquipamento(evento.target.dataset.id);
  }
});

menu.addEventListener("click", (evento) => {
  if (evento.target.tagName === "A") {
    menu.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
  }
});

preencherOpcoesPredefinidas();
carregarEquipamentos();
valorKwhInput.value = valorKwhInput.value || VALOR_KWH_PADRAO;
atualizarTela();
