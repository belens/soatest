import React, { Component } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    var { openingHours } = this.props;

    
    var closesAt = openingHours.find((oh, i) => {
      // console.log(oh);
      var now = moment();
      var mStart = moment(oh.startTime);
      var mEnd = moment(oh.endTime);
      console.log(mStart.format('dd LLL'), now.format('dd LLL'), mEnd.format('dd LLL'))
      console.log(mStart.isBefore(now), mEnd.isAfter(now))
      if(mStart.isBefore(now), mEnd.isAfter(now)){
        return true;
      }
      return false;
    });
    return (closesAt && 'OPEN') || "onbekend";
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
        {/* {relativeTime && (
          <ListItem
            style={{ cursor: "pointer" }}
            onClick={this.handleRelativeClick}
          >
            Openingstijden:
            <ListItemText style={{fontWeight: "700 !important"}} primary={relativeTime + " +"}></ListItemText>
          </ListItem>
        )} */}
        <Accordion variant="outlined" style={{flexDirection: 'column'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ textAlign: "left" }}>
              Openingstijden:
              <br />
              {relativeTime}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {openingHours &&
              openingHours.map((oh) => (
                <Typography component="p" style={{textAlign: 'left'}}  >
                  {moment(oh.startTime).format("dddd - H:mm tot ") +
                    moment(oh.endTime).format("H:mm")}
                </Typography>
              ))}
          </AccordionDetails>
        </Accordion>
      </List>
    );
  }
}

export default OpeningHours;
