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
import Loader from '../components/shared/Loader';
import { ApplicationState, reducers } from '../store/index';
import { IJobModel } from '../models/IJobModel';
import JobHeader from '../components/jobs/JobHeader';
import JobDetail from '../components/jobs/JobDetail';
import * as JobStore from '../store/JobStore';
import AppBreadcrumb from '../components/shared/AppBreadcrumb';

interface IProps {
  location?: string;
}

type Props = RouteComponentProps<IProps> &
  typeof JobStore.actionCreators &
  JobStore.IState;

interface IState {
  jobId: string;
  job: IJobModel;
  currentTab: string;
}

class JobDetailPage extends AppComponent<Props, IState> {
  private fetch: (id: string) => void;
  private currentTab: string;
  constructor(props: Props, state: IState) {
    super(props);
    this.fetch = AwesomeDebouncePromise((id: string) => {
      props.fetchRequest(id);
    }, 500);
    this.state = state;
    const hash = window.location.hash;
    this.currentTab = 'general';
    switch (hash) {
      case 'attachments':
        this.currentTab = 'attachments';
        break;
      case 'tasks':
        this.currentTab = 'tasks';
        break;
      default:
        this.currentTab = 'general';
        break;
    }
  }

  componentDidMount() {}

  componentWillMount() {
    const jobId = this.props.location.pathname.replace('/jobs', '');
    this.fetch(jobId);
  }

  render() {
    const { job, indicators } = this.props;
    console.log('job', job.Attachments);
    return (
      <div className="job-detail">
        <AppBreadcrumb show={true} job={job} />
        <Loader show={indicators.operationLoading} />
        <JobHeader job={job} />
        <JobDetail job={job} currentTab={this.currentTab} />
      </div>
    );
  }
}

var component = connect(
  (state: ApplicationState) => state.job,
  JobStore.actionCreators,
)(JobDetailPage as any);

export default (withRouter(component as any) as any) as typeof JobDetailPage;
