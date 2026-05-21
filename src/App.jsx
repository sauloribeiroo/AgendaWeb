import { useEffect, useState } from 'react';
import { onValue, push, ref, remove, update } from 'firebase/database';
import { db } from './firebase.js';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';

const CONTACTS_PATH = 'contatos';

function normalizeName(name) {
  return name.trim().toLowerCase();
}

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [pending, setPending] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const contactsRef = ref(db, CONTACTS_PATH);
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, value]) => ({
        id,
        nome: value.nome || '',
        sobrenome: value.sobrenome || '',
        telefones: Array.isArray(value.telefones)
          ? value.telefones
          : value.telefone
            ? [value.telefone]
            : []
      }));
      list.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
      setContacts(list);
    });
    return () => unsubscribe();
  }, []);

  function showFeedback(message) {
    setFeedback(message);
    setTimeout(() => setFeedback(''), 3000);
  }

  async function createContact({ nome, sobrenome, telefone }) {
    await push(ref(db, CONTACTS_PATH), {
      nome: nome.trim(),
      sobrenome: sobrenome.trim(),
      telefones: [telefone.trim()]
    });
    showFeedback(`Contato "${nome}" cadastrado.`);
  }

  async function appendPhone(existing, telefone) {
    const telefones = [...existing.telefones, telefone.trim()];
    await update(ref(db, `${CONTACTS_PATH}/${existing.id}`), { telefones });
    showFeedback(`Telefone adicionado a "${existing.nome}".`);
  }

  function handleSubmit(data) {
    const duplicate = contacts.find(
      (c) => normalizeName(c.nome) === normalizeName(data.nome)
    );
    if (duplicate) {
      setPending({ data, duplicate });
      return;
    }
    createContact(data);
  }

  async function confirmAddToExisting() {
    if (!pending) return;
    await appendPhone(pending.duplicate, pending.data.telefone);
    setPending(null);
  }

  async function declineAndCreateNew() {
    if (!pending) return;
    await createContact(pending.data);
    setPending(null);
  }

  async function handleDelete(id) {
    await remove(ref(db, `${CONTACTS_PATH}/${id}`));
    showFeedback('Contato removido.');
  }

  async function handleRemovePhone(contact, index) {
    const telefones = contact.telefones.filter((_, i) => i !== index);
    if (telefones.length === 0) {
      await handleDelete(contact.id);
      return;
    }
    await update(ref(db, `${CONTACTS_PATH}/${contact.id}`), { telefones });
    showFeedback('Telefone removido.');
  }

  return (
    <div className="app">
      <header>
        <h1>Agenda de Contatos</h1>
        <p className="subtitle">React + Firebase Realtime Database</p>
      </header>

      <main>
        <section className="card">
          <h2>Novo contato</h2>
          <ContactForm onSubmit={handleSubmit} />
        </section>

        <section className="card">
          <h2>Contatos ({contacts.length})</h2>
          <ContactList
            contacts={contacts}
            onDelete={handleDelete}
            onRemovePhone={handleRemovePhone}
          />
        </section>
      </main>

      {feedback && <div className="toast">{feedback}</div>}

      {pending && (
        <ConfirmDialog
          contact={pending.duplicate}
          newPhone={pending.data.telefone}
          onConfirm={confirmAddToExisting}
          onDecline={declineAndCreateNew}
          onCancel={() => setPending(null)}
        />
      )}
    </div>
  );
}
