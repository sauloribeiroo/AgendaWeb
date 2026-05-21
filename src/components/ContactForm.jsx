import { useState } from 'react';

const initialState = { nome: '', sobrenome: '', telefone: '' };

export default function ContactForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim()) {
      setError('Nome e telefone são obrigatórios.');
      return;
    }
    setError('');
    onSubmit({
      nome: form.nome,
      sobrenome: form.sobrenome,
      telefone: form.telefone
    });
    setForm(initialState);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="nome">Nome*</label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={form.nome}
          onChange={handleChange}
          placeholder="Ex.: Maria"
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="sobrenome">Sobrenome</label>
        <input
          id="sobrenome"
          name="sobrenome"
          type="text"
          value={form.sobrenome}
          onChange={handleChange}
          placeholder="Ex.: Silva"
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="telefone">Telefone*</label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          value={form.telefone}
          onChange={handleChange}
          placeholder="Ex.: (11) 99999-0000"
          autoComplete="off"
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" className="primary">
        Cadastrar
      </button>
    </form>
  );
}
