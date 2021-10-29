import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const IconLogo = () => (
  <StaticImage
    className="img"
    src="../../images/logo.png"
    quality={100}
    formats={['AUTO', 'WEBP', 'AVIF']}
    alt="Headshot"
  />
);

export default IconLogo;
