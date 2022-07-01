import { createSignal } from 'solid-js';
import TagsView from './TagsView.jsx';

export default function (props) {
  const [getExpanded, setExpanded] = createSignal();

  function toggleExpanded() {
    setExpanded((expanded) => !expanded);
  }

  function editButtonClicked(event) {
    props.editClicked();
  }

  return (
    <li
      class="whitespace-pre rounded-xl mb-1 px-2 bg-blue-500 text-white border-2"
      classList={{
        'border-dashed': props.editing,
        'border-blue-500': !props.editing,
      }}
    >
      <div class="flex w-full gap-1">
        <div class="grow">{props.body}</div>
        <button class="font-bold" onClick={editButtonClicked}>
          ✎
        </button>
        <button
          class="transition-transform"
          classList={{ 'rotate-90': getExpanded() }}
          onClick={toggleExpanded}
        >
          ▶
        </button>
      </div>
      <Show when={getExpanded()}>
        <TagsView tags={props.tags} tagsChanged={props.tagsChanged} />
      </Show>
    </li>
  );
}
