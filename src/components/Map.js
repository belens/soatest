import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import OpeningHours from "./OpeningHours";

export class MapComponent extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
  componentDidMount(props) {}
  onMapClicked = (props) => {
    console.log(props.center);
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    console.log(this.props.orgs);
    return (
      <div
        style={{
          height: 300,
          marginBottom: 20,
          position: "relative",
          width: "100%",
          maxWidth: 600,
          margin: "0 auto 20px",
        }}
      >
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          initialCenter={this.props.coords}
          center={this.props.coords}
          onClick={this.onMapClicked}
        >
          {this.props.orgs.map(
            (org) =>
              org && (
                <Marker
                  onClick={this.onMarkerClick}
                  position={org.coords}
                  name={org.organisation}
                  openingHours={org.openingHours}
                />
              )
          )}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
              <OpeningHours open={true} openingHours={this.state.selectedPlace.openingHours}></OpeningHours>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
MapComponent.defaultProps = {
  zoom: 7, // flanders
  coords: { lat: 50.8999964, lng: 4.5333312 }, // flanders
};

export default GoogleApiWrapper((props) => ({
  apiKey: "AIzaSyAkPQV0B9yFdABkgrTUra4mx7sxAM9CQno",
  language: props.language,
}))(MapComponent);
