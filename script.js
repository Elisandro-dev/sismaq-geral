document.getElementById('formManutencao').addEventListener('submit', function(event) {
  event.preventDefault(); // impede o envio padrão para tratar manualmente

  // Mostra a mensagem
  alert("Chamado enviado com sucesso!\nPrevisão de atendimento: até 48h.");

  // Chama a função que prepara e abre o e-mail
  enviarEmail();
});
