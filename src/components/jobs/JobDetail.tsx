import '../../styles/jobs.scss';
import React, { Component, MouseEvent } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IJobModel } from '../../models/IJobModel';
import Attachment from '../../components/attachments/Attachment';
import {
  getTheme,
  IDocumentCardPreviewProps,
  DocumentCard,
  DocumentCardType,
  DocumentCardDetails,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  IDocumentCardActivityPerson,
} from 'office-ui-fabric-react';
import { IAttachmentModel } from '../../models/IAttachmentModel';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
  job: IJobModel;
  currentTab?: string;
}

export interface IState {
  currentTab?: string;
}
export const State: IState = {
  currentTab: 'general',
};
export const theme = getTheme();
export const previewPropsUsingIcon: IDocumentCardPreviewProps = {
  previewImages: [
    {
      previewIconProps: {
        iconName: 'OpenFile',
        styles: { root: { fontSize: 42, color: theme.palette.white } },
      },
      width: 144,
    },
  ],
  styles: { previewIcon: { backgroundColor: theme.palette.themePrimary } },
};
export const people: IDocumentCardActivityPerson[] = [
  { name: 'Annie Lindqvist', profileImageSrc: '', initials: 'BB' },
  { name: 'Roko Kolar', profileImageSrc: '', initials: 'RK' },
  { name: 'Aaron Reid', profileImageSrc: '', initials: 'DD' },
  { name: 'Christian Bergqvist', profileImageSrc: '', initials: 'CB' },
];
export default class JobDetail extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props);
    this.state = state;
  }

  componentWillMount() {
    this.getHash();
  }

  alertClicked(e: MouseEvent) {
    console.log('alertClicked', e);
  }

  private setHash(hash: string) {
    (window as any).location.hash = hash;
    this.getHash();
  }

  private getHash = () => {
    let h = window.location.hash
      ? window.location.hash.replace('#', '')
      : 'general';
    this.setState({ currentTab: h });
  };

  // Data for CommandBar
  private getItems = () => {
    const hash = this.state.currentTab;
    return [
      {
        key: 'newItem',
        name: 'General',
        className: hash === 'general' || '' ? 'active' : '',
        iconProps: {
          iconName: 'Add',
        },
        ariaLabel: 'General',
        onClick: () => this.setHash('general'),
      },
      {
        key: 'attachments',
        name: 'Attachments',
        className: hash === 'attachments' ? 'active' : '',
        iconProps: {
          iconName: 'FilePDB',
        },
        ['data-automation-id']: 'uploadButton',
        onClick: () => this.setHash('attachments'),
      },
      {
        key: 'share',
        name: 'Tasks',
        className: hash === 'tasks' ? 'active' : '',
        iconProps: {
          iconName: 'ClipboardList',
        },
        onClick: () => this.setHash('tasks'),
      },
    ];
  };

  private _renderRow(x: IAttachmentModel) {
    return (
      <div>
        <Attachment attachment={x} />
      </div>
    );
  }

  private _renderAttachmentRow(x: IAttachmentModel) {
    const {
      Id,
      CreatedOn,
      ModifiedOn,
      Url,
      AzureBlobId,
      Name,
      Type,
      PrintReady,
      PageCount,
      SimplexOrDuplex,
      Orientation,
      Color,
      FlatSize,
      FinishSize,
      Stock,
      PlusCoverStock,
      Binding,
      Finishing,
      StatusReason,
      VariablePageLength,
    } = x;
    console.log('_renderAttachmentRow', x);
    return (
      <DocumentCard
        type={DocumentCardType.compact}
        onClickHref="javascript:void(0);"
      >
        <DocumentCardPreview {...previewPropsUsingIcon} />
        <DocumentCardDetails>
          <DocumentCardTitle
            title="View and share files"
            shouldTruncate={true}
          />
          <DocumentCardActivity
            activity="Created a few minutes ago"
            people={[people[2]]}
          />
        </DocumentCardDetails>
      </DocumentCard>
    );
  }

  private _renderAttachments() {
    let docs =
      (this.props.job.Attachments as IAttachmentModel[]) ||
      ([] as IAttachmentModel[]);

    return (
      <div className="attachments-container">
        {docs.map(x => this._renderAttachmentRow(x))}
      </div>
    );
  }

  render() {
    const { job } = this.props;
    const { currentTab } = this.state;
    let disabled = false;
    let checked = false;
    let generalActive = currentTab === 'general' || '' ? 'active' : '';
    let attachmentsActive = currentTab === 'attachments' ? 'active' : '';
    let tasksActive = currentTab === 'tasks' ? 'active' : '';
    let jobName = job ? job.Name : '–';
    let jobType = job && job.Type ? job.Type.Name : '–';
    let allAttachments = this._renderAttachments();
    return (
      <div className="job-detail-container">
        <div className="job-detail-main">
          <CommandBar
            items={this.getItems()}
            //overflowItems={this.getOverlflowItems()}
            overflowButtonProps={{ ariaLabel: 'More commands' }}
            //farItems={this.getFarItems()}
            ariaLabel={
              'Use left and right arrow keys to navigate between commands'
            }
          />
          <div className="job-detail-panel">
            <div className={'general ' + generalActive}>
              <div>
                <div>Job Name</div>
                <div>{jobName}</div>
              </div>
              <div>
                <h5>Job Type</h5>
                <p>{jobType}</p>
              </div>
            </div>
            <div className={'attachments ' + attachmentsActive}>
              {allAttachments}
            </div>
            <div className={'tasks ' + tasksActive}>
              <p>tasks</p>
            </div>
          </div>
        </div>
        <div className={'job-detail-comments'}>
          <h5>Comments</h5>
          <p>[PLACEHOLDER]</p>
        </div>
      </div>
    );
  }
}
