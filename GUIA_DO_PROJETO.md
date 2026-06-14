# Guia do Projeto

Este guia ajuda estudantes e professores a encontrar rapidamente onde modificar textos, cores, imagens, equipamentos, cálculos e partes visuais do site **Luz do Campo**. Ele foi feito para orientar alterações simples no projeto sem misturar HTML, CSS e JavaScript.

## Estrutura dos Arquivos

### `index.html`

Guarda a estrutura da página. Nele ficam o cabeçalho, o menu, as seções do site, os textos principais, o formulário da calculadora, a área de autossuficiência, as dicas, a seção sobre, as imagens, os ícones e o rodapé.

É o arquivo certo para alterar textos visíveis, links do menu, títulos das seções, campos do formulário e caminhos das imagens.

### `style.css`

Guarda a aparência do site. Nele ficam as cores, fontes, tamanhos, espaçamentos, layout responsivo, cards, botões, cabeçalho, hero, calculadora, tabelas, dicas e seções.

É o arquivo certo para alterar visual, paleta de cores, sombras, bordas, largura de colunas e comportamento no celular.

### `script.js`

Guarda os comportamentos interativos. Nele ficam o menu mobile, cadastro de equipamentos, cálculo de consumo, edição, remoção, localStorage, lista de equipamentos predefinidos e estimativas de painéis solares, baterias e gerador.

É o arquivo certo para alterar equipamentos, validações, mensagens, cálculo e atualização automática dos resultados.

### `README.md`

Apresenta o projeto para o GitHub. Nele ficam o objetivo, a descrição, as funcionalidades, as tecnologias usadas, a relação com o Agrinho e instruções de uso.

### `img/`

Guarda imagens e ícones locais usados no site. No projeto atual, os ícones ficam diretamente em `img/`, como:

- `luz-do-campo.svg`
- `calculator.svg`
- `solar-panel.svg`
- `battery.svg`
- `generator.svg`
- `lightbulb.svg`
- `water-saving.svg`
- `plug.svg`
- `list-check.svg`
- `info.svg`
- `home-energy.svg`

## Onde Alterar

### Mudar Cores do Site

As cores principais ficam no início do `style.css`, dentro do bloco `:root`.

Variáveis reais do projeto:

- `--amarelo`
- `--azul`
- `--azul-escuro`
- `--verde`
- `--texto`
- `--muted`
- `--fundo`
- `--branco`
- `--linha`
- `--sombra`
- `--sombra-leve`

Para mudar a identidade visual, altere preferencialmente essas variáveis. Assim, a mudança se espalha pelo site sem precisar editar várias partes do CSS.

Exemplo:

```css
:root {
  --verde: #3fa34d;
  --amarelo: #ffce32;
  --azul: #1d63ff;
}
```

### Mudar Nome, Slogan e Textos da Página

Os textos principais ficam no `index.html`.

Use `Ctrl + F` para procurar textos como:

- `Luz do Campo`
- `Energia consciente para um futuro sustentável`
- `Acessar calculadora`
- `Calcule o consumo da sua casa`
- `Alternativas para autossuficiência`
- `Hábitos simples ajudam a economizar`
- `Educação, tecnologia e sustentabilidade`

As frases temáticas do Agrinho também podem ser encontradas com `Ctrl + F`:

- `Agro forte, futuro sustentável`
- `equilíbrio entre produção e meio ambiente`
- `Energia consciente para um futuro sustentável`

Essas frases aparecem principalmente na seção inicial, na seção Sobre e no `README.md`.

Se quiser trocar o nome do projeto, altere também:

- o `<title>` no início do `index.html`;
- o texto da marca no cabeçalho;
- o título principal da hero;
- o texto do rodapé;
- o `README.md`.

### Mudar Logo e Ícones

As imagens e ícones usados na página ficam no `index.html`, em tags `<img>`.

Os arquivos ficam na pasta:

```text
img/
```

Para trocar uma imagem:

