import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import bind from 'bind-decorator';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { ILoginModel } from '../models/ILoginModel';
import Loader from '../components/shared/Loader';
import { ApplicationState } from '../store/index';
import * as LoginStore from '../store/LoginStore';
import '../styles/main.scss';
import { Form } from '../components/shared/Form';
import AppComponent from '../components/shared/AppComponent';

type Props = RouteComponentProps<{}> &
  typeof LoginStore.actionCreators &
  LoginStore.IState;

class LoginPage extends AppComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  elLoader: Loader;
  elForm: Form;

  componentDidMount() {
    this.props.init();
    if (this.elLoader) {
      this.elLoader.forceUpdate();
    }
  }

  @bind
  private async onClickSubmitBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (this.elForm.isValid()) {
      var data = this.elForm.getData<ILoginModel>();
      this.props.loginRequest();
    }
  }

  render() {
    if (this.props.indicators.loginSuccess) {
      return <Redirect to="/" />;
    }

    return (
      <div id="loginPage">
        <Helmet>
          <title>Login - CompliChain</title>
        </Helmet>
        <Loader
          ref={x => (this.elLoader = x)}
          show={this.props.indicators.operationLoading}
        />
        <div id="loginContainer">
          <p className="text-center">Type any login and password to enter.</p>
          <Form ref={x => (this.elForm = x)}>
            <div className="form-group">
              <label htmlFor="inputLogin">Login</label>
              <input
                type="text"
                name="login"
                data-value-type="string"
                className="form-control"
                id="inputLogin"
                data-val-required="true"
                data-msg-required="Login is required."
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputLogin">Password</label>
              <input
                type="password"
                name="password"
                data-value-type="string"
                className="form-control"
                id="inputPassword"
                data-val-required="true"
                data-msg-required="Password is required."
              />
            </div>
            <div className="form-inline">
              <button
                className="btn btn-success"
                onClick={this.onClickSubmitBtn}
              >
                Sign in
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

var component = connect(
  (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
  LoginStore.actionCreators, // Selects which action creators are merged into the component's props
)(LoginPage as any);

export default (withRouter(component as any) as any) as typeof LoginPage;
