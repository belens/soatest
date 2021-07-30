import React from "react";
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
import OpeningHours from "./OpeningHours";

const useStyles = makeStyles({
  root: {
    // display: "flex",
    marginBottom: 20,
    maxWidth: 450,
    margin: '0 auto'
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

export default function OrganisationCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.address}
        </Typography>
        <Typography variant="body2" component="p">
          {/* {props.free ? "Gratis consultatie" : "Betalende consultatie"} */}
          {/* <List dense>
            <ListItem>
              <ListItemText
                primary={
                  props.free ? "Gratis consultatie" : "Betalende consultatie"
                }
              ></ListItemText>
            </ListItem>
          </List> */}
        </Typography>
        {/* <CardActions> */}
        <br />
        <br />
        <Button
          size="small"
          startIcon={<LocationOnIcon />}
          href={"https://maps.google.com/?q=" + props.address}
        >
          Toon Locatie
        </Button>
        <br />
        {props.website && (
          <Button size="small" startIcon={<LinkIcon />} href={props.website}>
            Bezoek website
          </Button>
        )}
        {/* </CardActions> */}
        <OpeningHours openingHours={props.openingHours}></OpeningHours>
      </CardContent>
    </Card>
  );
}
