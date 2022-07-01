import { createSignal, createMemo } from 'solid-js';

const tagClass =
  'bg-blue-100 text-blue-900 outline-0 rounded-full px-2 text-sm h-6 border-2 border-blue-900';

export default function (props) {
  const [getInput, setInput] = createSignal('');

  function onSubmit(event) {
    event.preventDefault();
    if (validTagInput()) {
      console.log(event, getInput());
      props.tagsChanged([...props.tags, getInput().toLowerCase().trim()]);
      setInput('');
    }
  }

  const validTagInput = createMemo(
    () => getInput() && !props.tags.includes(getInput().toLowerCase())
  );

  function TagBox(boxProps) {
    function removeTag() {
      props.tagsChanged(props.tags.filter((tag) => tag !== boxProps.tag));
    }

    return (
      <button class={`${tagClass} hover:bg-blue-500`} onClick={removeTag}>
        {boxProps.tag}
      </button>
    );
  }

  return (
    <div class="flex w-full gap-1 flex-wrap">
      <For each={props.tags}>{(tag) => <TagBox tag={tag} />}</For>
      <form class={`ml-auto ${tagClass}`} onSubmit={onSubmit}>
        <input
          type="text"
          value={getInput()}
          onInput={(e) => setInput(e.target.value)}
          class={`w-24 h-5 border-0 text-sm bg-blue-100`}
          style={{ 'box-shadow': 'none' }}
          placeholder="add tag"
        ></input>
        <button disabled={!validTagInput()} class="disabled:opacity-50">
          ⏎
        </button>
      </form>
    </div>
  );
}
