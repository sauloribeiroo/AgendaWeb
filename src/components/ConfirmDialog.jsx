export default function ConfirmDialog({
  contact,
  newPhone,
  onConfirm,
  onDecline,
  onCancel
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h3>Contato já existente</h3>
        <p>
          Já existe um contato chamado{' '}
          <strong>
            {contact.nome} {contact.sobrenome}
          </strong>
          .
        </p>
        <p>
          Telefones atuais:{' '}
          <em>{contact.telefones.join(', ') || '(nenhum)'}</em>
        </p>
        <p>
          Deseja adicionar o telefone <strong>{newPhone}</strong> a esse
          contato?
        </p>

        <div className="modal-actions">
          <button type="button" className="primary" onClick={onConfirm}>
            Sim, adicionar a este contato
          </button>
          <button type="button" onClick={onDecline}>
            Não, criar um novo contato
          </button>
          <button type="button" className="link" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
