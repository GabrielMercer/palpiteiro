document.getElementById('palpitesForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const palpites = Object.fromEntries(formData);

    try {
        const response = await fetch('/salvar-palpites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(palpites)
        });

        const data = await response.json();
        
        if (data.success) {
            alert('Palpites salvos com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao salvar palpites:', error);
        alert('Erro ao salvar palpites');
    }
}); 