# CTP em Prática

Ferramenta interativa para a formação das CTPs do IFCE. A plateia participa pelo celular de exercícios de IA generativa com um caso fictício, enquanto o facilitador conduz as decisões e discute os resultados.

Responsável pela proposta: **Prof. Antonio Wendell de Oliveira Rodrigues — LIT/DTEL**.

## Estado atual

Etapa 1: roteiro e conteúdo inicial preparados para revisão. Há um protótipo individual em HTML/JavaScript, sem votação em tempo real ou QR code de sessão. Publicado no GitHub Pages e implantado em https://ctp.ioda.com.br. HTTPS ativo. Informações operacionais de implantação ficam somente na documentação local.

## Primeira entrega planejada

Uma atividade de 23 minutos, cinco exercícios de IA, participação sem cadastro, resultados agregados e explicações liberadas pelo apresentador. Caso inteiramente fictício, sem informações reais de estudantes. Alternativa conduzida pelo projetor quando a conexão falhar.

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

Mudanças pequenas em branches próprias, revisão do resultado e histórico de alterações. As tarefas ficam no roadmap até definirmos o remoto; depois poderão virar issues. Publicação, hospedagem e serviços pagos terão destino e condições definidos com o responsável. Não incluir segredos, dados pessoais reais ou materiais internos sem autorização.

Nenhuma licença de distribuição foi escolhida. Não presumir autorização para publicar este conteúdo sob licença aberta.

## Protótipo individual

`index.html` e `app.js` apresentam cinco exercícios de IA: elaborar pedidos, selecionar contexto, detectar acréscimos sem base, iterar e avaliar resultados. Lívia, Caio e Pingo são personagens fictícios ilustrativos. Exemplos são preparados para ensino, sem chamada a um modelo. Escolhas e estado ficam somente na memória da aba; recarregar reinicia a atividade. Não há contagem coletiva ou controle de apresentador. O conteúdo é carregado de `content/caso-01.json` por endereço HTTP(S).
