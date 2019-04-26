import React, { Component } from 'react';
import { IAttachmentModel } from '../../models/IAttachmentModel';
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
import { DocumentCardTitleBase } from 'office-ui-fabric-react/lib/components/DocumentCard/DocumentCardTitle.base';
import Moment from 'moment';
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

interface IProps {
  attachment?: IAttachmentModel;
}

type Props = IProps;

export default class Attachment extends Component<Props, {}> {
  props: Props;

  constructor(props) {
    super(props);
  }

  public render() {
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
    } = this.props.attachment;
    const typeLabel = Type ? Type.Name : '';
    return (
      <div className="attachment-item">
        <DocumentCard
          type={DocumentCardType.compact}
          onClickHref="javascript:void(0);"
        >
          <DocumentCardPreview {...previewPropsUsingIcon} />
          <DocumentCardDetails>
            <DocumentCardTitle title={Name} shouldTruncate={true} />
            <DocumentCardTitle
              title={Moment(CreatedOn).format('l')}
              shouldTruncate={true}
              showAsSecondaryTitle={true}
            />
            <DocumentCardActivity
              activity="Created a few minutes ago"
              people={[people[2]]}
            />
          </DocumentCardDetails>
        </DocumentCard>
      </div>
    );
  }
}
