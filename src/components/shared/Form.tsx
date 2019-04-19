import React from 'react';
import { NSerializeJson } from 'nserializejson';
import { emptyForm } from '../../Utils';
import bind from 'bind-decorator';
import AppComponent from './AppComponent';

export interface IProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: any;
}

export class Form extends AppComponent<IProps, {}> {
  props: IProps;

  constructor(props) {
    super(props);
  }

  public validator: any;
  protected elForm: HTMLFormElement;

  @bind
  public isValid(): boolean {
    return true; // this.validator.isValid();
  }

  @bind
  public emptyForm(): void {
    emptyForm(this.elForm);
  }

  @bind
  public getData<T>(): T {
    return (NSerializeJson.serializeForm(this.elForm) as any) as T;
  }

  componentDidMount() {
    this.validator = {}; //new NValTippy(this.elForm);
  }

  render() {
    return (
      <form {...this.props} ref={x => (this.elForm = x)}>
        {this.props.children}
      </form>
    );
  }
}
