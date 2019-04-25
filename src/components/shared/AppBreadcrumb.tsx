import React from 'react';
import { isNode } from '../../Utils';
import AppComponent from './AppComponent';
import {
  Breadcrumb,
  IBreadcrumbItem,
  IDividerAsProps,
} from 'office-ui-fabric-react/lib/Breadcrumb';
import { TooltipHost } from 'office-ui-fabric-react/lib/components/Tooltip';
import { IJobModel } from '../../models/IJobModel';

export interface IProps {
  show: boolean;
  job?: IJobModel;
  location?: string;
}

export default class AppBreadcrumb extends AppComponent<IProps, {}> {
  private location: any;
  constructor(props) {
    super(props);
    this.location = (window as any).location;
  }

  private _onBreadcrumbItemClicked = (
    ev: React.MouseEvent<HTMLElement>,
    item: IBreadcrumbItem,
  ): void => {
    console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
  };

  private _getCustomDivider = (dividerProps: IDividerAsProps): JSX.Element => {
    const tooltipText = dividerProps.item ? dividerProps.item.text : '';
    return (
      <TooltipHost
        content={`Show ${tooltipText} contents`}
        calloutProps={{ gapSpace: 0 }}
      >
        <span aria-hidden="true" style={{ cursor: 'pointer' }}>
          /
        </span>
      </TooltipHost>
    );
  };

  private _getItems() {
    let items = [
      {
        text: 'Dashboard',
        key: 'home',
        onClick: this._onBreadcrumbItemClicked,
      },
      { text: 'Jobs', key: 'f1', onClick: this._onBreadcrumbItemClicked },
    ];

    if (this.props.job) {
      const jobId = this.props.job.Id || '–';
      const jobName = this.props.job.Name || '–';
      console.log('breadcrumb', jobId);
      items.push({ text: jobName, key: 'jobid', onClick: () => undefined });
    }
    return items;
  }

  private renderJobId() {
    const jobId = this.props.job ? this.props.job.Id : '–';
    return (
      <div className="app-breadcrumb-jobid nobr right smalltext">
        Job ID: {jobId}
      </div>
    );
  }

  render() {
    var css = { display: 'none' };
    if (!isNode()) {
      css = { display: this.props.show ? 'flex' : 'none' };
    }
    const items = this._getItems();
    return (
      <div className="app-breadcrumb" style={css}>
        <div className="app-breadcrumb-items">
          <Breadcrumb
            items={items}
            styles={{
              itemLink: { fontSize: 14 },
              root: { margin: 0, padding: 0, fontSize: 14 },
            }}
            dividerAs={this._getCustomDivider}
          />
        </div>
        {this.props.job ? this.renderJobId() : ''}
      </div>
    );
  }
}
