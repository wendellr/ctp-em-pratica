# Condução ao vivo

## Três experiências

- /apresentador: acesso por chave privada, criação e retomada de sessão, votos e confiança em tempo real, roteiro e controle das revelações.
- /projecao?sessao=CODIGO: pergunta, QR code, pista e resultados liberados pelo apresentador. Não contém roteiro privado ou dados individuais.
- /participar?sessao=CODIGO: entrada por código, voto e confiança, confirmação e possibilidade de alteração enquanto a votação está aberta.

A chave de apresentador é fornecida separadamente e não pertence ao repositório. Não projetar a tela de apresentador nem compartilhar seu arquivo de acesso.

## Ritmo por missão

Cada missão tem uma pergunta central e dura cerca de 7 minutos: caso lido pelo professor (1min), voto (30s), duas justificativas de até 20s e comentário (1min), pista e demonstração conduzida (1min30), novo voto (30s), resultados (1min), síntese e aplicação (1min30). Total: 21 minutos. Reserve os outros 9 minutos do bloco para entrada, transições, comparação de ferramentas/custos e caminhos de uso de arquivos e sistemas. O cronômetro não encerra a votação automaticamente.

1. **Um registro pronto para usar?** A IA organiza notas de atendimento, mas transforma um relato em causa confirmada. Distinguir registrar o que foi dito de concluir o que causou as faltas.
2. **Uma pauta que ajuda a equipe?** A IA produz uma pauta viável, mas antecipa soluções individuais antes da discussão das hipóteses. Refinar o pedido preservando o que é útil.
3. **Menos casos significa melhora?** A redução absoluta está correta, mas grupos e denominadores mudaram. Pedir cálculos e limites sem trocar uma conclusão precipitada por outra.

Não antecipar a pista antes do primeiro voto. A segunda rodada permite reconsiderar com contexto adicional. Não apresentar mudança de voto como prova de aprendizagem. As referências para estes casos são B, C e A; ouvir as condições que justificariam outras ações. Não pontuar como decisões profissionais universais.

Casos fictícios inspirados nas atividades descritas no convite da PROEN, sem alegação de validação por uma CTP nem de reprodução de fluxo oficial. Não solicitar experiências identificáveis.

## Ponte com a exposição

Na comparação de ferramentas, mantenha Google/Gemini, OpenAI/ChatGPT e Anthropic/Claude, opções gratuitas/pagas e diferença entre assinatura e API. Não usar preços hipotéticos como se fossem preços vigentes. Na ponte com dados, diferencie anexo/exportação de conector/API e orientação sobre SEI de integração autorizada. Esses pontos são conduzidos pelo professor, fora das alternativas das missões.

Todas as situações e respostas de IA são exemplos preparados. Não usar registros identificáveis da plateia.

## Sequência de controles

Criar sessão. Abrir projeção em outra janela. Compartilhar código ou QR. Abrir primeira votação, encerrar, ouvir argumentos, revelar pista, abrir segunda votação, encerrar, revelar resultados e explicação, discutir mudanças e avançar.

O painel acompanha contagens e confiança mesmo quando a projeção ainda está oculta. Os percentuais usam o total de votos de cada rodada. Mudanças consideram somente identificadores que responderam às duas rodadas; não se calcula mudança subtraindo percentuais de públicos diferentes.

## Participantes e confiança

Sem identificação nominal e sem ranking. O navegador guarda um identificador aleatório por sessão. O servidor mantém votos, confiança e última atividade temporariamente. Outra aba no mesmo navegador deve reutilizar o identificador; outro navegador pode representar outro participante. Não existe garantia de uma pessoa por aparelho. Não pedir dados pessoais reais ou relatos identificáveis.

## Limites operacionais

Sessões duram até oito horas, armazenadas em memória. Reiniciar ou atualizar o servidor encerra sessões e perde seus dados. Sem histórico permanente, exportação, equipes formais ou pontuação nesta versão. A votação usa consultas periódicas; rede instável pode atrasar atualizações. Mensagens de falha são visíveis. Teste de capacidade em escala e ensaio com o público esperado ainda são necessários.

Na falha de rede, continue oralmente com o roteiro das missões. Não apresentar a contagem anterior como votação atualizada. A versão individual continua disponível na página inicial.

## Componentes

Servidor Node.js sem dependências de runtime externas. QR gerado no navegador com qrcode-generator, de Kazuhiko Arase, licença MIT incluída em live/QR-LICENSE.txt. A licença desse componente não define a licença do restante do produto.

## Conexão e envio na versão estabilizada

Consultas com timeout de oito segundos, sem sobreposição, com descarte de respostas canceladas. Ao retornar à aba ou à rede, uma consulta é solicitada. A última atualização fica visível. A falta de conexão bloqueia os controles baseados em estado antigo; o apresentador pode seguir oralmente com o material local. Seleções editadas mostram que ainda não foram enviadas; envio não confirmado pode ser repetido sem duplicar o voto. A recuperação exige que o serviço e a sessão ainda existam.
