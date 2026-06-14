# Luz do Campo

Projeto desenvolvido para o **Concurso Agrinho 2026**, na categoria **Programação**, Subcategoria 3: **Programação Front-End com HTML, CSS e JavaScript**.

## Tema

**Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente.**

## Slogan

**Energia consciente para um futuro sustentável.**

## Sobre o projeto

O **Luz do Campo** é um site educativo criado para ajudar estudantes, famílias e comunidades a entenderem melhor o consumo de energia elétrica no dia a dia.

A proposta do projeto é mostrar, de forma simples, como os equipamentos usados em casa influenciam no consumo mensal de energia. Para isso, o site permite cadastrar aparelhos, calcular o consumo aproximado em kWh e estimar o valor da conta com base no preço informado pelo usuário.

Além da calculadora, o projeto também apresenta uma simulação educativa sobre alternativas de autossuficiência energética, como painéis solares, baterias e gerador emergencial.

## Objetivo

O objetivo do projeto é incentivar o uso consciente da energia elétrica, mostrando como a tecnologia pode ajudar no planejamento familiar, na economia de recursos e na reflexão sobre sustentabilidade.

## Funcionalidades

O site possui:

* calculadora de consumo de energia elétrica;
* lista de equipamentos predefinidos;
* cadastro de equipamentos personalizados;
* cálculo de consumo mensal em kWh;
* estimativa de custo mensal;
* edição e remoção de equipamentos;
* salvamento dos dados no navegador;
* estimativa de painéis solares;
* estimativa de baterias;
* estimativa de gerador emergencial;
* dicas de economia de energia;
* layout responsivo para celular, tablet e computador.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript

O projeto foi desenvolvido com tecnologias básicas de front-end, sem uso de frameworks, bibliotecas externas ou CDN.

O recurso `localStorage` foi utilizado para salvar os equipamentos cadastrados no próprio navegador do usuário. Esse recurso é nativo do navegador e não depende de biblioteca externa.

## Estrutura de arquivos

```text
/
├── index.html
├── style.css
├── script.js
├── README.md
├── GUIA_DO_PROJETO.md
└── img/
    ├── luz-do-campo.svg
    ├── calculator.svg
    ├── solar-panel.svg
    ├── battery.svg
    ├── generator.svg
    ├── home-energy.svg
    ├── info.svg
    ├── lightbulb.svg
    ├── list-check.svg
    ├── plug.svg
    └── water-saving.svg
```

## Como executar o projeto

Para abrir o projeto localmente:

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto.
3. Abra o arquivo `index.html` em um navegador.

O site também pode ser publicado no GitHub Pages, pois não precisa de servidor, banco de dados ou instalação de pacotes.

## Como funciona o cálculo

O usuário informa a potência do equipamento, o tempo médio de uso por dia, a quantidade de dias de uso no mês e o valor do kWh.

O consumo mensal é calculado pela fórmula:

```text
consumoMensalKwh = (potenciaWatts * horasDeUsoPorDia * diasDeUsoNoMes) / 1000
```

Depois, o custo mensal estimado é calculado assim:

```text
custoMensal = consumoMensalKwh * valorKwh
```

O valor do kWh pode ser alterado pelo usuário, pois varia conforme a distribuidora, o tipo de tarifa, impostos, bandeiras tarifárias e informações da conta de energia.

## Autossuficiência energética

A seção de autossuficiência energética apresenta estimativas educativas sobre:

* quantidade aproximada de painéis solares;
* produção mensal estimada;
* capacidade de baterias;
* quantidade aproximada de módulos de bateria;
* potência sugerida para gerador emergencial.

Esses resultados são apenas simulações educativas. Para uma instalação real, é necessário procurar orientação técnica especializada.

## Acessibilidade

O projeto foi desenvolvido buscando facilitar a navegação e a leitura. Para isso, foram utilizados:

* estrutura semântica em HTML;
* textos alternativos em imagens informativas;
* botões com nomes claros;
* contraste entre texto e fundo;
* layout adaptado para diferentes tamanhos de tela;
* navegação organizada por seções.

## Relação com o Agrinho 2026

O projeto se relaciona com o tema do Agrinho 2026 ao tratar do uso consciente da energia e da importância do equilíbrio entre produção, tecnologia e meio ambiente.

No campo ou na cidade, entender o consumo de energia ajuda as famílias a planejarem melhor seus gastos, evitarem desperdícios e refletirem sobre alternativas mais sustentáveis.

O projeto também considera que diferentes realidades podem ter diferentes tarifas de energia, como ocorre em algumas áreas rurais. Por isso, o valor do kWh é editável e deve ser ajustado conforme a conta de energia de cada usuário.

## Conceitos de programação utilizados

Durante o desenvolvimento do projeto, foram aplicados conceitos como:

* estruturação de páginas com HTML;
* estilização com CSS externo;
* responsividade;
* manipulação do DOM;
* funções em JavaScript;
* arrays e objetos;
* eventos;
* validação de campos;
* armazenamento local com `localStorage`;
* atualização dinâmica de resultados;
* organização do código em arquivos separados.

## Autoria

* Estudante: Daniel Alves Mendes Filho
* Professor orientador: Henrique da Silva Lima
* Escola: Colégio Estadual do Campo Antônio Paulo Lopes
* Município: Paranaguá - PR

## Créditos

As imagens e ícones utilizados no projeto estão na pasta `img/` e foram organizados para uso educacional no contexto do Concurso Agrinho 2026.

O projeto contou com apoio de ferramentas digitais durante o planejamento, organização dos textos, criação de ideias visuais e revisão do código. As sugestões foram analisadas, adaptadas e revisadas antes de serem incluídas na versão final.

## Uso de ferramentas de apoio

Durante o desenvolvimento, foram utilizadas ferramentas de inteligência artificial como apoio para organizar ideias, revisar textos, planejar a identidade visual e auxiliar na estruturação do código.

O uso dessas ferramentas não substituiu a construção do projeto. As decisões finais, adaptações e revisões foram feitas durante o desenvolvimento, respeitando o objetivo educacional do Concurso Agrinho 2026.

## Prompts utilizados

Alguns comandos usados durante o processo de criação foram:

### Identidade visual

```text
Crie uma logo educativa para o projeto Luz do Campo, com uma casa do campo, sol, painel solar, folha, bateria e símbolo de energia. Usar estilo vetorial limpo, cores azul, amarelo e verde, fundo transparente, aparência moderna e sustentável, relacionada ao tema Agro forte, futuro sustentável.
```

### Ícones do site

```text
Crie ícones simples em estilo vetorial para um site educativo sobre consumo de energia, sustentabilidade e autossuficiência energética. Usar cores azul, amarelo e verde, traços limpos e aparência amigável para estudantes.
```

### Revisão dos textos

```text
Revise os textos do projeto Luz do Campo, mantendo linguagem simples, educativa e adequada para estudantes, sem alterar o sentido principal.
```

## Tags

* agrinho
* programação
* front-end
* html
* css
* javascript
* sustentabilidade
* energia
* campo
* educação
* tecnologia
* meio ambiente

## Licença

Projeto desenvolvido para fins educacionais e para participação no Concurso Agrinho 2026.

## Considerações finais

O **Luz do Campo** mostra como a programação pode ser usada para criar uma ferramenta simples, útil e educativa.

A proposta busca aproximar tecnologia, sustentabilidade e planejamento familiar, incentivando escolhas mais conscientes no uso da energia elétrica e reforçando a importância do equilíbrio entre produção e meio ambiente.
