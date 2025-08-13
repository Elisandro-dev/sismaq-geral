
<script>
// Seu submit (mantém como está):
document.getElementById('formManutencao').addEventListener('submit', function(event) {
  event.preventDefault();
  alert("Chamado enviado com sucesso!\nPrevisão de atendimento: até 48h.");
});

// ---- Novo: lógica de anexar/preview ----
document.addEventListener('DOMContentLoaded', function () {
  const inputImagens = document.getElementById('imagens');
  const preview = document.getElementById('preview');

  inputImagens.addEventListener('change', () => {
    let files = Array.from(inputImagens.files);

    // Limita a 3 arquivos
    if (files.length > 3) {
      alert('Você pode anexar no máximo 3 imagens.');
      files = files.slice(0, 3);

      // Atualiza a FileList com os 3 primeiros
      const dt = new DataTransfer();
      files.forEach(f => dt.items.add(f));
      inputImagens.files = dt.files;
    }

    // Mostra pré-visualização
    preview.innerHTML = '';
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = file.name;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.border = '1px solid #ccc';
        img.style.borderRadius = '6px';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });
});
</script>
