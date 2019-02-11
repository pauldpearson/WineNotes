import React from 'react';
import WineNoteRepository from '../model/wine-note-repository';
import Context from '../app-context';
import initialState from '../initialState.json';

const repository = WineNoteRepository();


class WineNotesProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      WineNotes: repository.filteredNotes(),
      editDialogOpen: false,
      addTestData: this.addTestData,
      deleteNote: this.deleteNote,
      filterNotes: this.filterNotes,
      editNoteDialogToggle: this.editNoteDialogToggle,
      setNoteDialog: this.setNoteDialog,
      updateNote: this.updateNote,
      addNote: this.addNote,
    };
  }

  addTestData = () => {
    if (repository.getNotes().length === 0) {
      repository.setNotes(initialState.WineNotes);
    } else {
      repository.deleteAll();
      repository.setNotes(initialState.WineNotes);
    }

    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
  };

  deleteNote = (id) => {
    repository.deleteNote(id);
    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
  };

  filterNotes = (filter) => {
    this.setState(() => ({
      WineNotes: repository.filteredNotes(filter),
    }));
  };

  editNoteDialogToggle = () => {
    this.setState(prevState => ({
      editDialogOpen: !prevState.editDialogOpen,
    }));
  };

  setNoteDialog = (open) => {
    this.setState(() => ({
      editDialogOpen: open,
    }));
  };

  updateNote = (id, changes) => {
    repository.update(id, changes);
    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
  };

  addNote = (note) => {
    repository.insert(note);
    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={{
        state: this.state,
      }}
      >
        {children}
      </Context.Provider>
    );
  }
}
export default WineNotesProvider;
