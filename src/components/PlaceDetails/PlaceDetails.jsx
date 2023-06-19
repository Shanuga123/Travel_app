import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import { LocationOn, Phone } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import useStyles from './styles.js';

const PlaceDetails = ({ place, selected, setChildClicked }) => {
  const classes = useStyles();

  const cardRef = useRef(null);

  useEffect(() => {
    if (selected) {
      cardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selected]);

  const ratingValue = Number(place.rating);
  const formattedRating = Number.isNaN(ratingValue) ? '-' : ratingValue.toFixed(1);

  return (
    <Card ref={cardRef} elevation={6} onClick={() => setChildClicked(place.place_id)}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Box style={{ position: 'relative', zIndex: 1 }}>
              <Rating value={ratingValue} precision={0.5} readOnly />
            </Box>
            <Typography variant="subtitle1">
              {formattedRating}
            </Typography>
          </Box>
          <Typography gutterBottom variant="subtitle1">out of {place.num_reviews} reviews</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center" key={award.display_name}>
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOn /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <Phone /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
