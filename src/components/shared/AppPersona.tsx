import React, { Component } from 'react';
import {
  IPersonaSharedProps,
  Persona,
  IPersonaProps,
} from 'office-ui-fabric-react/lib/components/Persona';
import {
  mergeStyleSets,
  ITheme,
  createTheme,
} from 'office-ui-fabric-react/lib/Styling';
import {
  Shimmer,
  IShimmerStyleProps,
  IShimmerStyles,
  ShimmerElementsGroup,
  ShimmerElementType,
} from 'office-ui-fabric-react/lib/Shimmer';
import { IJobOwner, IJobAccount, IJobModel } from '../../models/IJobModel';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

export const customThemeForShimmer: ITheme = createTheme({
  palette: {
    // palette slot used in Shimmer for main background
    neutralLight: '#ccc',
    // palette slot used in Shimmer for tip of the moving wave
    neutralLighter: '#eee',
    // palette slot used in Shimmer for all the space around the shimmering elements
    white: '#fff',
  },
});

export const _getDefaultPersona = () => {
  return (
    <div className={'default-persona'}>
      <Shimmer
        customElementsGroup={_getCustomElements(
          customThemeForShimmer.palette.white,
        )}
        shimmerColors={{
          shimmer: customThemeForShimmer.palette.neutralLighter,
          shimmerWave: customThemeForShimmer.palette.neutralLight,
        }}
      />
    </div>
  );
};

export const _getOwnerPersona = (owner: IJobOwner) => {
  const ownerInitials =
    owner.FullName.split(' ')[0].charAt(0) +
      owner.FullName.split(' ')[1].charAt(0) || '?';
  const examplePersona: IPersonaSharedProps = {
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
  };

  const personaWithInitials: IPersonaSharedProps = {
    ...examplePersona,
    text: owner.FullName,
    imageInitials: ownerInitials,
  };
  return <Persona {...personaWithInitials} />;
};

export const _getAccountPersona = (account: IJobAccount) => {
  const accountInitials =
    account.Name.split(' ')[0].charAt(0) +
      account.Name.split(' ')[1].charAt(0) || '?';
  const examplePersona: IPersonaSharedProps = {
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
  };

  const personaWithInitials: IPersonaSharedProps = {
    //...examplePersona,
    text: account.Name,
    imageInitials: accountInitials,
  };
  return <Persona {...personaWithInitials} />;
};

export const _getJobPersona = (job: IJobModel) => {
  const jobInitials = '?';
  const examplePersona: IPersonaSharedProps = {
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
  };

  const personaWithInitials: IPersonaSharedProps = {
    //...examplePersona,
    text: job.Name,
    imageInitials: jobInitials,
  };
  return <Persona {...personaWithInitials} />;
};

export const _onRenderCoin = (job: IPersonaSharedProps): JSX.Element => {
  return (
    <div>
      <Icon iconName={'Suitcase'} className={'ms-JobIconExample'} />
    </div>
  );
};
export const _getCustomElements = (backgroundColor?: string) => {
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
