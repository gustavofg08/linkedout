# LinkedOut - Sincronização Real Inter-Dispositivos (WebRTC / PeerJS)

Esta versão do **LinkedOut** permite a comunicação real entre dispositivos físicos diferentes (ex: o computador do apresentador e os celulares dos alunos).

---

## 🌐 Como Funciona a Conexão Inter-Dispositivos?
A aplicação utiliza a biblioteca **PeerJS (WebRTC)** com servidor de sinalização em nuvem gratuito. 
Isso significa que **não é necessário instalar nenhum servidor local ou backend em Node.js/Python**. Basta que os dispositivos estejam conectados na internet.

---

## 🚀 Como Realizar a Apresentação na Sala

1. **No Computador da Apresentação (Recrutador):**
   - Abra o arquivo `index.html`.
   - Digite um **Código de Sala** (Ex: `TURMA101`).
   - Escolha o tipo de acesso: **Recrutador**.
   - O painel ficará aguardando as candidaturas enviadas pelos celulares.

2. **Nos Celulares dos Alunos (Candidatos):**
   - Abra o `index.html` nos celulares (ou envie o link hospedado via GitHub Pages / Vercel / Netlify / pasta compartilhada).
   - Digite o **MESMO Código de Sala** (Ex: `TURMA101`).
   - Escolha o tipo de acesso: **Candidato**.
   - Escolha uma vaga na lista lateral, leia os detalhes na ilha flutuante, escreva a mensagem e clique em **Enviar Candidatura via Rede**.

3. **Resultado:**
   - A candidatura do celular aparecerá **instantaneamente no computador do recrutador**.
   - Quando o recrutador clicar em **Aceitar**, o status no celular do aluno mudará para **Aceito** em tempo real!
