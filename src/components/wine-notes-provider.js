import React from 'react';
import localForage from 'localforage';
import WineNoteRepository from '../model/wine-note-repository';
import Context from '../app-context';
import initialState from '../initialState.json';

const repository = WineNoteRepository();

class WineNotesProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      WineNotes: repository.filteredNotes(),
      settings: {
        autoInsert: {
          on: false,
          wineMaker: '',
          wineNotes: '',
          technicalNotes: '',
        },
        nameOrder: 0,
      },
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

  componentDidMount() {
    localForage.getItem('wineNotes').then(value => {
      if (value) {
        const notes = JSON.parse(value);
        repository.setWineNotes(notes);
        this.setState({
          WineNotes: repository.filteredNotes(),
        });
      }
    });
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

  deleteNote = id => {
    repository.deleteNote(id);
    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
    localForage.setItem('wineNotes', JSON.stringify(repository.getNotes()));
  };

  filterNotes = filter => {
    this.setState(() => ({
      WineNotes: repository.filteredNotes(filter),
    }));
  };

  editNoteDialogToggle = () => {
    this.setState(prevState => ({
      editDialogOpen: !prevState.editDialogOpen,
    }));
  };

  setNoteDialog = open => {
    this.setState(() => ({
      editDialogOpen: open,
    }));
  };

  updateNote = (id, changes) => {
    repository.update(id, changes);
    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
    localForage.setItem('wineNotes', JSON.stringify(repository.getNotes()));
  };

  addNote = note => {
    repository.insert(note);
    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
    localForage.setItem('wineNotes', JSON.stringify(repository.getNotes()));
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider
        value={{
          state: this.state,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}
export default WineNotesProvider;
