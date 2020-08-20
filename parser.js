const cheerio = require('cheerio');
const { get_bimestre, get_materia, get_nome } = require('./parse_tools');

async function parse_notas(html) {

    notas = new Object();

    $ = cheerio.load(html);

    await $('tr').slice(6, 17).each((i, tr) => {
        var materia;
        $(tr).find('td').each((j, td) => {
            nota = $(td).text().replace(/\s+/g, '');
            bimestre = get_bimestre(j);
    
            if (bimestre == 0) {
                materia = get_materia(nota);
                notas[materia] = new Object();
                notas[materia].name = nota;
            } else {
                if (typeof(notas[materia].bimestre[bimestre]) == 'undefined') {
                    notas[materia].bimestre[bimestre] = new Object();
                }
                
                nome = get_nome(bimestre, j);
                notas[materia].bimestre[bimestre][nome] = nota;
            }
    
            if (typeof(notas[materia].bimestre) == 'undefined') {
                notas[materia].bimestre = new Object();
            }
        });
    });

    return notas;
}

module.exports = parse_notas;