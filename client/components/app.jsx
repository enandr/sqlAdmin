import React from 'react';
import Login from './login';
import DbTableRow from './dbTableRow';
import TablesRow from './tablesRow';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databases: [null],
      view: 'login',
      dbSearch: '',
      backView: 'databases'
    };
    this.login = this.login.bind(this);
    this.tablesView = this.tablesView.bind(this);
    this.databasesView = this.databasesView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }));
  }

  login(text) {
    fetch('/api/dbAll')
      .then(res => res.json())
      .then(data => {
        this.setState({ databases: data, view: 'databases' });
      })
      .catch(err => console.error('Fetch failed!', err));
  }

  tablesView(dbName) {
    this.setState({ view: 'tables', dbSearch: dbName });
  }

  render() {
    switch (this.state.view) {
      case 'login':
        return (
          <Login login={this.login}/>
        );
      case 'databases':
        return (
          this.renderDbs()
        );
      case 'tables':
        return (
          this.renderDbTables()
        );
    }
  }

  databasesView() {
    this.setState({ view: 'databases' });
  }

  renderDbTables() {
    let dbs = null;
    dbs = this.state.databases.map(value => {
      if (value.Database === this.state.dbSearch) {
        const dbTables = value.Tables.map((value, index) => {
          return (
            <TablesRow key={index} tableName={value.table_name} count={value.table_rows}/>
          );
        });
        return dbTables;
      }
    });
    return (
      <div className="container">
        <h5 className="red-text canClick" onClick={this.databasesView}>Back</h5>
        <table className="striped highlight">
          <thead>
            <tr className="blue darken 1">
              <th>
                Table Name
              </th>
              <th>
                Row Count
              </th>
            </tr>
          </thead>
          <tbody>
            {dbs}
          </tbody>
        </table>
      </div>
    );
  }

  renderDbs() {
    let dbs = null;
    if (this.state.databases[0]) {
      dbs = this.state.databases.map((value, index) => {
        return (
          <DbTableRow key={index} dbName={value.Database} tableLength={value.Tables.length} tablesView={this.tablesView} />
        );
      });
    }
    return (
      <div className="container">
        <table className="striped highlight">
          <thead>
            <tr className="blue darken 1">
              <th>
                Database
              </th>
              <th>
                Table Count
              </th>
            </tr>
          </thead>
          <tbody>
            {dbs}
          </tbody>
        </table>
      </div>
    );

  }
}
