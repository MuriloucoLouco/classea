const fetch = require('node-fetch');
const cheerio = require('cheerio');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const indexContratante =  'https://sistemaclassea.com.br/sistema/indexContratante.php';
const manterContratante = 'https://sistemaclassea.com.br/sistema/manterContratante.php';
const manterEstudante = 'https://sistemaclassea.com.br/sistema/manterEstudante.php';
const relBoletimPorEstudante = 'https://sistemaclassea.com.br/sistema/relBoletimPorEstudante.php';

const user_agent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36';

async function get_cookie() {
	let cookie;

	_=await fetch(indexContratante)
		.then(res => res.headers.raw())
		.then(headers => headers['set-cookie'][0].slice(0,-8))
		.then(cokie => cookie = cokie);

	return cookie;
}

async function get_contratante(formulario, cookie) {
	let idContratante;
	
	_=await fetch(manterContratante, {
		method: 'post',
		body: new URLSearchParams(formulario),
		redirect: 'follow',
		headers: {
			'Connection': 'keep-alive',
			'Cookie': cookie,
			'User-Agent': user_agent
		}
	}).then(res => res.text())
	.then(body => cheerio.load(body))
	.then($ => $('#idContratante').attr('value'))
	.then(value => idContratante = value);
	
	return idContratante;
}

async function get_alunos(formulario_contratante, cookie) {
	var alunos = new Array();
	
	_= await fetch(manterContratante, {
		method: 'post',
		body: new URLSearchParams(formulario_contratante),
		redirect: 'follow',
		headers: {
			'Host': 'sistemaclassea.com.br',
			'Origin': 'https://sistemaclassea.com.br',
			'Referer': 'https://sistemaclassea.com.br/sistema/sistemaContratante.php',
			'Cache-Control': 'max-age=0',
			'Connection': 'keep-alive',
			'Cookie': cookie,
			'User-Agent': user_agent,
		}
	}).then(res => res.text())
	.then(body => cheerio.load(body))
	.then($ => {
		$('option').each((index, option) => {
			alunos.push({
				id: option.attribs.value,
				name: option.children[0].data
			});
		});
	});
	
	return alunos;
}

async function get_matricula(formulario_matricula, cookie) {
	let matricula;
	
	_=await fetch(manterEstudante, {
		method: 'post',
		body: new URLSearchParams(formulario_matricula),
		redirect: 'follow',
		headers: {
			'Host': 'sistemaclassea.com.br',
			'Origin': 'https://sistemaclassea.com.br',
			'Referer': 'https://sistemaclassea.com.br/sistema/sistemaContratante.php',
			'Cache-Control': 'max-age=0',
			'Connection': 'keep-alive',
			'Cookie': cookie,
			'User-Agent': user_agent,
		}
	})
	.then(res => res.text())
	.then(body => matricula = body);
	
	return matricula;
}

async function get_boletim(formulario_matricula, cookie) {
	let html;

	_=await fetch(relBoletimPorEstudante, {
		method: 'post',
		body: new URLSearchParams(formulario_matricula),
		redirect: 'follow',
		headers: {
			'Host': 'sistemaclassea.com.br',
			'Origin': 'https://sistemaclassea.com.br',
			'Referer': 'https://sistemaclassea.com.br/sistema/sistemaContratante.php',
			'Cache-Control': 'max-age=0',
			'Connection': 'keep-alive',
			'Cookie': cookie,
			'User-Agent': user_agent,
		}
	})
	.then(res => res.text())
    .then(body => html = body);
    
    return html;
}

module.exports = { get_cookie, get_contratante, get_alunos, get_matricula, get_boletim };