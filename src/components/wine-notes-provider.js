import React from 'react';
import localForage from 'localforage';
import WineNoteRepository from '../model/wine-note-repository';
import CollectionRepository from '../model/collection-repository';
import Context from '../app-context';
import initialState from '../initialState.json';

const repository = WineNoteRepository();
const collectionsRepository = CollectionRepository();

class WineNotesProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      WineNotes: repository.filteredNotes(),
      Collections: [{
        name: 'collection one', description: 'description', date: '2/11/2012', id: '1',
      },
      {
        name: 'collection two', description: 'description', date: '2/11/2014', id: '2',
      }],
      settings: {
        autoInsertOn: false,
        wineMaker: '',
        tastingNotes: '',
        technicalNotes: '',
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
      saveSettings: this.saveSettings,
      saveSettingsCheckbox: this.saveSettingsCheckbox,
      saveSettingsSelect: this.saveSettingsSelect,
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
    localForage.getItem('settings').then(value => {
      if (value) {
        const settings = JSON.parse(value);
        this.setState({
          settings,
        });
      }
    });
    localForage.getItem('collections').then(value => {
      if (value) {
        const Collections = JSON.parse(value);
        this.setState({
          Collections,
        });
      }
    });
  }

  saveSettings = (name, value) => {
    this.setState(prevState => ({
      ...prevState,
      settings: {
        ...prevState.settings,
        [name]: value,
      },
    }));
    const { settings } = this.state;
    localForage.setItem('settings', JSON.stringify(settings));
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

  addCollection = collection => {
    collectionsRepository.addCollection(collection);
    this.updateCollectionState();
  }

  deleteCollection = collection => {
    collectionsRepository.deleteCollection(collection);
    this.updateCollectionState();
  }

  updateCollection = collection => {
    collectionsRepository.updateCollection(collection);
    this.updateCollectionState();
  }

  updateCollectionState = () => {
    this.setState(() => ({
      Collections: collectionsRepository.getCollections(),
    }));
    localForage.setItem('collections', JSON.stringify(collectionsRepository.getCollections()));
  }

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
