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
import { IJobStatusReason } from '../../models/IJobModel';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
  statusLabel?: IJobStatusReason;
  owner?: string;
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
  constructor(props) {
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
    return (
      <div className="jobHeader">
        <div className="jobHeaderCells">
          <div className="jobHeader-info">
            <h3>Job</h3>
            <Shimmer
              customElementsGroup={this._getCustomElements(
                customThemeForShimmer.palette.white,
              )}
              width={300}
              shimmerColors={{
                shimmer: customThemeForShimmer.palette.themeTertiary,
                shimmerWave: customThemeForShimmer.palette.themeSecondary,
              }}
            />
          </div>
          <div className="jobHeader-status">
            <h3>Status</h3>
            <h4>{this.props.statusLabel}</h4>
          </div>
          <div className="jobHeader-owner">
            <h3>Owner</h3>
            <h4>{this.props.checked}</h4>
          </div>
        </div>
      </div>
    );
  }
}
