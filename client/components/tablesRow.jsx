import React from 'react';

export default class TablesRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    /* const tName = Object.keys(this.props.tableName)[0]; */
    return (
      <tr /* onClick={() => { this.props.tablesView(this.props.dbName); }} */>
        {/* <td>test</td> */}
        <td>{this.props.tableName}</td>
        <td>{this.props.count}</td>
      </tr>
    );
  }
}
