import React from 'react';
import { isNode } from '../../Utils';
import AppComponent from './AppComponent';
import {
  Breadcrumb,
  IBreadcrumbItem,
  IDividerAsProps,
} from 'office-ui-fabric-react/lib/Breadcrumb';
import { TooltipHost } from 'office-ui-fabric-react/lib/components/Tooltip';

export interface IProps {
  show: boolean;
}

export default class AppBreadcrumb extends AppComponent<IProps, {}> {
  constructor(props) {
    super(props);
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
  render() {
    var css = { display: 'none' };
    if (!isNode()) {
      css = { display: this.props.show ? 'block' : 'none' };
    }
    return (
      <div className="Breadcrumb-bg" style={css}>
        <Breadcrumb
          items={[
            {
              text: 'Dashboard',
              key: 'home',
              onClick: this._onBreadcrumbItemClicked,
            },
            { text: 'Jobs', key: 'f1', onClick: this._onBreadcrumbItemClicked },
          ]}
          styles={{ itemLink: { fontSize: 14 }, root: { fontSize: 14 } }}
          dividerAs={this._getCustomDivider}
        />
      </div>
    );
  }
}
