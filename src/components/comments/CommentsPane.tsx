import React, { Component, MouseEvent } from 'react';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

interface ICommentPaneItem {
  color: string;
  Id: string;
  Name: string;
  data?: JSX.Element;
}

interface IProps {
  comments?: any;
}

interface IState {
  currentTab?: string;
}
const theme = getTheme();
const classNames = mergeStyleSets({
  commentContainer: {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'column',
    padding: 0,
  },
  commentsHeader: {
    backgroundColor: theme.palette.themeLight,
    padding: 10,
    color: theme.palette.themeDark,
    fontWeight: 'bold',
    borderBottom: '1px solid ' + theme.palette.themePrimary,
  },
  commentsList: {
    padding: 10,
  },
});

export class CommentsPane extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentTab: 'sometab',
    };
  }

  render() {
    return (
      <div className={classNames.commentContainer}>
        <div className={classNames.commentsHeader}>
          <Icon iconName={'Comment'} style={{ marginRight: 10 }} />
          Job Comments
        </div>
        <div className={classNames.commentsList} />
      </div>
    );
  }
}
