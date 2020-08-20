const parse_notas = require('./parser');
const { get_cookie, get_contratante, get_alunos, get_matricula, get_boletim } = require('./scrape_fetchers');

const formulario = {
	'metodo': 'realizarLogin',
	'cpf': 'cpf',
	'senha': 'senha',
};

const formulario_contratante = {
	'metodo': 'selecionarPorContratanteCarregamento1',
	'ano': 'ano',
	'escola': 'escola',
	'idContratante': '',
}

const formulario_matricula = {
	'idContratanteEstudante': '',
	'matricula': '',
	'metodo': 'buscaMatricula',
	'idContratante': '',
	'ano': 'ano',
	'escola': 'escola',
	'relatorio': 'boletim',
	'estudante': '',
}

function set_values({ cpf, senha, ano, escola }) {
	formulario.cpf = cpf;
	formulario.senha = senha;
	formulario_contratante.ano = ano;
	formulario_contratante.escola = escola;
	formulario_matricula.ano = ano;
	formulario_matricula.escola = escola;

}

async function scrape_alunos() {
	const cookie = await get_cookie();
	const idContratante = await get_contratante(formulario, cookie);
	
	formulario_contratante.idContratante = idContratante;
	formulario_matricula.idContratante = idContratante;

	const alunos = await get_alunos(formulario_contratante, cookie);

	return { cookie, alunos };
}

async function scrape_boletim( cookie, aluno ) {
	formulario_matricula.estudante = aluno;
	
	const matricula = await get_matricula(formulario_matricula, cookie);
	
	formulario_matricula.matricula = matricula;

	const html = await get_boletim(formulario_matricula, cookie);
	const notas = await parse_notas(html);

	return notas;
}

module.exports = { scrape_alunos, scrape_boletim, set_values };