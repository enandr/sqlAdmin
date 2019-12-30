import React from 'react';

export default class EntryTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const keys = Object.keys(this.props.entries[0]);
    const tableHeads = keys.map((value, index) => {
      return (
        <th key={index}>{value}</th>
      );
    });
    return (
      <tr className="blue darken-1">
        {tableHeads}
      </tr>

    );
  }
}
