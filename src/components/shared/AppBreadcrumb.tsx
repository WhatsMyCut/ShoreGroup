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
import { IStyle, ITheme } from '@uifabric/styling';

export interface IProps {
  show: boolean;
  job?: IJobModel;
  location?: string;
  styles?: IStyle;
  theme?: ITheme;
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
    let c = JSON.stringify(item);
    console.log(`Breadcrumb item with key "${item.href}" has been clicked.`);
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
        text: 'Jobs',
        key: 'f1',
        href: '/jobs',
        onClick: this._onBreadcrumbItemClicked,
      },
    ];

    if (this.props.job) {
      const jobId = this.props.job.Id || '–';
      const jobName = this.props.job.Name || '–';
      items.push({
        text: jobName,
        key: 'jobid',
        href: '',
        onClick: () => undefined,
      });
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
    const styles = this.props.styles ? this.props.styles : ({} as IStyle);
    const theme = this.props.theme ? this.props.theme : ({} as ITheme);
    const fontVariant = styles['fontSize'] ? styles['fontSize'] : 14;

    return (
      <div className="app-breadcrumb" style={css}>
        <div className="app-breadcrumb-items">
          <Breadcrumb
            items={items}
            styles={{
              itemLink: styles,
              root: { margin: 0, padding: 0, fontSize: fontVariant },
            }}
            dividerAs={this._getCustomDivider}
          />
        </div>
        {this.props.job ? this.renderJobId() : ''}
      </div>
    );
  }
}
