# Condução ao vivo

## Três experiências

- /apresentador: acesso por chave privada, criação e retomada de sessão, votos e confiança em tempo real, roteiro e controle das revelações.
- /projecao?sessao=CODIGO: pergunta, QR code, pista e resultados liberados pelo apresentador. Não contém roteiro privado ou dados individuais.
- /participar?sessao=CODIGO: entrada por código, voto e confiança, confirmação e possibilidade de alteração enquanto a votação está aberta.

A chave de apresentador é fornecida separadamente e não pertence ao repositório. Não projetar a tela de apresentador nem compartilhar seu arquivo de acesso.

## Ritmo por missão

Apresentação 1min30; votação 30s; justificativas breves 2min; pista e demonstração 1min30; segunda votação 30s; comparação 2min; síntese 2min. Total 10 minutos por missão, três missões. Os tempos de explicação são orientativos. O cronômetro de votação não encerra a rodada automaticamente.

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
