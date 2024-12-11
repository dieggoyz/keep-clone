const notesContainer = document.getElementById('notes')

const createNoteCard = (note) => `
  <div onclick="showNoteModal('${note.id}')" class="card note h-100">
    <div class="card-body">
      <div class="card-edit">
        <i class="fa-solid fa-pen"></i>
      </div>
      <h5 class="card-title">${note.title}</h5>
      <p class="card-text">${note.content}</p>
    </div>
  </div>
`

const displayNote = (note) => {
	const noteCard = document.createElement('div')
	noteCard.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2', 'mb-3')
	noteCard.innerHTML = createNoteCard(note)
	notesContainer.prepend(noteCard)
}

const loadNotes = () => {
	const notes = JSON.parse(localStorage.getItem('notes')) || []
	notesContainer.innerHTML = ''
	notes.sort((a, b) => a.id - b.id).forEach(displayNote)
}

const addNote = () => {
	const title = document.querySelector("input[name='title']").value.trim()
	const content = document.querySelector("textarea[name='content']").value.trim()

	if (!title && !content) return

	const note = {
		id: Date.now().toString(),
		title,
		content,
	}

	const notes = JSON.parse(localStorage.getItem('notes')) || []
	notes.push(note)
	localStorage.setItem('notes', JSON.stringify(notes))

	document.querySelector("input[name='title']").value = ''
	document.querySelector("textarea[name='content']").value = ''

	loadNotes()
}

const showNoteModal = (noteId) => {
	const notes = JSON.parse(localStorage.getItem('notes')) || []
	const note = notes.find((n) => n.id === noteId)

	if (!note) return

	document.querySelector("input[name='modal-title']").value = note.title
	document.querySelector("textarea[name='modal-content']").value = note.content

	const deleteButton = document.querySelector('.btn-delete')
	deleteButton.onclick = () => deleteNote(noteId)

	const saveButton = document.querySelector('.btn-save')
	saveButton.onclick = () => saveNote(noteId)

	const noteModal = new bootstrap.Modal(document.getElementById('modal'))
	noteModal.show()
}

const saveNote = (noteId) => {
	const notes = JSON.parse(localStorage.getItem('notes')) || []
	const note = notes.find((n) => n.id === noteId)

	if (!note) return

	note.title = document.querySelector("input[name='modal-title']").value
	note.content = document.querySelector("textarea[name='modal-content']").value

	localStorage.setItem('notes', JSON.stringify(notes))
	loadNotes()
}

const deleteNote = (noteId) => {
	let notes = JSON.parse(localStorage.getItem('notes')) || []
	notes = notes.filter((n) => n.id !== noteId)

	localStorage.setItem('notes', JSON.stringify(notes))
	loadNotes()
}

const init = () => {
	loadNotes()
	document.querySelector('.add').addEventListener('click', (e) => {
		e.preventDefault()
		addNote()
	})
}

init()
