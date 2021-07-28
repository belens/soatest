import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import { List, ListItem, ListItemText } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    display: "flex",
    marginBottom: 20,
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

export default function OrganisationCard(props) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  var curr = new Date(); // get current date
  var currentDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    curr
  );
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ flex: "1 0 auto" }}>
        {/* <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Testcenter
        </Typography> */}
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
        <br/><br/>
        <Button
          size="small"
          startIcon={<LocationOnIcon />}
          href={"https://maps.google.com/?q=" + props.address}
        >
          Toon Locatie
        </Button>
        <br/>
        {props.website && (
          <Button
            size="small"
            startIcon={<LinkIcon />}
            href={props.website}
          >
            Bezoek website
          </Button>
        )}
        {/* </CardActions> */}
      </CardContent>
      <List dense style={{ width: 220, paddingTop: 20 }}>
        {props.openingHours.map((oh) => (
          <ListItem
            selected={currentDay === oh.day}
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <ListItemText primary={oh.day + " - " + oh.hour}></ListItemText>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
