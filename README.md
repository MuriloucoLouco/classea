# AVISO:
Esse código não é oficial, a escola não é responsável por nenhum problema causado, e muito menos eu. Use por sua conta e risco.
Instale clonando o repositório, e instalando com `npm install`, (ou com yarn, se preferir).
Por padrão, rodar `npm start` vai iniciar o main.js. Você precisará colocar suas credenciais manualmente antes de iniciar, se não, irá dar erro.
Essa api foi feita para back-end apenas. Por conta do CORS, não irá funcionar no front-end.


# Como usar:

Importe as funções do scrape.js:
```javascript
const { scrape_alunos, scrape_boletim, set_values } = require('./scrape');
```
Crie um objeto com cpf, senha, ano, e escola:
```javascript
const credentials = {
    cpf : '12345678900',
    senha : '12345678900',
    ano : '2020',
    escola : '1' // '0' é Vila, '1' é Centro.
}
```
Crie uma função assíncrona:
```javascript
async function main() {
    ///
}

main();
```
Dentro dela, defina as credenciais com `set_values`:
```javascript
async function main() {
    set_values(credentials);
}
```
Depois, adquira o `cookie` (necessário para login), e o objeto `alunos`.
É necessário usar await.
```javascript
async function main() {
    set_values(credentials);
    const { cookie, alunos } = await scrape_alunos();
    /*
    Formato do objeto 'alunos':
    [
        {
            id: '1234',
            name: 'Fulano da Silva'
        },
        {
            id: '1235',
            name: 'Sicrano da Silva'
        }
    ]
    */
}
```
Finalmente, do objeto 'alunos', você deve pegar o id do aluno que quer pegar as notas, e passar para a função `scrape_boletim`, após o `cookie`:
```javascript
async function main() {
    set_values(credentials);
    const { cookie, alunos } = await scrape_alunos();
    const aluno = alunos[1].id
    const notas = await scrape_boletim( cookie, aluno );
}
```
Nesse caso, `aluno` retornará `'1235'`, baseado no objeto de exemplo acima.

Com o objeto `notas`, você pode acessar a nota que quiser, do aluno escolhido. Exemplo:
```javascript
const nota = notas.matematica.bimestre['2'].p_1
//nota vale '10.0' (a não ser que você seja burro).
```
