# CTP em Prática

Ferramenta interativa para a formação das CTPs do IFCE. A plateia participa pelo celular de um caso fictício, enquanto o facilitador conduz as decisões e discute os resultados.

Responsável pela proposta: **Prof. Antonio Wendell de Oliveira Rodrigues — LIT/DTEL**.

## Estado atual

Etapa 1: roteiro e conteúdo inicial preparados para revisão. Ainda não há aplicação, votação em tempo real, hospedagem ou QR code de participação. Este repositório é local e ainda não tem remoto configurado.

## Primeira entrega planejada

Uma atividade de 23 minutos, cinco decisões, participação sem cadastro, resultados agregados e explicações liberadas pelo apresentador. Caso inteiramente fictício, sem informações reais de estudantes. Alternativa conduzida pelo projetor quando a conexão falhar.

Os procedimentos específicos do SEI dependem de referência e validação do IFCE. A ferramenta não acessará nem operará o SEI nesta fase.

## Conteúdo e gestão

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
