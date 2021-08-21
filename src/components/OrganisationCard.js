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
import LinkIcon from "@material-ui/icons/Link";
import EventIcon from "@material-ui/icons/Event";
import CallIcon from "@material-ui/icons/Call";
import OpenPeriods from "./OpenPeriods";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
    maxWidth: 450,
    borderRadius: 8,
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

function CheckMarkComp({ isTrue, children }) {
  if (!isTrue) return null;
  return (
    <Chip
      size="small"
      style={{
        margin: "16px 4px 0 0",
        borderRadius: "4px",
      }}
      label={children}
      color="primary"
    />
  );
}

export default function OrganisationCard(props) {
  const classes = useStyles();
  function onError(el) {
    el.target.style.display = "none";
  }
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

        <CheckMarkComp isTrue={isFree}>Gratis</CheckMarkComp>
        <CheckMarkComp isTrue={!onAppointment}>Zonder afspraak</CheckMarkComp>
        <CheckMarkComp isTrue={isAnonymous}>Anoniem</CheckMarkComp>
      </CardContent>
    </Card>
  );
}
