import React, { Component, MouseEvent } from 'react';
import { ModalComponent } from '../shared/ModalComponent';
import { ICommentModel } from '../../models/ICommentModel';

interface IProps {
  onSaveComment?: any;
}

interface IState {
  modelForEdit?: ICommentModel;
}

export default class CommentModal extends Component<IProps, IState> {
  private elModalDelete: ModalComponent;
  constructor(props: IProps) {
    super(props);
  }

  private onClickJobEditorDelete__saveBtn(
    e: MouseEvent<HTMLButtonElement>,
  ): void {
    this.props.onSaveComment(this.state.modelForEdit.Id);
    this.elModalDelete.hide();
  }

  render() {
    return (
      <ModalComponent
        ref={x => (this.elModalDelete = x)}
        buttons={
          <div>
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className={'btn btn-danger'}
              onClick={this.onClickJobEditorDelete__saveBtn}
            >
              Save
            </button>
          </div>
        }
        title={`Save Comment: #${this.state.modelForEdit.Id} ${
          this.state.modelForEdit.ContentText
        }`}
      >
        {this.props.children}
      </ModalComponent>
    );
  }
}
