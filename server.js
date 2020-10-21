const express = require('express');
const app = express();
const { scrape_alunos, scrape_boletim, set_values } = require('./scrape');

app.set('port', (process.env.PORT || 3000));

app.get('/', async (req, res) => {
	const credentials = {
		cpf: req.query.cpf,
		senha: req.query.senha,
		ano: req.query.ano,
		escola: req.query.escola,
	};
	
	if (!req.query.ano) {
		const date = new Date();
		credentials.ano = String(date.getFullYear());
	}
	
	if (!req.query.senha && req.query.cpf) {
		credentials.senha = req.query.cpf;
	}
	
	if (!req.query.cpf && req.query.senha) {
		credentials.cpf = req.query.senha;
	}
	
	if (!req.query.escola) {
		credentials.escola = 1;
	}
	
	if (!Object.keys(req.query).length == 0 && (credentials.cpf || credentials.senha)) {
		console.log(req.query);
		const formularios = set_values(credentials);
		const { cookie, alunos } = await scrape_alunos(formularios);
		
		if (req.query.aluno && req.query.aluno != '') {
			const aluno = req.query.aluno;
			const notas = await scrape_boletim(cookie, formularios, aluno);
			res.json(notas);
			
		} else {
			res.json(alunos);
		}
	} else {
		res.json({erro: 'parametros vazios'});
	}
});

app.listen(app.get('port'), () => {
	console.log('Servidor rodando em 3000');
});