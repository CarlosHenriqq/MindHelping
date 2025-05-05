export async function fetchAddressByCep(cep) {
    const cleanCep = cep.replace(/\D/g, '');
  
    if (cleanCep.length !== 8) {
      throw new Error('CEP inválido');
    }
  
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
  
      if (data.erro) {
        throw new Error('CEP não encontrado');
      }
  
      return {
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      };
    } catch (error) {
      throw new Error('Erro ao buscar o CEP');
    }
  }
  