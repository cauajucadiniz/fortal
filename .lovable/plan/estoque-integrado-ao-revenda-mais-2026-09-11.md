# Estoque integrado ao Revenda Mais

## Objetivo
Substituir o estoque ativo cadastrado no site pelos veículos recebidos do feed Revenda Mais, sem alterar o arquivo de veículos vendidos.

## Implementação
- Criar uma função pública de leitura que consulta o feed no servidor, valida a resposta e devolve JSON com cache curto.
- Criar um adaptador tolerante às variações do feed para converter fotos, marca, modelo, preço, ano, quilometragem, câmbio, motor e opcionais para o formato atual dos cartões.
- Criar uma consulta compartilhada com cache para evitar chamadas duplicadas entre a página inicial e a página de estoque.
- Atualizar a página de estoque para calcular filtros e ordenação com os dados reais, incluindo estados de carregamento, erro e estoque vazio.
- Atualizar os veículos em destaque da página inicial para usar a mesma fonte.
- Manter a página de vendidos usando o arquivo histórico existente.

## Validação
- Testar a função diretamente e confirmar o tratamento de respostas vazias ou inválidas do fornecedor.
- Verificar carregamento, filtros, cartões, imagens e mensagens de erro no desktop e no celular.

## Observação técnica
O endereço fornecido está respondendo HTTP 200 com corpo vazio neste momento. A integração será preparada para o JSON real e exibirá uma mensagem clara, sem voltar silenciosamente aos veículos estáticos, caso o fornecedor continue sem retornar dados.
