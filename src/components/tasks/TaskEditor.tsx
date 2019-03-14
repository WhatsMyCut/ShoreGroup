import { ITaskModel } from "../../models/ITaskModel";
import * as React from "react";
import { Form } from "../shared/Form";
import { Formik } from 'formik';

export interface IProps {
    data: ITaskModel;
}

const TaskEditor = (props: IProps) => {
    let elForm: Form;

    const emptyForm = (): void => {
        if (elForm) {
            elForm.emptyForm();
        }
    }

    return <Formik
        enableReinitialize={true}
        initialValues={{
            name: props.data.name || '',
            description: props.data.description || ''
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
        }) => (<Form className="form" ref={(x: any) => elForm = x}>
            <input type="hidden" name="taskID" defaultValue={(props.data.taskID || 0).toString()} />
            <div className="form-group">
                <label className="control-label required" htmlFor="task__name">Task Name</label>
                <input type="text" className="form-control" id="task__name" name={nameof<ITaskModel>(x => x.name)} data-value-type="string" data-val-required="true" data-msg-required="Task name is required." value={values.name} onChange={handleChange} onBlur={handleBlur} />
            </div>
            <div className="form-group">
                <label className="control-label required" htmlFor="task__description">Description</label>
                <input type="text" className="form-control" id="task__description" name={nameof<ITaskModel>(x => x.description)} data-value-type="string" data-val-required="false" value={values.description} onChange={handleChange} onBlur={handleBlur} />
            </div>
        </Form>)}
    </Formik>;
};