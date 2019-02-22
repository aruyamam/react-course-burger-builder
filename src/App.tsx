import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const app = () => (
   <div>
      <Layout>
         <BurgerBuilder />
      </Layout>
   </div>
);

export default app;
