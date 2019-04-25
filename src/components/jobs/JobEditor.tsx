import { IJobModel } from '../../models/IJobModel';
import React, { Component } from 'react';
import bind from 'bind-decorator';
import { Form } from '../shared/Form';
import { Formik } from 'formik';

export interface IProps {
  data: IJobModel;
}

export default class JobEditor extends Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

  public elForm: Form;

  @bind
  public emptyForm(): void {
    if (this.elForm) {
      this.elForm.emptyForm();
    }
  }

  componentDidMount() {}

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: this.props.data.Name || '',
          description: this.props.data.Description || '',
        }}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form className="form" ref={x => (this.elForm = x)}>
            <input
              type="hidden"
              name="jobID"
              defaultValue={(this.props.data.Id || 0).toString()}
            />
            <div className="form-group">
              <label className="control-label required" htmlFor="task__name">
                Job Name
              </label>
              <input
                type="text"
                className="form-control"
                id="task__name"
                name="name"
                data-value-type="string"
                data-val-required="true"
                data-msg-required="Job name is required."
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label
                className="control-label required"
                htmlFor="task__description"
              >
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="task__description"
                name="description"
                data-value-type="string"
                data-val-required="false"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
