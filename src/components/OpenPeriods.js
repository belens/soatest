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

export class OpenPeriods extends Component {
  getRelativeTime = () => {
    var { openPeriods } = this.props;
    if (!openPeriods) return "";
    var now = moment();

    const openPeriodsToday = openPeriods[now.weekday()];
    var closesAt = openPeriodsToday.find((oh, i) => {
      var mStart = moment(oh.startTime);
      var mEnd = moment(oh.endTime);
      if (mStart.isBefore(now) && mEnd.isAfter(now)) {
        return true;
      }

      return false;
    });
    const nextDays = Object.values(openPeriods).filter((oh, i) => {
      return i > now.weekday();
    });
    const nextOpen = nextDays.find((periods, i) => {
      const oh = periods && periods[0];
      if (!oh) return false;
      var mStart = moment(oh.startTime);

      if (mStart.isAfter(now)) {
        return true;
      }
      return false;
    });
    const nextWeekOpen = Object.values(openPeriods).find((openPeriodDay) => {
      if (openPeriodDay.length) {
        return true;
      }
      return false;
    });

    if (closesAt) {
      return (
        <span>
          <span style={{ color: "darkgreen", fontWeight: 700 }}>open.</span> tot{" "}
          {moment(closesAt.endTime).format("H:mm")}
        </span>
      );
    }
    const nOpen = nextOpen || nextWeekOpen;
    return (
      (nOpen && nOpen[0] && (
        <span>
          <span style={{ color: "darkred", fontWeight: 700 }}>gesloten.</span>{" "}
          Open op {moment(nOpen[0].startTime).format("ddd H:mm")}
        </span>
      )) ||
      "onbekend"
    );
  };

  renderWeekday = (day) => {
    const now = moment();
    return (
      <Typography
        component="div"
        variant="caption"
        style={{
          float: "left",
          width: 80,
          fontWeight: now.weekday() === day.weekday() ? 700 : "",
        }}
      >
        {day.format("dddd")}
      </Typography>
    );
  };

  render() {
    var { openPeriods, open } = this.props;
    if (!openPeriods) return <div></div>;
    var relativeTime = this.getRelativeTime();
    const now = moment();
    return (
      <Accordion variant="outlined" expanded={open} key={this.props.name}>
        <AccordionSummary style={{ margin: 0 }}  key={this.props.name} expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" style={{ textAlign: "left" }}>
            Openingstijden:
            <br />
            <Typography variant="body2">{relativeTime}</Typography>
          </Typography>
        </AccordionSummary>

        <AccordionDetails style={{ flexDirection: "column", width: "50%" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((weekday, i) => {
            const dayPeriods = openPeriods[weekday];
            if (dayPeriods.length === 0) {
              return (
                <Typography
                  key={this.props.org + `-nu-${i}`}
                  variant="caption"
                  style={{
                    color: "gray",
                    textAlign: "left",
                    marginBottom: 5,
                  }}
                >
                  {this.renderWeekday(moment().day(weekday + 1))}
                  <span
                    style={{
                      float: "right",
                      width: "90px",
                      textAlign: "left",
                      fontWeight:
                        now.weekday() ===
                        moment()
                          .day(weekday + 1)
                          .weekday()
                          ? 700
                          : "",
                    }}
                  >
                    Gesloten
                  </span>
                </Typography>
              );
            } else {
            }
            return (
              <div style={{ marginBottom: 5 }}>
                {dayPeriods.map((period, i) => {
                  return (
                    <Typography
                      key={this.props.org + `-${i}`}
                      variant="caption"
                      style={{
                        textAlign: "left",
                        fontWeight:
                          now.weekday() === moment(period.startTime).weekday()
                            ? 700
                            : "",
                      }}
                    >
                      {i === 0 && this.renderWeekday(moment(period.startTime))}

                      <Typography
                        variant="caption"
                        style={{
                          float: "right",
                          fontWeight:
                            now.weekday() === period.weekday ? 700 : "",
                        }}
                        className="periodSlot"
                      >
                        {moment(period.startTime).format("HH:mm tot ") +
                          moment(period.endTime).format("HH:mm")}
                      </Typography>
                    </Typography>
                  );
                })}
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default OpenPeriods;
