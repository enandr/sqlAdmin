import React from 'react';
import Login from './login';
import DbTableRow from './dbTableRow';
import TablesRow from './tablesRow';
import EntryTables from './entryTables';
import EntryRow from './entryRow';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databases: [null],
      view: 'login',
      dbSearch: '',
      backView: 'databases',
      tableData: [null],
      collations: [],
      autoCompleteValues: []
    };
    this.login = this.login.bind(this);
    this.loginView = this.loginView.bind(this);
    this.tablesView = this.tablesView.bind(this);
    this.databasesView = this.databasesView.bind(this);
    this.EntryTablesView = this.EntryTablesView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => () => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }));
  }

  getCollations() {
    fetch('/api/collation')
      .then(res => res.json())
      .then(data => {
        data = data.map(value => {
          return value.COLLATION_NAME;
        });
        this.setState({ collations: data });
      })
      .catch(err => this.setState({ message: err.message })/* , this.fillAutoComplete() */);
  }

  fillAutoComplete() {
    /*     instance.updateData({
      Apple: null,
      Microsoft: null,
      Google: 'https://placehold.it/250x250'
    }); */
  }

  login(text) {
    fetch('/api/dbAll')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          this.setState({ databases: data, view: 'databases' }, this.getCollations());
        } else {
          alert('Wrong username or password');
        }
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
      case 'entries':
        return (
          this.renderEntryTables()
        );
    }
  }

  loginView() {
    this.setState({ view: 'login', databases: ['null'], backView: 'databases' });
  }

  databasesView() {
    this.setState({ view: 'databases' });
  }

  EntryTablesView(tableName) {
    this.setState({ view: 'entries', tableData: [null], dbSearch: tableName, backView: 'tables' });
  }

  renderEntryTables() {
    if (this.state.tableData[0] === null) {
      this.state.databases.map((value, index) => {
        const db = value.Database;
        value.Tables.map((value, index) => {
          if (value.table_name === this.state.dbSearch) {
            fetch(`/api/tables?db=${db}&table=${value.table_name}`)
              .then(res => res.json())
              .then(data => {
                this.setState({ tableData: data });
              });
          }
        });
      });
    }

    if (this.state.tableData[0] === null) {
      return (
        <table className="responsive-table">
          <thead>
            <tr>
              <th>
                No Data Available
              </th>
            </tr>
          </thead>
        </table>
      );
    } else {
      return (
        <div className="container">
          <h5 className="red-text canClick" onClick={this.databasesView}>Back</h5>
          <table className="responsive-table">
            <thead>
              <EntryTables entries={this.state.tableData} />
            </thead>
            <tbody>
              <EntryRow entries={this.state.tableData} />
            </tbody>
          </table>

        </div>

      );
    }
  }

  renderDbTables() {
    let dbs = null;
    dbs = this.state.databases.map(value => {
      if (value.Database === this.state.dbSearch) {
        const dbTables = value.Tables.map((value, index) => {
          return (
            <TablesRow entries={this.EntryTablesView} key={index} tableName={value.table_name} count={value.table_rows}/>
          );
        });
        return dbTables;
      }
    });
    return (
      <div className="container">
        <h5 className="red-text canClick" onClick={this.databasesView}>Back</h5>
        <table className="striped highlight responsive-table">
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
        <h5 className="red-text canClick" onClick={this.loginView}>Logout</h5>
        <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Add</a>
        <table className="striped highlight responsive-table">
          <thead>
            <tr className="blue darken 1">
              <th>
                Database
              </th>
              <th>
                Table Count
              </th>
              <th>
                Make Table
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
