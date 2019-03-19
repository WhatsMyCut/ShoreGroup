import { ITaskModel } from "../../models/ITaskModel";
import * as React from "react";
import bind from 'bind-decorator';
import { Form } from "../shared/Form";
import { Formik } from 'formik';

export interface IProps {
  data: ITaskModel;
}

export default class TaskEditor extends React.Component<IProps, {}> {
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

  componentDidMount() {
  }

  render() {

    return <Formik
      enableReinitialize={true}
      initialValues={{
        name: this.props.data.name || '',
        description: this.props.data.description || ''
      }}
      onSubmit={(values, { setSubmitting }) => {
      }}
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
          <Form className="form" ref={x => this.elForm = x}>
            <input type="hidden" name="taskID" defaultValue={(this.props.data.taskID || 0).toString()} />
            <div className="form-group">
              <label className="control-label required" htmlFor="task__name">Task Name</label>
              <input
                type="text"
                className="form-control"
                id="task__name"
                name="name"
                data-value-type="string"
                data-val-required="true"
                data-msg-required="Task name is required."
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label className="control-label required" htmlFor="task__description">Description</label>
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
          </Form>)}
    </Formik>;
  }
}