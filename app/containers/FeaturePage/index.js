/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';

export default class FeaturePage extends React.Component {
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Add Job</title>
          <meta name="description" content="Add Job to CompliChain by Sepire" />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <form>
          <div className="form-group input">
            <label htmlFor="job_title">Title:</label>
            <input id="job_title" name="job_title" type="text" />
          </div>
          <div className="form-group input">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
