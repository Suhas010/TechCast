import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import { getData, Lang } from '../actions/action';

class LangList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,

    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    //this.state.expanded = false;
    console.log(this.state.expanded, "****");

  }

  componentWillMount() {
    this.state
  }
  handleExpandChange(expanded) {

    this.setState({ expanded: expanded });
  };

  handleToggle(event, toggle) {
    console.log(event.target.value, toggle);

    this.setState({ expanded: toggle });

  };

  handleExpand() {
    this.setState({ expanded: true });
  };

  handleReduce() {
    this.setState({ expanded: false });
  };

  render() {
    return (
      <div>
        {Lang.map((row, index) => (

          <Card expanded={this.state.expanded} key={index}>
            <CardHeader
              title={row.name}
              subtitle={row.subTitle}
              avatar={row.icon}
              actAsExpander={true}
              showExpandableButton={true}
              key={index}
            />
            <CardText>
              <Toggle
                id={row}
                toggled={this.state.expanded}
                onToggle={this.handleToggle}
                labelPosition="right"
                label="View Description"
              />
            </CardText>
            <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
            <CardText expandable={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>

          </Card>
        ))}
      </div>
    );
  }
}
export default LangList;