import React, { Component } from 'react';
import { IAttachmentModel } from '../../models/IAttachmentModel';

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
    return <div id="attachment">{Name}</div>;
  }
}
