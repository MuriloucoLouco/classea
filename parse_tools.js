function get_bimestre(ind) {
    let bimestre;

    if (ind === 0) bimestre = '0';
    if (ind >= 1 && ind <= 7) bimestre = '1';
    if (ind >= 8 && ind <= 15) bimestre = '2';
    if (ind >= 16 && ind <= 22) bimestre = '3';
    if (ind >= 23 && ind <= 29) bimestre = '4';
    if (ind >= 30 && ind <= 32) bimestre = 'final';

    return bimestre;
}

function get_nome(bimestre, ind) {
    let nome;

    if (bimestre == '1' || bimestre == '3' || bimestre == '4') {
        switch ((ind - 1) % 7) {
            case 0:
                nome = 'p_1';
                break;
            case 1:
                nome = 'p_2';
                break;
            case 2:
                nome = 'bim';
                break;
            case 3:
                nome = 'sim';
                break;
            case 4:
                nome = 'media';
                break;
            case 5:
                nome = 'rec';
                break;
            case 6:
                nome = 'media_f';
                break;
        }
    }
    if (bimestre == '2') {
        switch ((ind) % 8) {
            case 0:
                nome = 'p_1';
                break;
            case 1:
                nome = 'p_2';
                break;
            case 2:
                nome = 'bim';
                break;
            case 3:
                nome = 'sim';
                break;
            case 4:
                nome = 'gin';
                break;
            case 5:
                nome = 'media';
                break;
            case 6:
                nome = 'rec';
                break;
            case 7:
                nome = 'media_f';
                break;
        }
    }
    if (bimestre == 'final') {
        switch ((ind - 1) % 3) {
            case 0:
                nome = 'ma';
                break;
            case 1:
                nome = 'pf';
                break;
            case 2:
                nome = 'mf';
                break;               
        }
    }

    return nome;
}

function get_materia(nome) {
    let materia;
    switch (nome) {
        case 'LínguaPortuguesa':
            materia = 'portugues';
            break;
        case 'Matemática':
            materia = 'matematica';
            break;
        case 'Biologia':
            materia = 'biologia';
            break;
        case 'Física':
            materia = 'fisica';
            break;
        case 'Química':
            materia = 'quimica';
            break;
        case 'Ciências':
            materia = 'ciencias';
            break;
        case 'História':
            materia = 'historia';
            break;
        case 'Geografia':
            materia = 'geografia';
            break;
        case 'LínguaInglesa':
            materia = 'ingles';
            break;
        case 'EducaçãoFísica':
            materia = 'educacaofisica';
            break;
        case 'Arte':
            materia = 'arte';
            break;
    }

    return materia;
}

module.exports = { get_bimestre, get_materia, get_nome };