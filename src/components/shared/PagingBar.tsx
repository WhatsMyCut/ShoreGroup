import React, { Component } from 'react';
import Pagination, { PaginationProps } from 'office-ui-fabric-react-pagination';
import bind from 'bind-decorator';

export interface IProps {
  totalPages: number;
  limitPerPage?: number;
  currentPage: number;
  onChangePage: (pageNum: number) => void;
}

/* Below code of the 'Pagination' component was taken
from the https://github.com/ChoTotOSS/react-paginating
and remaked for the Bootstrap style. */

export class PagingBar extends Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

  protected elFirstPageBtn: HTMLElement;
  protected elLastPageBtn: HTMLElement;

  @bind
  public setFirstPage(): void {
    this.elFirstPageBtn.click();
  }

  @bind
  public setLastPage(): void {
    this.elLastPageBtn.click();
  }

  render() {
    return (
      <Pagination
        totalPages={this.props.totalPages + 1}
        //limit={this.props.limitPerPage}
        onChange={this.props.onChangePage}
        currentPage={this.props.currentPage}
      />
    );
  }
}
