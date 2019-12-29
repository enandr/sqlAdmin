import React from 'react';

export default class DbTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <tr onClick={() => { this.props.tablesView(this.props.dbName); }}>
        <td>{this.props.dbName}</td>
        <td>{this.props.tableLength}</td>
      </tr>
    );
  }
}
