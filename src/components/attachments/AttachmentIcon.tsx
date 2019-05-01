import React, { Component } from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardImage,
  IDocumentCardStyles,
  IDocumentCardActivityPerson,
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { IAttachmentModel } from '../../models/IAttachmentModel';
import Moment from 'moment';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
import { ITheme } from '@uifabric/styling';

export interface Props {
  attachment: IAttachmentModel;
}

export class AttachmentIcon extends Component<Props, {}> {
  private theme: ITheme;
  constructor(props: Props) {
    super(props);
    this.theme = getTheme();
  }

  people: IDocumentCardActivityPerson[] = [
    { name: 'Christian Bergqvist', profileImageSrc: '', initials: 'CB' },
  ];

  cardStyles: IDocumentCardStyles = {
    root: {
      display: 'inline-block',
      marginRight: 20,
      marginBottom: 20,
      width: 320,
    },
  };

  render() {
    const { attachment } = this.props;
    const url = attachment ? (attachment.Url as string) : '';
    const modifiedOn = attachment
      ? Moment(attachment.ModifiedOn).format('l')
      : '–';
    const dType: string =
      attachment && attachment.Type ? attachment.Type.Name : 'TextDocument';
    const type = dType === 'Proof' ? 'DocumentApproval' : dType;
    return (
      <div>
        <DocumentCardImage
          height={120}
          imageFit={ImageFit.cover}
          iconProps={{
            iconName: type,
            styles: {
              root: {
                color: this.theme.palette.themePrimary,
                fontSize: '80px',
                width: '85px',
                height: '120px',
              },
            },
          }}
        />
        <DocumentCardActivity
          activity={modifiedOn}
          people={[this.people[0]]}
          theme={this.theme}
        />
      </div>
    );
  }
}
