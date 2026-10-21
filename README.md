# CTP em Prática

Ferramenta interativa para a formação das CTPs do IFCE. A plateia participa pelo celular de exercícios de IA generativa com um caso fictício, enquanto o facilitador conduz as decisões e discute os resultados.

Responsável pela proposta: **Prof. Antonio Wendell de Oliveira Rodrigues — LIT/DTEL**.

## Estado atual

A aplicação publicada oferece três missões ao vivo, painel privado do apresentador, projeção e participação pelo celular. O modo individual tem oito exercícios complementares. A publicação GitHub Pages é estática; o ao vivo funciona em https://ctp.ioda.com.br. Credenciais e instruções operacionais privadas ficam fora do repositório.

## Primeira entrega planejada

Uma atividade de 30 minutos, oito exercícios de IA, participação sem cadastro, resultados agregados e explicações liberadas pelo apresentador. Caso inteiramente fictício, sem informações reais de estudantes. Alternativa conduzida pelo projetor quando a conexão falhar.

Os procedimentos específicos do SEI dependem de referência e validação do IFCE. A ferramenta não acessará nem operará o SEI nesta fase.

## Conteúdo e gestão

- [Objetivos centrais da formação](docs/objetivos-da-formacao.md)

- [Caso e roteiro de mediação](docs/caso-01.md)
- [Roadmap e tarefas](docs/roadmap.md)
- [Critérios da primeira versão](docs/aceite.md)
- [Decisões de produto e técnica](docs/decisoes.md)
- [Pendências institucionais](docs/validacao-institucional.md)
- `content/caso-01.json`: conteúdo estruturado para a futura aplicação.

## Conferir a consistência do caso

Requer Node.js 22 ou posterior. Sem dependências externas.

```sh
npm test
```

## Forma de trabalho

Mudanças pequenas em branches próprias, revisão do resultado e histórico de alterações. As tarefas são acompanhadas no roadmap e nas issues do GitHub. Publicação, hospedagem e serviços pagos terão destino e condições definidos com o responsável. Não incluir segredos, dados pessoais reais ou materiais internos sem autorização.

Nenhuma licença de distribuição foi escolhida. Não presumir autorização para publicar este conteúdo sob licença aberta.

## Protótipo individual

`index.html` e `app.js` apresentam oito exercícios de IA: escolha de ferramenta e custo, elaboração de pedidos, contexto, confiabilidade, iteração, avaliação, dados tabulares e construção institucional. Lívia, Caio e Pingo são personagens fictícios ilustrativos. Exemplos são preparados para ensino, sem chamada a um modelo. Escolhas e estado ficam somente na memória da aba; recarregar reinicia a atividade. Não há contagem coletiva ou controle de apresentador. O conteúdo é carregado de `content/caso-01.json` por endereço HTTP(S).

## Ao vivo

A versão de servidor inclui painel do apresentador, projeção e participação sincronizada. Veja [roteiro e limitações](docs/conducao-ao-vivo.md). GitHub Pages continua servindo apenas o modo individual; o ao vivo depende do servidor. As missões são exemplos preparados, sem IA ao vivo. `npm start` exige HOST_KEY configurada fora do repositório.
