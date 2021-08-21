import React from "react";
import moment from "moment";
import "moment/locale/nl-be";
import "moment/locale/fr";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOnOutlined";
import EventIcon from "@material-ui/icons/EventOutlined";
import WebsiteIcon from "@material-ui/icons/PublicOutlined";
import CallIcon from "@material-ui/icons/CallOutlined";
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
        <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
          {name}
        </Typography>

        {address && (
          <Button
            style={{ textTransform: "initial", color: "#4a4a4a" }}
            size="small"
            target="_blank"
            startIcon={<LocationOnIcon color="primary" variant="out" />}
            href={"https://maps.google.com/?q=" + address} // TODO: test href={`geo:${coords.lat},${coords.lng},u=35`}
          >
            {address}
          </Button>
        )}

        {telephone && (
          <Button
            size="small"
            style={{ textTransform: "initial", color: "#4a4a4a" }}
            startIcon={<CallIcon color="primary" />}
            href={`tel:${telephone}`}
          >
            {telephone}
          </Button>
        )}
        {websiteUrl && (
          <Button
            style={{ textTransform: "initial", color: "#4a4a4a" }}
            size="small"
            target="_blank"
            startIcon={<WebsiteIcon color="primary" />}
            href={websiteUrl}
          >
            Website
          </Button>
        )}
        {appointmentUrl && (
          <Button
            style={{ textTransform: "initial", color: "#4a4a4a" }}
            size="small"
            target="_blank"
            startIcon={<EventIcon color="primary" />}
            href={appointmentUrl}
          >
            Maak afspraak
          </Button>
        )}
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

        <CheckMarkComp isTrue={isFree}>Gratis</CheckMarkComp>
        <CheckMarkComp isTrue={!onAppointment}>Zonder afspraak</CheckMarkComp>
        <CheckMarkComp isTrue={isAnonymous}>Anoniem</CheckMarkComp>
      </CardContent>
    </Card>
  );
}
