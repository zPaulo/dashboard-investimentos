import pandas as pd
import numpy as np
import os
import simplejson as json  # Importa simplejson para melhor manejo de dados

# Lista dos arquivos CSV e seus respectivos nomes de ativos
csv_files = {
    "AAPL": "./data/AAPL Dados Históricos.csv",
    "META": "./data/META Dados Históricos.csv",
    "NVDA": "./data/NVDA Dados Históricos.csv",
    "KO": "./data/KO Dados Históricos.csv",
    "NU": "./data/NU Dados Históricos.csv",
    "Bitcoin": "./data/Dados Históricos - Bitcoin.csv",
    "Ouro": "./data/Dados Históricos - Ouro Futuros.csv",
    "CDI": "./data/Certificado de Depósito Interbancário de 1 dia Futuros Futuros - Dados Históricos.csv"
}

# Função para ler e processar cada arquivo CSV
def process_csv(file_path, asset_name):
    df = pd.read_csv(file_path)
    
    # Corrige o nome das colunas para remover espaços desnecessários
    df.columns = df.columns.str.strip()
    
    # Formata a coluna de data para o formato YYYY-MM
    df['Data'] = pd.to_datetime(df['Data'], dayfirst=True).dt.to_period('M')
    
    # Mantém apenas a coluna de fechamento final ('Último') e a data
    df = df[['Data', 'Último']].dropna()
    df.columns = ['Date', asset_name]
    
    # Converte o valor de 'Último' para float
    df[asset_name] = df[asset_name].apply(lambda x: float(str(x).replace(',', '')))
    
    return df

# Função para consolidar todos os dados
def consolidate_data(csv_files):
    consolidated_df = pd.DataFrame()

    for asset_name, file_path in csv_files.items():
        asset_df = process_csv(file_path, asset_name)
        if consolidated_df.empty:
            consolidated_df = asset_df
        else:
            consolidated_df = pd.merge(consolidated_df, asset_df, on='Date', how='outer')

    # Ordena por data e preenche valores ausentes com interpolação linear
    consolidated_df.sort_values('Date', inplace=True)
    consolidated_df.set_index('Date', inplace=True)

    # Atualizado: Usar ffill() e bfill() diretamente em vez de fillna com método
    consolidated_df = consolidated_df.interpolate(method='linear').ffill().bfill()

    # Converte o índice de volta para uma coluna para exportar como JSON
    consolidated_df.reset_index(inplace=True)
    
    # Converte o índice para string para evitar problemas de serialização
    consolidated_df['Date'] = consolidated_df['Date'].astype(str)
    
    return consolidated_df

# Processa e consolida os dados
consolidated_data = consolidate_data(csv_files)

# Verificação de dados para evitar problemas de recursão na exportação
print(consolidated_data.head())  # Mostra algumas linhas para verificar os dados

# Exporta os dados consolidados para um arquivo JSON usando simplejson
try:
    with open('consolidated_data.json', 'w') as json_file:
        json.dump(consolidated_data.to_dict(orient='records'), json_file, ignore_nan=True)  # Use ignore_nan para evitar NaNs no JSON
    print("Dados consolidados exportados para 'consolidated_data.json'.")
except OverflowError as e:
    print("Erro ao exportar dados para JSON:", e)
