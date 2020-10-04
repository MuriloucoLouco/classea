const parse_notas = require('./parser');
const { get_cookie, get_contratante, get_alunos, get_matricula, get_boletim } = require('./scrape_fetchers');

function set_values({ cpf, senha, ano, escola }) {
	const formularios = {
		formulario : {
			'metodo': 'realizarLogin',
			'cpf': 'cpf',
			'senha': 'senha',
		},
		formulario_contratante : {
			'metodo': 'selecionarPorContratanteCarregamento1',
			'ano': 'ano',
			'escola': 'escola',
			'idContratante': '',
		},
		formulario_matricula : {
			'idContratanteEstudante': '',
			'matricula': '',
			'metodo': 'buscaMatricula',
			'idContratante': '',
			'ano': 'ano',
			'escola': 'escola',
			'relatorio': 'boletim',
			'estudante': '',
		},
	};

	formularios.formulario.cpf = cpf;
	formularios.formulario.senha = senha;
	formularios.formulario_contratante.ano = ano;
	formularios.formulario_contratante.escola = escola;
	formularios.formulario_matricula.ano = ano;
	formularios.formulario_matricula.escola = escola;

	return formularios;
}

async function scrape_alunos( formularios ) {
	const { formulario, formulario_contratante, formulario_matricula } = formularios;
	const cookie = await get_cookie();

	const idContratante = await get_contratante(formulario, cookie);
	formulario_contratante.idContratante = idContratante;
	formulario_matricula.idContratante = idContratante;
	const alunos = await get_alunos(formulario_contratante, cookie);

	return { cookie, alunos };
}

async function scrape_boletim( cookie, formularios, aluno ) {
	const { formulario, formulario_contratante, formulario_matricula } = formularios;

	formulario_matricula.estudante = aluno;
	const matricula = await get_matricula(formulario_matricula, cookie);
	
	formulario_matricula.matricula = matricula;
	const html = await get_boletim(formulario_matricula, cookie);
	const notas = await parse_notas(html);

	return notas;
}

module.exports = { scrape_alunos, scrape_boletim, set_values };