import React, { Component } from "react";
import moment from "moment";
import "moment/locale/nl-be";
import "moment/locale/fr";

import { List, ListItem, ListItemText } from "@material-ui/core";

moment.locale("nl-be");

export class OpeningHours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  getRelativeTime = () => {
    return "morgen om 8:00";
  };

  handleRelativeClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    var curr = new Date(); // get current date
    var currentDay = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(curr);
    var { openingHours } = this.props;
    var { open } = this.state;

    var relativeTime = this.getRelativeTime();
    return (
      <List dense>
        {relativeTime && (
          <ListItem
            style={{ cursor: "pointer" }}
            onClick={this.handleRelativeClick}
          >
            Openingstijden:
            <ListItemText style={{fontWeight: "700 !important"}} primary={relativeTime + " +"}></ListItemText>
          </ListItem>
        )}
        {open &&
          openingHours &&
          openingHours.map((oh) => (
            <ListItem
              selected={currentDay === oh.day}
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <ListItemText
                primary={
                  moment(oh.startTime).format("dddd - H:mm tot ") +
                  moment(oh.endTime).format("H:mm")
                }
              ></ListItemText>
            </ListItem>
          ))}
      </List>
    );
  }
}

export default OpeningHours;