1. coloque o novo arquivo dentro da pasta `img/`;
2. procure no `index.html` o atributo `src`;
3. troque o caminho para o novo arquivo;
4. mantenha o `alt` descritivo quando a imagem transmitir informação.

Exemplo:

```html
<img src="img/luz-do-campo.svg" alt="Casa do campo com sol, painel solar, folha e símbolo de energia.">
```

### Mudar Menu de Navegação

O menu fica no `index.html`, dentro do cabeçalho, na lista com `id="menu-principal"`.

Links reais do projeto:

- `#inicio`
- `#calculadora`
- `#autossuficiencia`
- `#dicas`
- `#sobre`

Esses links apontam para seções que possuem o mesmo `id`. Por exemplo:

```html
<a href="#calculadora">Calculadora</a>
```

leva até:

```html
<section class="secao calculadora" id="calculadora">
```

Se criar uma nova seção, crie também um novo link no menu.

### Mudar Equipamentos Predefinidos

A lista de equipamentos fica no `script.js`, no array:

```js
const equipamentosPredefinidos = [
  ...
];
```

Cada equipamento é um objeto com esta estrutura:

```js
{ id: "chuveiro", nome: "Chuveiro elétrico", potencia: 5500, horas: 0, minutos: 30, dias: 30 }
```

Você pode alterar:

- `nome`: nome exibido no seletor;
- `potencia`: potência em watts;
- `horas`: horas de uso por dia;
- `minutos`: minutos de uso por dia;
- `dias`: dias de uso no mês.

Não repita o mesmo `id` em dois equipamentos diferentes.

### Mudar Valor Padrão do kWh

O valor padrão do kWh aparece em dois lugares:

No `script.js`:

```js
const VALOR_KWH_PADRAO = 0.64;
```

No `index.html`, no campo:

```html
<input type="number" id="valor-kwh" name="valor-kwh" value="0.64">
```

Se trocar o valor padrão, altere os dois lugares para manter o formulário e o JavaScript alinhados.

Esse valor é apenas uma estimativa. O valor real pode variar conforme a conta de energia de cada família.

### Mudar Fórmula de Consumo

A fórmula principal fica no `script.js`, na função:

```js
calcularConsumoMensal(potenciaWatts, horas, minutos, diasUsoMes)
```

O projeto usa:

```text
consumo mensal em kWh = potência em watts × horas de uso por dia × dias de uso no mês ÷ 1000
```

Antes disso, horas e minutos são convertidos para horas decimais pela função:

```js
horasTotaisPorDia(horas, minutos)
```

Exemplo:

```text
0 horas e 30 minutos = 0,5 hora
1 hora e 15 minutos = 1,25 hora
```

Tenha cuidado ao alterar essa parte, pois ela afeta todos os cálculos da calculadora.

### Mudar Estimativa de Painéis Solares

Os campos ficam no `index.html`, na seção `#autossuficiencia`.

IDs reais dos campos:

- `horas-sol`
- `potencia-painel`
- `fator-eficiencia`

Resultados exibidos:

- `solar-kwp`
- `solar-paineis`
- `solar-producao`

As fórmulas ficam no `script.js`, dentro da função:

```js
atualizarAutossuficiencia()
```

Nessa função são calculados:

- `potenciaSolarNecessariaKwp`
- `quantidadePaineis`
- `producaoMensalEstimada`

### Mudar Estimativa de Baterias

Os campos ficam no `index.html`, na seção `#autossuficiencia`.

IDs reais dos campos:

- `dias-autonomia`
- `capacidade-bateria`
- `profundidade-descarga`

Resultados exibidos:

- `bateria-capacidade`
- `bateria-quantidade`
- `bateria-autonomia`

As fórmulas ficam no `script.js`, dentro da função:

```js
atualizarAutossuficiencia()
```

Nessa função são calculados:

- `capacidadeBateriaNecessariaKwh`
- `quantidadeBaterias`

### Mudar Estimativa de Gerador

Os campos ficam no `index.html`, na seção `#autossuficiencia`.

