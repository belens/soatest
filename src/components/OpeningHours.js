import React, { Component } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import moment from "moment";
import "moment/locale/nl-be";
import "moment/locale/fr";

moment.locale("nl-be");

export class OpeningHours extends Component {
  getRelativeTime = () => {
    var { openingHours } = this.props;
    if (!openingHours) return "";
    var closesAt = openingHours.find((oh, i) => {
      var now = moment();
      var mStart = moment(oh.startTime);
      var mEnd = moment(oh.endTime);
      if (mStart.isBefore(now) && mEnd.isAfter(now)) {
        return true;
      }

      return false;
    });

    var nextOpen = openingHours.find((oh, i) => {
      var now = moment();
      var mStart = moment(oh.startTime);

      if (mStart.isAfter(now)) {
        return true;
      }
      return false;
    });
    if (!nextOpen) {
      nextOpen = openingHours[0];
    }
    if (closesAt) {
      return (
        <span>
          <span style={{ color: "darkgreen", fontWeight: 700 }}>open.</span> tot{" "}
          {moment(closesAt.endTime).format("H:mm")}
        </span>
      );
    }
    return (
      (nextOpen && (
        <span>
          <span style={{ color: "darkred", fontWeight: 700 }}>gesloten.</span>{" "}
          Open op {moment(nextOpen.startTime).format("ddd H:mm")}
        </span>
      )) ||
      "onbekend"
    );
  };

  render() {
    var { openingHours, open } = this.props;

    var relativeTime = this.getRelativeTime();
    return (
      <Accordion variant="outlined" expanded={open}>
        <AccordionSummary style={{ margin: 0 }} expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" style={{ textAlign: "left" }}>
            Openingstijden:
            <br />
            <Typography variant="body2">{relativeTime}</Typography>
          </Typography>
        </AccordionSummary>

        <AccordionDetails style={{ flexDirection: "column" }}>
          {openingHours &&
            openingHours.map((oh) => (
              <Typography variant="caption" style={{ textAlign: "left" }}>
                <Typography component="span" variant="caption" style={{display: 'inline-block', width: 80}}>{moment(oh.startTime).format("dddd")}</Typography>
                {moment(oh.startTime).format("HH:mm tot ") +
                  moment(oh.endTime).format("HH:mm")}
              </Typography>
            ))}
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default OpeningHours;
