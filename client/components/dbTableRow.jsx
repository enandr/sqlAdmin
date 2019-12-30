import React from 'react';

export default class DbTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <tr>
        <td className="canClick" onClick={() => { this.props.tablesView(this.props.dbName); }}>{this.props.dbName}</td>
        <td>{this.props.tableLength}</td>
        <td><i className="material-icons">add_circle</i></td>
      </tr>
    );
  }
}
