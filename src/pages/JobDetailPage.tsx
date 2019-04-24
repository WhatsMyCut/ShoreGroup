/**
 * Job Detail Page
 *
 * @author Mike Taylor <mike.taylor@shoregrp.com>
 */

import React, { MouseEvent, ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import bind from 'bind-decorator';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Moment from 'moment';

import AppComponent from '../components/shared/AppComponent';
import { ApplicationState, reducers } from '../store/index';
import { IJobModel } from '../models/IJobModel';
import * as JobStore from '../store/JobStore';
type Props = RouteComponentProps<{}> &
  typeof JobStore.actionCreators &
  JobStore.IState;

interface IState {
  searchTerm: string;
  pageNum: number;
  limitPerPage: number;
  rowOffset: number;
  modelForEdit: IJobModel;
  job?: IJobModel[];
}

class JobDetailPage extends AppComponent<Props, IState> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return <div> Job Details Page </div>;
  }
}

var component = connect(
  (state: ApplicationState) => state.jobs,
  JobStore.actionCreators,
)(JobDetailPage as any);

export default (withRouter(component as any) as any) as typeof JobDetailPage;
