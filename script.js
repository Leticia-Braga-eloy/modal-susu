
const modal = document.getElementById('modal');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.querySelector('.close');

loginBtn.onclick = () => (modal.style.display = 'flex');
closeModal.onclick = () => (modal.style.display = 'none');

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
document.getElementById('cadastroForm').onsubmit = function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!validarTelefone(telefone) || !validarCPF(cpf)) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }


    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('cpf', cpf);
    localStorage.setItem('senha', senha);

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'perfil.html';
};
document.getElementById('telefone').addEventListener('input', function (event) {
    let input = event.target.value.replace(/\D/g, ''); 
    if (input.length > 11) input = input.slice(0, 11); 
    const formatted = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7)}`;
    event.target.value = formatted;
});
function validarTelefone(telefone) {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    return telefoneLimpo.length === 11;
}
document.getElementById('cpf').addEventListener('input', function (event) {
    let input = event.target.value.replace(/\D/g, ''); 
    if (input.length > 11) input = input.slice(0, 11); 
    const formatted = `${input.slice(0, 3)}.${input.slice(3, 6)}.${input.slice(6, 9)}-${input.slice(9, 11)}`;
    event.target.value = formatted;
});

function validarCPF(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) return false;

 
    let soma = 0, resto;


    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpfLimpo.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.charAt(9))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpfLimpo.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.charAt(10))) return false;

    return true;
}
