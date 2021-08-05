import React, { PureComponent } from "react";
import moment from "moment";
import "moment/locale/nl-be";
import "moment/locale/fr";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import LinkIcon from "@material-ui/icons/Link";
import EventIcon from "@material-ui/icons/Event";
import CallIcon from "@material-ui/icons/Call";
import OpenPeriods from "./OpenPeriods";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
    maxWidth: 450,
    margin: "0 auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 13,
  },
});

moment.locale("nl-be");

class CheckIconComp extends PureComponent {
  render() {
    return (
      <CheckIcon
        fontSize="small"
        style={{
          verticalAlign: "middle",
          display: "inline-block",
          color: green[500],
        }}
      />
    );
  }
}
class CloseIconComp extends PureComponent {
  render() {
    return (
      <CloseIcon
        fontSize="small"
        style={{
          verticalAlign: "middle",
          display: "inline-block",
          color: red[500],
        }}
      />
    );
  }
}

export default function OrganisationCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.address} · <span>{props.telephone}</span>
        </Typography>
        <br />

        <Typography variant="subtitle2">
          {props.free ? (
            <CheckIconComp></CheckIconComp>
          ) : (
            <CloseIconComp></CloseIconComp>
          )}{" "}
          Gratis consultatie
        </Typography>
        <Typography variant="subtitle2">
          {props.onAppointment ? (
            <CheckIconComp></CheckIconComp>
          ) : (
            <CloseIconComp></CloseIconComp>
          )}{" "}
          Zonder afspraak
        </Typography>

        <div style={{ margin: "10px 0" }}>
          <OpenPeriods openPeriods={props.openPeriods}></OpenPeriods>
        </div>

        <div>
          <Button
            size="small"
            target="_blank"
            startIcon={<LocationOnIcon />}
            href={"https://maps.google.com/?q=" + props.address}
          >
            Toon locatie
          </Button>
          {props.appointmentUrl && (
            <Button
              size="small"
              target="_blank"
              style={{ float: "right" }}
              startIcon={<EventIcon />}
              href={props.appointmentUrl}
            >
              Maak afspraak
            </Button>
          )}
        </div>
        <div>
          {props.websiteUrl && (
            <Button
              size="small"
              target="_blank"
              startIcon={<LinkIcon />}
              href={props.websiteUrl}
            >
              Bezoek website
            </Button>
          )}
          {props.appointmentUrl && (
            <Button
              size="small"
              style={{ float: "right" }}
              startIcon={<CallIcon />}
              href={`tel:${props.telephone}`}
            >
              Bel organisatie
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
