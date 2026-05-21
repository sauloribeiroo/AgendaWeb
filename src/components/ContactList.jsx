export default function ContactList({ contacts, onDelete, onRemovePhone }) {
  if (contacts.length === 0) {
    return <p className="empty">Nenhum contato cadastrado ainda.</p>;
  }

  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact.id} className="contact-item">
          <div className="contact-info">
            <strong>
              {contact.nome} {contact.sobrenome}
            </strong>
            <ul className="phone-list">
              {contact.telefones.map((tel, index) => (
                <li key={`${contact.id}-${index}`}>
                  <span>{tel}</span>
                  <button
                    type="button"
                    className="link"
                    onClick={() => onRemovePhone(contact, index)}
                    title="Remover este telefone"
                  >
                    remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="danger"
            onClick={() => onDelete(contact.id)}
          >
            Excluir contato
          </button>
        </li>
      ))}
    </ul>
  );
}
