import React from 'react';
import {
  ItemPrimitive as GItem,
  ThemeProvider,
  modeGenerator,
} from '@atlaskit/navigation-next';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import EmojiNatureIcon from '@atlaskit/icon/glyph/emoji/nature';

const createItems = [
  {
    title: null,
    items: [
      ['/#jobs/ass', 'Create a Job', 'Create a Job', CalendarIcon],
      ['/#tasks/add', 'Create a Task', 'Create a Task', EmojiNatureIcon],
    ],
  },
];

const customMode = modeGenerator({
  product: {
    text: '#000',
    background: '#FFF',
  },
});

export default props => (
  <ThemeProvider
    theme={theme => ({ ...theme, mode: customMode, context: 'product' })}
  >
    <ul
      style={{
        listStyleType: 'none',
        margin: '0',
        padding: 0,
      }}
      className="drawer-item"
    >
      {createItems.map(itemGroup => (
        <li key={itemGroup.title} style={{ padding: 0, paddingRight: 8 }}>
          <strong style={{ display: 'block' }}>{itemGroup.title}</strong>
          {itemGroup.items.map(item => {
            const [url, text, label, Icon] = item;
            return (
              <GItem
                key={url}
                href={url}
                before={() => <Icon label={label} />}
                text={text.valueOf()}
                onClick={props.onItemClicked}
              />
            );
          })}
        </li>
      ))}
    </ul>
  </ThemeProvider>
);
