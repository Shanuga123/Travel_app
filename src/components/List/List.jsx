import React, { useState, useEffect, useRef, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import useStyles from './styles.js';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyles();
  const [selectedRating, setSelectedRating] = useState('');
  const elRefs = useRef([]);

  useEffect(() => {
    setSelectedRating(rating.toString());
  }, [rating]);

  useEffect(() => {
    elRefs.current = Array(places?.length).fill().map((_, i) => elRefs.current[i] || createRef());
  }, [places]);

  useEffect(() => {
    if (childClicked !== null && elRefs.current[childClicked]?.current) {
      elRefs.current[childClicked].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [childClicked, elRefs]);

  const handleChangeRating = (event) => {
    setSelectedRating(event.target.value);
    setRating(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels & Attractions around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
              
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={selectedRating} onChange={handleChangeRating}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, index) => (
              <Grid key={index} item xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === index}
                  refProp={elRefs.current[index] || createRef()} 
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
