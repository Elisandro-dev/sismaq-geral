// Pré-visualização e limite de 3 imagens
document.addEventListener('DOMContentLoaded', function () {
  const inputImagens = document.getElementById('imagens');
  const preview = document.getElementById('preview');

  inputImagens.addEventListener('change', () => {
    let files = Array.from(inputImagens.files);

    // Limita a 3 arquivos
    if (files.length > 3) {
      alert('Você pode anexar no máximo 3 imagens.');
      files = files.slice(0, 3);
      const dt = new DataTransfer();
      files.forEach(f => dt.items.add(f));
      inputImagens.files = dt.files;
    }

    // Renderiza pré-visualizações
    preview.innerHTML = '';
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = file.name;
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  // Submit com alerta + mailto
  document.getElementById('formManutencao').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Chamado enviado com sucesso!\nPrevisão de atendimento: até 48h.");
    enviarEmail();
  });
});

// Envia por mailto (NÃO anexa arquivos; só lista os nomes)
function enviarEmail() {
  const solicitante = document.getElementById("solicitante").value;
  const email = document.getElementById("email_solicitante").value;
  const cliente = document.getElementById("Cliente").value || '—';
  const maquina = document.getElementById("Máquina").value || '—';
  const tipo = document.getElementById("tipo").value;
  const urgencia = document.getElementById("urgencia").value;
  const dataAtendimento = document.getElementById("data_atendimento").value;
  const descricao = document.getElementById("descricao").value;

  const nomesImagens = Array.from(document.getElementById('imagens').files)
    .map(f => f.name).join(', ') || 'Nenhuma';

  const assunto = encodeURIComponent("Solicitação de Manutenção - SISMAQ");
  const corpo = encodeURIComponent(
    "Solicitante: " + solicitante + "\n" +
    "E-mail: " + email + "\n" +
    "Cliente: " + cliente + "\n" +
    "Máquina: " + maquina + "\n" +
    "Tipo de Manutenção: " + tipo + "\n" +
    "Urgência: " + urgencia + "\n" +
    "Data desejada: " + dataAtendimento + "\n" +
    "Descrição: " + descricao + "\n\n" +
    "Imagens selecionadas (nomes): " + nomesImagens + "\n" +
    "Observação: o navegador não envia anexos via mailto; anexar manualmente."
  );

  // Abre o cliente de e-mail
  window.location.href = "mailto:elisandrovarela18@gmail.com"
    + "?subject=" + assunto
    + "&body=" + corpo
    + "&cc=" + encodeURIComponent(email);
}
