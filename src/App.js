import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { ListSubheader } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

var serviceList = [
  {
    name: 'Serviço 1',
    values: ['s1.Item 1', 's1.Item 2', 's1.Item 3', 's1.Item 4'],
  },
  {
    name: 'Serviço 2',
    values: ['s2.item 1'],
  },
];

export default function App() {
  const classes = useStyles();
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(serviceList);
  }, []);

  const handleAddService = (text) => {
    const selectedService = text.split('-')[0];
    const selectedProduct = text.split('-')[1];

    const service = services.find((item) => item.name === selectedService);
    const productIndex = service.values.indexOf(selectedProduct);
    service.values.splice(productIndex, 1);

    setSelectedServices([
      ...selectedServices,
      {
        service: selectedService,
        product: selectedProduct,
      },
    ]);
  };

  const handleDeleteService = ({ service, product }) => {
    let deletedProduct = selectedServices.find(
      (item) => item.service === service && item.product === product
    );
    let productIndex = selectedServices.indexOf(deletedProduct);
    let newSelectedServices = selectedServices.filter(
      (item, index) => index !== productIndex
    );

    let serviceList = services;

    serviceList.map((item) => {
      if (item.name === service) {
        item.values.push(product);
        item.values.sort();
      }
      return service;
    });

    setServices(serviceList);
    setSelectedServices(newSelectedServices);
  };

  return (
    <div>
      <div className={classes.chips}>
        {selectedServices.map(({ service, product }) => (
          <Chip
            key={product}
            label={product}
            onClick={() => {
              handleDeleteService({ service, product });
            }}
            onDelete={() => {
              handleDeleteService({ service, product });
            }}
            className='deleteItem'
          ></Chip>
        ))}
      </div>

      <FormControl className={classes.formControl}>
        <InputLabel id='demo-mutiple-chip-label'>Serviços</InputLabel>
        <Select
          labelId='demo-mutiple-chip-label'
          id='demo-mutiple-chip'
          multiple
          value={[]}
          input={<Input id='select-multiple-chip' />}
          MenuProps={MenuProps}
        >
          {services.map((parent) => (
            <span key={parent.name} value={parent.name}>
              <ListSubheader style={{ backgroundColor: '#fff' }}>
                {parent.name}
              </ListSubheader>
              {parent.values.map((service) => (
                <MenuItem
                  key={service}
                  value={service}
                  onClick={() => {
                    handleAddService(`${parent.name}-${service}`);
                  }}
                >
                  {service}
                </MenuItem>
              ))}
            </span>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
