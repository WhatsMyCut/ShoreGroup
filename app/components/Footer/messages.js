/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.Footer';

export default defineMessages({
  licenseMessage: {
    id: `${scope}.license.message`,
    defaultMessage: 'Copyright Sepire CompliChain',
  },
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: '',
  },
});
