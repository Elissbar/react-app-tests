import React from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizCreater from './containers/QuizCreater/QuizCreater';
import Auth from './containers/Auth/Auth';
import QuizList from './containers/QuizList/QuizList';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/auth' exact component={Auth} />
        <Route path='/quiz-creater' component={QuizCreater} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' component={QuizList} />
      </Switch>
    </Layout>
  );
}

export default App;
