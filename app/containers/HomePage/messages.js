/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  startProjectHeader: {
    id: `${scope}.start_project.header`,
    defaultMessage: 'Welcome to CompliChain',
  },
  startProjectMessage: {
    id: `${scope}.start_project.message`,
    defaultMessage: 'Manage all jobs',
  },
  trymeHeader: {
    id: `${scope}.tryme.header`,
    defaultMessage: 'All Jobs',
  },
  trymeMessage: {
    id: `${scope}.tryme.message`,
    defaultMessage: 'Search Jobs',
  },
  trymeAtPrefix: {
    id: `${scope}.tryme.atPrefix`,
    defaultMessage: '#',
  },
});
