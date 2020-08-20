# AVISO:
Esse código não é oficial, a escola não é responsável por nenhum problema causado, e muito menos eu. Use por sua conta e risco.

Instale clonando o repositório, e instalando com `npm install`, (ou com yarn, se preferir).

Essa api foi feita para back-end apenas. Por conta do CORS, não irá funcionar no front-end.

# Como usar o servidor:

Clone o repositório, instale as dependências e inicialize:
```
git clone https://github.com/MuriloucoLouco/classea.git
cd classea
npm install
npm start
```
O servidor irá rodar localmente na porta 3000.

## Modo de uso:

Todas as requisições serão na rota `/`, utilizando GET e parâmetros GET.

Primeiro você irá pegar o JSON com os alunos do mesmo cpf.
Você precisa informar 4 coisas:
cpf, senha, escola e ano.

Exemplo:
```
GET localhost:3000/?cpf=12345678900&senha=12345678900&ano=2020&escola=1
```
Exemplo de retorno:
```javascript
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
```
Agora, com os alunos que quer, selecione o id do aluno desejado. Por exemplo, vou pegar o id `'1235'` do aluno `'Sicrano da Silva'`.
Depois, faça uma requisição para a mesma rota, mas passando o paramêtro `aluno` junto.

Exemplo:
```
GET localhost:3000/?aluno=1235&cpf=12345678900&senha=12345678900&ano=2020&escola=1
```
Você agora terá o JSON com as notas

## Notas:
Você pode omitir a `senha`, e ela ficará como padrão com o mesmo valor de `cpf`. O mesmo vale para o contrário (omitir o cpf).

Você também pode omitir `ano`, e o servidor pegará o ano atual automaticamente.

# Como usar a api sem servidor:

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
