import React from 'react';
import AppComponent from '../shared/AppComponent';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { List } from 'office-ui-fabric-react/lib/components/List';
import { TooltipHost } from 'office-ui-fabric-react/lib/components/Tooltip';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import * as CommentStore from '../../store/CommentStore';
import { ICommentModel } from '../../models/ICommentModel';
import { IJobModel } from '../../models/IJobModel';
import { ApplicationState } from '../../store/index';

export interface ICommentPaneItem {
  color: string;
  Id: string;
  Subject: string;
  data?: JSX.Element;
}

interface ICommentProps extends RouteComponentProps {
  job?: IJobModel;
}

interface IState {
  currentComment?: ICommentModel;
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
    display: 'flex',
    flex: '1 1 100%',
    backgroundColor: theme.palette.themeLighter,
    padding: '5px 10px',
    color: theme.palette.themeDark,
    fontWeight: 'bold',
    borderBottom: '1px solid ' + theme.palette.themePrimary,
  },
  addCommentIcon: {
    display: 'flex',
    flex: '0 1 auto',
  },
  commentsHeaderText: {
    paddingTop: 5,
    display: 'flex',
    flex: '1 0 auto',
  },

  commentsListContainer: {
    padding: 10,
  },
  commentsList: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  noData: {
    color: theme.palette.themeDarkAlt,
  },
  commentRow: {
    flex: '1 1 100%',
  },
});

type Props = ICommentProps &
  typeof CommentStore.actionCreators &
  CommentStore.IState;

export class CommentsPane extends AppComponent<any, IState> {
  private fetch: (job: IJobModel, id: string) => void;
  constructor(props: Props) {
    super(props);
    this.fetch = AwesomeDebouncePromise((job: IJobModel, id: string) => {
      props.fetchCommentsRequest(job, id);
    }, 500);
    this.state = {};
  }

  componentWillMount() {}

  getItems(): ICommentPaneItem[] {
    // const { comments } = this.props;
    const retArr = [] as ICommentPaneItem[];
    // if (comments && comments.length > 0) {
    //   comments.map((x: ICommentPaneItem, i: number) => {
    //     retArr.push({
    //       color: '#fff',
    //       Id: i.toString(),
    //       Subject: x.Subject,
    //       data: <div>{x.Subject}</div>,
    //     });
    //   });
    // } else {
    //   retArr.push({
    //     color: 'transparent',
    //     Id: '-1',
    //     Subject: 'There are no Comments',
    //     data: <div className={classNames.noData}>No Comments. [ADD]</div>,
    //   });
    // }
    // console.log('retARr', comments, retArr);
    return retArr;
  }

  render() {
    return (
      <div className={classNames.commentContainer}>
        <div className={classNames.commentsHeader}>
          <div className={classNames.commentsHeaderText}>
            <Icon iconName={'Comment'} style={{ marginRight: 10 }} />
            Job Comments
          </div>
          <div className={classNames.addCommentIcon}>
            <TooltipHost
              content="Add a comment"
              id={'AddCommentButton'}
              calloutProps={{ gapSpace: 0 }}
            >
              <Icon
                iconName={'CircleAddition'}
                style={{ paddingTop: 5, fontSize: 18 }}
                ariaLabel={'Add a Comment'}
                title={'Add a Comment'}
              />
            </TooltipHost>
          </div>
        </div>
        <div className={classNames.commentsListContainer}>
          <List
            items={this.getItems()}
            onRenderCell={(item, itemProps) => {
              return (
                <div className={classNames.commentRow} {...itemProps}>
                  {item.data}
                </div>
              );
            }}
          />
        </div>
      </div>
    );
  }
}
var component = connect(
  (state: ApplicationState) => state.comments,
  CommentStore.actionCreators,
)(CommentsPane as any);

export default (withRouter(component as any) as any) as typeof CommentsPane;
