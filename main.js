const { scrape_alunos, scrape_boletim, set_values } = require('./scrape');

const credentials = {
    cpf : '',
    senha : '',
    ano : '2020',
    escola : '1'
}

async function main() {
    set_values(credentials);
    const { cookie, alunos } = await scrape_alunos();
    
    const notas = await scrape_boletim( cookie, alunos[0].id );
    console.log(notas);
}

main();
