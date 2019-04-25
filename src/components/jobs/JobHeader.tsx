import React, { Component, MouseEvent } from 'react';
import {
  Shimmer,
  IShimmerStyleProps,
  IShimmerStyles,
  ShimmerElementsGroup,
  ShimmerElementType,
} from 'office-ui-fabric-react/lib/Shimmer';
import {
  mergeStyleSets,
  ITheme,
  createTheme,
} from 'office-ui-fabric-react/lib/Styling';
import {
  IJobModel,
  IJobStatusReason,
  formatStatusLabel,
} from '../../models/IJobModel';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
  job?: IJobModel;
}
const customThemeForShimmer: ITheme = createTheme({
  palette: {
    // palette slot used in Shimmer for main background
    neutralLight: '#bdd4ed',
    // palette slot used in Shimmer for tip of the moving wave
    neutralLighter: '#7AAFE7',
    // palette slot used in Shimmer for all the space around the shimmering elements
    white: '#fff',
  },
});
export default class JobHeader extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  private _getCustomElements = (backgroundColor?: string) => {
    return (
      <div style={{ display: 'flex' }}>
        <ShimmerElementsGroup
          backgroundColor={backgroundColor}
          shimmerElements={[
            { type: ShimmerElementType.circle, height: 40 },
            { type: ShimmerElementType.gap, width: 16, height: 40 },
          ]}
        />
        <ShimmerElementsGroup
          backgroundColor={backgroundColor}
          flexWrap={true}
          width="100%"
          shimmerElements={[
            {
              type: ShimmerElementType.line,
              width: '100%',
              height: 10,
              verticalAlign: 'bottom',
            },
            { type: ShimmerElementType.line, width: '90%', height: 8 },
            { type: ShimmerElementType.gap, width: '10%', height: 20 },
          ]}
        />
      </div>
    );
  };
  render() {
    const job = this.props.job as IJobModel;
    const status = job['StatusReason'] as IJobStatusReason;
    const label = status ? status.Label : '–';
    const statusClassName = formatStatusLabel(label);
    console.log('JobHeader', status, this.state, this.props);

    return (
      <div className="job-header">
        <div className="job-header-cells">
          <div className="job-header-info">
            <h5>Job</h5>
            <h4>{job.Name}</h4>
          </div>
          <div className="job-header-status">
            <h5>Status</h5>
            <h4 className={statusClassName}>{label}</h4>
          </div>
          <div className="job-header-owner">
            <h5>Owner</h5>
            <h4>[PLACEHOLDER]</h4>
          </div>
        </div>
      </div>
    );
  }
}