IDs reais dos campos:

- `litros-kwh`
- `preco-combustivel`
- `fator-simultaneidade`
- `margem-gerador`

Resultados exibidos:

- `gerador-litros`
- `gerador-custo`
- `gerador-potencia`

As fórmulas ficam no `script.js`, dentro da função:

```js
atualizarAutossuficiencia()
```

Nessa função são calculados:

- `litrosCombustivelMes`
- `custoCombustivelMes`
- `potenciaGeradorSugeridaKw`

### Mudar Dicas de Economia

As dicas ficam no `index.html`, na seção:

```html
<section class="secao dicas" id="dicas">
```

Cada dica está dentro de um card com a classe:

```html
<article class="card-dica">
```

Para alterar uma dica, edite o título `<h3>` e o texto `<p>` dentro do card. Os ícones das dicas também estão nessa mesma parte, usando arquivos da pasta `img/`.

### Adicionar Nova Seção ao Site

Para criar uma nova seção:

1. crie uma nova `section` no `index.html` com um `id`;
2. adicione um link no menu;
3. crie os estilos no `style.css`;
4. se precisar de interação, adicione uma função no `script.js`.

Exemplo de link no menu:

```html
<a href="#nova-secao">Nova seção</a>
```

Exemplo de seção:

```html
<section id="nova-secao" class="secao">
  <div class="cabecalho-secao">
    <p class="etiqueta">Novo tema</p>
    <h2>Título da nova seção</h2>
    <p>Texto da nova seção.</p>
  </div>
</section>
```

Depois, no `style.css`, crie ou reaproveite classes para organizar o visual.

## Mapa Rápido das Interações

Funções reais do `script.js`:

- Menu mobile: `alternarMenu()`.
- Salvar dados no localStorage: `salvarEquipamentos()`.
- Carregar dados do localStorage: `carregarEquipamentos()`.
- Criar id único: `criarId()`.
- Mostrar mensagens do formulário: `mostrarMensagem()`.
- Converter texto do campo em número: `obterNumero()`.
- Converter horas e minutos: `horasTotaisPorDia()`.
- Calcular consumo mensal: `calcularConsumoMensal()`.
- Validar campos: `validarCampos()`.
- Preencher seletor de equipamentos: `preencherOpcoesPredefinidas()`.
- Preencher formulário com equipamento predefinido: `preencherEquipamentoPredefinido()`.
- Limpar formulário: `limparFormulario()`.
- Ler dados do formulário: `obterDadosFormulario()`.
- Adicionar ou salvar edição de equipamento: `adicionarOuEditarEquipamento()`.
- Editar equipamento já cadastrado: `editarEquipamento(id)`.
- Remover equipamento: `removerEquipamento(id)`.
- Limpar lista de equipamentos: `limparEquipamentos()`.
- Formatar tempo de uso: `formatarTempo()`.
- Criar botões de ação da tabela: `criarBotaoAcao()`.
- Criar linha da tabela: `criarLinhaEquipamento()`.
- Calcular totais da residência: `calcularTotais()`.
- Atualizar a tela: `atualizarTela()`.
- Ler valores das estimativas de autossuficiência: `obterValorAutossuficiencia()`.
- Atualizar painéis solares, baterias e gerador: `atualizarAutossuficiencia()`.
- Formatar número: `formatarNumero()`.
- Formatar moeda: `formatarMoeda()`.
- Ajustar dados antigos salvos: `normalizarEquipamentoSalvo()`.

Eventos importantes no final do `script.js`:

- envio do formulário chama `adicionarOuEditarEquipamento`;
- mudança no seletor chama `preencherEquipamentoPredefinido`;
- botão de limpar formulário chama `limparFormulario`;
- botão de limpar lista chama `limparEquipamentos`;
- clique no menu mobile chama `alternarMenu`;
- campos da autossuficiência chamam `atualizarAutossuficiencia`;
- botões da tabela chamam `editarEquipamento` ou `removerEquipamento`.

