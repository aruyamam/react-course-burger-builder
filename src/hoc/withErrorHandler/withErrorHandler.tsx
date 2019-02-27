import React, { Component, Fragment } from 'react';
import {
   AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError,
} from 'axios';
import Modal from '../../components/UI/Modal/Modal';

interface IState {
   error: AxiosError | null;
}

const withErrorHandler = <P extends object>(
   WrapperComponent: React.ComponentType<P>,
   axios: AxiosInstance,
) => class extends Component<P> {
      state: IState = {
         error: null,
      };

      public componentDidMount() {
         axios.interceptors.request.use((req: AxiosRequestConfig) => {
            this.setState({ error: null });

            return req;
         });

         axios.interceptors.response.use(
            (res: AxiosResponse) => res,
            (error) => {
               console.log(error);
               this.setState({ error });
            },
         );
      }

      public render() {
         const { error } = this.state;

         return (
            <Fragment>
               <Modal show={!!error} toggleModal={this.errorConfirmHanlder}>
                  {error && error.message}
               </Modal>
               <WrapperComponent {...this.props as P} />
            </Fragment>
         );
      }

      private errorConfirmHanlder = () => {
         this.setState({ error: null });
      };
};

export default withErrorHandler;
