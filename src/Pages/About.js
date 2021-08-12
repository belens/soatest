import React, { Component } from "react";
import styled from "styled-components";
import { palette, spacing } from "@material-ui/system";

import { Container, Typography } from "@material-ui/core";

const Box = styled.div`
  ${palette}
  ${spacing}
`;

export default class About extends Component {
  render() {
    return (
      <Box>
        <Container fixed>
          <Typography variant="h3">About</Typography>
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus cumque cupiditate
            maiores eius repellat natus possimus laudantium numquam placeat impedit voluptate
            inventore, amet deserunt vel commodi iure quia totam odio, autem rerum. Voluptate
            officiis consequatur dolorum quas.
          </Typography>
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus cumque cupiditate
            maiores eius repellat natus possimus laudantium numquam placeat impedit voluptate
            inventore, amet deserunt vel commodi iure quia totam odio, autem rerum. Voluptate
            officiis consequatur dolorum quas, sit at corrupti perspiciatis dignissimos consequuntur
            magnam laudantium incidunt? Non distinctio est accusamus dolorem et dolores recusandae,
            voluptatum at vero hic ut optio sapiente pariatur atque facere qui velit iusto dicta
            eaque quisquam possimus! Voluptates voluptate, in quo ex quas, distinctio sunt error
            dolorem sint porro ipsam at perferendis ipsum cumque dicta temporibus itaque impedit,
            accusamus vitae ratione unde eum sapiente eos provident!
          </Typography>
        </Container>
      </Box>
    );
  }
}
