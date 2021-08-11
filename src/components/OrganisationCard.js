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
import { CardMedia } from "@material-ui/core";

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

function CheckMarkComp({ isTrue, children }) {
  return (
    <Typography variant="subtitle2">
      {isTrue ? <CheckIconComp /> : <CloseIconComp />} {children}
    </Typography>
  );
}

export default function OrganisationCard(props) {
  const classes = useStyles();
  const {
    isFree,
    isAnonymous,
    onAppointment,
    openPeriods,
    name,
    telephone,
    address,
    extraInfo,
    websiteUrl,
    appointmentUrl,
  } = props;
  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia type="src" image={`${process.env.PUBLIC_URL}/img/organisations/${name}.jpg`} />

      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {address} · <span>{telephone}</span>
        </Typography>
        {extraInfo && (
          <div>
            <br />
            <Typography className={classes.pos} variant="body1">
              {extraInfo}
            </Typography>
            <br />
          </div>
        )}
        <br />

        <CheckMarkComp isTrue={isFree}>Gratis consultatie</CheckMarkComp>
        <CheckMarkComp isTrue={onAppointment}>Enkel op afspraak</CheckMarkComp>
        <CheckMarkComp isTrue={isAnonymous}>Anoniem testen</CheckMarkComp>

        <div style={{ margin: "10px 0" }}>
          <OpenPeriods org={name} openPeriods={openPeriods}></OpenPeriods>
        </div>

        <div>
          <Button
            size="small"
            target="_blank"
            startIcon={<LocationOnIcon />}
            href={"https://maps.google.com/?q=" + address} // TODO: test href={`geo:${coords.lat},${coords.lng},u=35`}
          >
            Toon locatie
          </Button>
          {appointmentUrl && (
            <Button
              size="small"
              target="_blank"
              style={{ float: "right" }}
              startIcon={<EventIcon />}
              href={appointmentUrl}
            >
              Maak afspraak
            </Button>
          )}
        </div>
        <div>
          {websiteUrl && (
            <Button size="small" target="_blank" startIcon={<LinkIcon />} href={websiteUrl}>
              Bezoek website
            </Button>
          )}
          {telephone && (
            <Button
              size="small"
              style={{ float: "right" }}
              startIcon={<CallIcon />}
              href={`tel:${telephone}`}
            >
              Bel organisatie
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
