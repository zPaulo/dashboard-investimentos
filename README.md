### Dashboard de Análise de Desempenho de Ativos e Fundos de Renda Fixa

## Visão Geral do Projeto

Este projeto foi desenvolvido como um trabalho para a disciplina de **Mercado de Capitais** no curso de Ciências Econômicas na Universidade Federal Rural de Pernambuco. O objetivo do projeto é criar um **Dashboard de Análise de Desempenho de Ativos** que compara a evolução percentual de diversos ativos do mercado financeiro em relação a um fundo de renda fixa específico, o **Western Asset**. A análise visa identificar um **posicionamento seguro e estratégico** para investidores que buscam retornos superiores ao CDI com risco controlado, investindo em ativos de empresas consolidadas e big-techs.

## Motivação

O mercado de capitais oferece diversas opções de investimentos que variam em termos de risco, liquidez e retorno. A escolha de uma carteira de investimentos eficiente envolve a diversificação entre diferentes tipos de ativos, equilibrando segurança e rentabilidade. Neste projeto, o foco está em comparar a performance de ativos de **empresas consolidadas**, **big-techs** e **fintechs** com um fundo de renda fixa, buscando entender se a combinação desses ativos pode proporcionar um retorno superior ao CDI, o principal índice de referência para investimentos de renda fixa no Brasil.

## Descrição do Projeto

O **Dashboard de Análise de Desempenho de Investimentos** é uma aplicação web interativa que permite ao usuário selecionar diferentes ativos e visualizar sua evolução percentual ao longo do tempo. A comparação é feita em relação ao fundo de renda fixa **Western Asset**, que serve como referência de um investimento conservador. O projeto utiliza bibliotecas populares como **Chart.js** para a criação dos gráficos e **Select2** para uma interface moderna de seleção de ativos.

### Principais Funcionalidades

- **Seleção de Ativos**: O usuário pode selecionar entre vários ativos como Apple (AAPL), Meta (META), NVIDIA (NVDA), Coca-Cola (KO), Nubank (NU), Bitcoin, Ouro, entre outros.
- **Visualização Gráfica**: O desempenho de cada ativo selecionado é exibido em um gráfico de linha, comparando a variação percentual acumulada desde o início do período selecionado.
- **Comparação com Fundo de Renda Fixa**: O fundo de renda fixa **Western Asset** é utilizado como benchmark para comparação. O desempenho do fundo é exibido junto com os ativos selecionados para facilitar a análise.
- **Cálculo da Variação Acumulada**: Uma seção adicional mostra a variação acumulada dos ativos selecionados em comparação com o CDI, oferecendo uma visão clara da performance relativa.

## Metodologia de Análise

Para este projeto, foram utilizados dados históricos de preços de ativos financeiros e o rendimento do fundo de renda fixa **Western Asset**. A análise foi feita considerando o seguinte:

- **Período de Análise**: Os dados foram coletados a partir de outubro de 2023 até a data atual.
- **Ativos Analisados**: AAPL, META, NVDA, KO, NU, Bitcoin, Ouro, e o fundo de renda fixa Western Asset.
- **Comparação de Performance**: Os ativos foram comparados com o desempenho do CDI. Enquanto o CDI apresentou um rendimento de **11,77%**, a média de rendimento da carteira de ativos selecionada foi de **72,15%**.
- **Cálculo de Rentabilidade**: A rentabilidade acumulada foi calculada a partir da variação percentual do preço dos ativos em relação ao seu valor no início do período analisado.

## Resultados

A análise mostrou que a combinação de ativos de **empresas consolidadas** (como Coca-Cola), **big-techs** (como Apple e Meta) e **fintechs** (como Nubank) resultou em um retorno médio de **72,15%**. Em comparação, o CDI rendeu **11,77%** no mesmo período. Isso demonstra que uma abordagem mais diversificada e com maior exposição a ativos de renda variável pode proporcionar retornos superiores ao CDI, embora com risco adicional.

## Ferramentas Utilizadas

- **Linguagens**: HTML, CSS, JavaScript
- **Bibliotecas**: 
  - **Chart.js**: para a criação de gráficos interativos.
  - **Select2**: para uma interface de seleção de múltiplos ativos mais amigável.
- **Frameworks e APIs**: 
  - **Chart.js Date Adapter**: para manipulação de datas no gráfico.
  - **jQuery**: para manipulação de DOM e integração com Select2.

## Como Executar o Projeto Localmente

1. Clone o repositório do projeto no seu ambiente local.
2. Navegue até a pasta do projeto e abra o arquivo `index.html` no seu navegador.
3. Para atualizar o gráfico, selecione os ativos desejados e clique no botão "Atualizar Gráfico".
4. A variação acumulada será exibida logo abaixo do gráfico, fornecendo uma visão clara do desempenho dos ativos selecionados em comparação com o CDI.

## Conclusão

Este projeto demonstra a importância de uma abordagem diversificada para investimentos, combinando ativos de alta performance e renda fixa para maximizar retornos. A ferramenta desenvolvida fornece uma análise visual clara e objetiva para ajudar investidores a tomar decisões mais informadas no mercado de capitais.

## Licença

Este projeto é de uso acadêmico e está disponível sob a licença MIT.

---

**Nota:** Este é um projeto acadêmico e, portanto, não deve ser considerado uma recomendação de investimento. Investidores devem fazer sua própria análise antes de tomar qualquer decisão de investimento.
