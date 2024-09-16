let chart;
let datasets = [];  // Variável global para armazenar datasets

// Função para buscar dados JSON do backend
async function fetchData() {
    try {
        const response = await fetch('static/data.json');  // Caminho atualizado para um arquivo JSON estático
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return [];
    }
}

// Função para calcular a variação percentual em relação ao primeiro valor
function calculatePercentageChange(data, stock) {
    const initialValue = data[0][stock]; // Primeiro valor do mês para o ativo

    return data.map(item => {
        const percentageChange = ((item[stock] - initialValue) / initialValue) * 100; // Cálculo da variação percentual
        return { x: item.Date, y: percentageChange };
    });
}

// Função para processar os dados e atualizar o gráfico
async function updateChart() {
    const data = await fetchData();
    let selectedStocks = Array.from(document.getElementById('stockSelect').selectedOptions).map(option => option.value);
    
    datasets = []; // Limpa os datasets antes de atualizá-los
    if (selectedStocks.includes('ALL')) {
        selectedStocks = ['AAPL', 'META', 'NVDA', 'KO', 'NU', 'Bitcoin', 'Ouro'];
    }

    selectedStocks.forEach(stock => {
        if (stock !== 'CDI') {
            const percentageData = calculatePercentageChange(data, stock); // Calcula a variação percentual
            datasets.push({
                label: stock,
                data: percentageData,
                borderColor: getRandomColor(),
                fill: false
            });
        }
    });

    // CDI sempre presente para comparação
    const cdiPercentageData = calculatePercentageChange(data, 'CDI'); // Calcula a variação percentual para o CDI
    datasets.push({
        label: 'CDI',
        data: cdiPercentageData,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
    });

    renderChart(datasets);  // Renderiza o gráfico com os datasets atualizados
    updateAccumulatedVariation();  // Atualiza a variação acumulada
}

// Função para renderizar o gráfico
function renderChart(datasets) {
    const ctx = document.getElementById('performanceChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',  // Tipo de eixo de tempo para suportar datas
                    time: {
                        unit: 'month'  // Configuração para mostrar por mês
                    },
                    title: {
                        display: true,
                        text: 'Data'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Evolução (%)'
                    },
                    suggestedMin: -100,  // Permitir que o gráfico mostre quedas maiores que 100%
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `Variação: ${tooltipItem.raw.y.toFixed(2)}%`; // Mostrar a variação percentual no tooltip
                        }
                    }
                }
            }
        }
    });
}

// Função utilitária para gerar cores aleatórias
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Função para atualizar a variação acumulada
function updateAccumulatedVariation() {
    const selectedStocks = $('#stockSelect').val();
    const accumulatedInfo = document.getElementById('varAcumulada');

    if (selectedStocks.length === 0) {
        accumulatedInfo.textContent = "Selecione uma ação para ver a variação acumulada.";
        return;
    }

    const cdiData = datasets.find(ds => ds.label === 'CDI').data;
    let infoText = '';

    if (selectedStocks.includes('ALL')) {
        let sumVariation = 0;
        let count = 0;

        datasets.forEach(ds => {
            if (ds.label !== 'CDI') {
                const variation = ds.data[ds.data.length - 1].y - ds.data[0].y;
                sumVariation += variation;
                count++;
            }
        });

        const avgVariation = sumVariation / count;
        const cdiVariation = cdiData[cdiData.length - 1].y - cdiData[0].y;
        infoText = `Média acumulada das ações: ${avgVariation.toFixed(2)}% | CDI: ${cdiVariation.toFixed(2)}%`;
    } else {
        selectedStocks.forEach(stock => {
            if (stock !== 'CDI') {
                const stockData = datasets.find(ds => ds.label === stock).data;
                const variation = stockData[stockData.length - 1].y - stockData[0].y;
                infoText += `${stock}: ${variation.toFixed(2)}% | `;
            }
        });

        const cdiVariation = cdiData[cdiData.length - 1].y - cdiData[0].y;
        infoText += `CDI: ${cdiVariation.toFixed(2)}%`;
    }

    accumulatedInfo.textContent = infoText;
}
