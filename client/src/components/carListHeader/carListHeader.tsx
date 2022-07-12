import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import { red } from '@mui/material/colors';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useStore } from 'effector-react';
import {
  $searchParams,
  changeShowByLikedBtn,
  changeSearchInput,
  changeFilterValue,
  changeVisibleArrayInterval,
} from 'src/models/searchParams/searchParams';
import { $registeredUserData } from 'src/models/authorization/authorization';
import styles from './carListHeader.module.scss';

const CarListHeader = () => {
  const [value, setValue] = useState<number[]>([0, 10000]);
  const minDistance = 1500;
  const searchParams = useStore($searchParams);
  const registeredUserData = useStore($registeredUserData);

  const handleChange = (e: SelectChangeEvent) => {
    changeFilterValue(e.target.value);
  };
  const SearchChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    changeSearchInput(e.target.value);
  };

  const changePrice = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
    changeVisibleArrayInterval(value);
  };

  const changeLabelFormat = (newValue: number | number[], activeThumb:number) => {
    if (activeThumb === 0) {
      return `от ${newValue} $`;
    }
    return `до ${newValue} $`;
  };

  const showButton = searchParams.liked ? (
    <Button
      variant="contained"
      onClick={() => changeShowByLikedBtn()}
      color="success"
    >
      Показать все
    </Button>
  ) : (
    <Button
      variant="outlined"
      color="error"
      onClick={() => changeShowByLikedBtn()}
      endIcon={<FavoriteIcon sx={{ color: red[900] }} />}
    >
      Только
    </Button>
  );

  return (
    <div className={styles.Car_List__Header}>
      <Grid container spacing={4}>
        <Grid item sm={6} lg={3} xs={12}>
          <TextField
            id="outlined-basic"
            label="Поиск"
            onChange={SearchChange}
            value={searchParams.input}
            variant="outlined"
          />
        </Grid>
        {registeredUserData
        && (
        <Grid item sm={6} lg={3} xs={12}>
          {showButton}
        </Grid>
        )}
        <Grid item sm={6} lg={3} xs={12}>
          <Box>
            <Slider
              sx={{ color: '#26395d' }}
              value={value}
              onChange={changePrice}
              valueLabelDisplay="on"
              max={10000}
              step={100}
              valueLabelFormat={changeLabelFormat}
              disableSwap
            />
          </Box>
        </Grid>
        <Grid item sm={6} lg={3} xs={12}>
          <Box sx={{ minWidth: 180 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchParams.changeFilter}
                label="Фильтр"
                onChange={handleChange}
              >
                <MenuItem value="10">По Марке</MenuItem>
                <MenuItem value="20">По Стоимости</MenuItem>
                <MenuItem value="30">По Году Выпуска</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </div>

  );
};
export default CarListHeader;
