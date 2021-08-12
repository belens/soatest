import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import OpenPeriods from "./OpenPeriods";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

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
    const { activeMarker, showingInfoWindow } = this.state;
    const { google, zoom, coords, orgs } = this.props;
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
          google={google}
          mapTypeControlOptions={false}
          fullscreenControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          zoom={zoom}
          initialCenter={coords}
          center={coords}
          onClick={this.onMapClicked}
        >
          {orgs.map(
            (org, i) =>
              org && (
                <Marker
                  key={i}
                  name={org.name}
                  onClick={this.onMarkerClick}
                  position={org.coords}
                  openPeriods={org.openPeriods}
                ></Marker>
              )
          )}
          {activeMarker && (
            <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
              <div>
                <h3>{activeMarker.name}</h3>
                <OpenPeriods
                  open={true}
                  org={"map-" + activeMarker.name}
                  openPeriods={activeMarker.openPeriods}
                ></OpenPeriods>
              </div>
            </InfoWindow>
          )}
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
