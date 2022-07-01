import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import './index.css';
import NoteBubble from './components/NoteBubble.jsx';
import TagsView from './components/TagsView.jsx';

const App = () => {
  const [tags, setTags] = createStore([]);

  const [notes, setNotes] = createStore([
    {
      body: 'my first note',
      tags: ['note', 'dummy'],
    },
  ]);

  const [getEditingIndex, setEditingIndex] = createSignal(false);

  const [getInput, setInput] = createSignal('');

  function submitted(event) {
    event.preventDefault();

    if (getEditingIndex() !== false) {
      setEditingIndex(false);
    } else {
      setNotes([
        {
          body: getInput(),
          tags: [],
        },
        ...notes,
      ]);
    }

    setInput('');
  }

  function updateTags(noteIndex, newTags) {
    setNotes(noteIndex, 'tags', newTags);
  }

  function editNote(index) {
    if (getEditingIndex() !== false) {
      setEditingIndex(false);
      setInput('');
      return;
    }
    setEditingIndex(index);
    setInput(notes[index].body);
  }

  function onTextInput(event) {
    if (getEditingIndex() !== false) {
      setNotes(getEditingIndex(), 'body', event.target.value);
    }
    setInput(event.target.value);
  }

  return (
    <div class="h-screen w-screen flex justify-center">
      <div class="w-96 h-full flex flex-col">
        <ul class="flex flex-col-reverse h-full">
          <For each={notes}>
            {(el, i) => (
              <NoteBubble
                body={el.body}
                tags={el.tags}
                editing={getEditingIndex() === i()}
                tagsChanged={(newTags) => updateTags(i(), newTags)}
                editClicked={() => editNote(i())}
              />
            )}
          </For>
        </ul>

        <form class="border w-full flex" onSubmit={submitted}>
          <textarea
            rows={3}
            class="flex-grow border-none text-sm transition
            ease-in-out"
            value={getInput()}
            onInput={onTextInput}
          />
          <button disabled={!getInput()} class="text-3xl disabled:opacity-20">
            ⏎
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
