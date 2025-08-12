const bcrypt = require('bcryptjs');

async function testSenha() {
  const senhaDigitada = 'senha123'; // substitua pela senha que você quer testar
  const hashDoBanco = '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // coloque aqui o hash da senha salva no banco

  const valido = await bcrypt.compare(senhaDigitada, hashDoBanco);

  if (valido) {
    console.log('Senha válida!');
  } else {
    console.log('Senha inválida!');
  }
}

testSenha();
