# LinkedOut - Projeto de Apresentação Escolar (Multi-Páginas & Tempo Real)

Este projeto foi reestruturado para ser apresentado em tempo real usando telas/páginas separadas para o **Candidato** e para o **Recrutador**.

---

## 📱 Estrutura de Páginas

1. `index.html` - **Portal de Entrada:** O usuário digita o nome e escolhe se vai entrar como *Candidato* ou *Recrutador*.
2. `candidato.html` - **Visão de Quem Procura Emprego:**
   - Design idêntico ao LinkedIn com lista de vagas à esquerda e a **ilha flutuante de detalhes da vaga** à direita.
   - O aluno preenche sua apresentação e se candidata a qualquer vaga com 1 clique.
3. `recrutador.html` - **Visão do Avaliador / Recrutador (Apresentação no PC):**
   - Recebe em tempo real as candidaturas enviadas pelos alunos/espectadores no celular.
   - Avalia a apresentação do candidato e clica em **Aceitar / Entrevistar** ou **Rejeitar**.
4. `style.css` - Estilos centralizados da interface.
5. `sync.js` - Mecanismo de sincronização automática entre telas/dispositivos através do `BroadcastChannel` e `LocalStorage`.

---

## 🚀 Como Utilizar na Apresentação

1. **Apresentador no PC (Recrutador):**
   - Abra o `index.html`, entre com o nome e selecione **Recrutador**.
   - A página `recrutador.html` será aberta e ficará aguardando novos candidatos na ilha flutuante.

2. **Espectadores / Celulares (Candidatos):**
   - Acesse o site no celular, escolha **Candidato**, navegue pelas vagas na lista lateral e clique em uma vaga para ver os detalhes na ilha flutuante.
   - Escreva a nota e envie.

3. **Sincronização em Tempo Real:**
   - Assim que um candidato enviar pelo celular/outra aba, a tela do recrutador será atualizada **sem precisar recarregar a página**!
